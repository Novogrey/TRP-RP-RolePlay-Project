(function () {
  'use strict';

  const api = String(window.TRP_APPLICATIONS_API_URL || '').trim();

  function container() {
    return document.querySelector('.tables-section .container');
  }

  if (!api || !container()) return;

  function language() {
    return localStorage.getItem('language') === 'en' ? 'en' : 'ru';
  }

  function text() {
    return language() === 'en'
      ? { loading: 'Loading vehicle database...', empty: 'The vehicle database is empty.', failed: 'The vehicle database could not be loaded.', retry: 'Retry' }
      : { loading: 'Загрузка базы автотранспорта...', empty: 'В базе автотранспорта пока нет записей.', failed: 'Не удалось загрузить базу автотранспорта.', retry: 'Повторить' };
  }

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content != null) node.textContent = String(content);
    return node;
  }

  function clearTables(target) {
    target.querySelectorAll('.table-block').forEach(block => block.remove());
  }

  function showState(kind, message, withRetry = false) {
    const target = container();
    if (!target) return;
    clearTables(target);
    target.querySelector('.vehicle-database-state')?.remove();
    const state = element('div', `vehicle-database-state vehicle-database-state--${kind}`);
    state.append(element('p', '', message));
    if (withRetry) {
      const retry = element('button', 'vehicle-database-retry', text().retry);
      retry.type = 'button';
      retry.addEventListener('click', load);
      state.append(retry);
    }
    target.append(state);
  }

  function cellWithSpan(className, vehicle, value, dataAttribute = 'id') {
    const cell = document.createElement('td');
    const span = element('span', className, value || '—');
    span.dataset[dataAttribute] = vehicle.boardNumber || vehicle.id;
    cell.append(span);
    return cell;
  }

  function tableBlock(section, vehicles, lang) {
    const block = element('div', 'table-block');
    block.dataset.vehicleSection = section.id;
    block.append(element('h2', '', lang === 'ru' ? section.nameRu : section.nameEn));
    const wrapper = element('div', 'table-wrapper');
    const table = document.createElement('table');
    const head = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = lang === 'ru'
      ? ['№', 'Бортовой номер', 'Модель', 'Статус', 'Заводской номер', 'Окраска', 'Примечание']
      : ['No.', 'Fleet number', 'Model', 'Status', 'Factory number', 'Livery', 'Note'];
    headers.forEach(header => headerRow.append(element('th', '', header)));
    head.append(headerRow);
    const body = document.createElement('tbody');
    vehicles.forEach((vehicle, index) => {
      const row = document.createElement('tr');
      row.dataset.originalIndex = String(index);
      row.append(element('td', '', index + 1));
      const boardCell = element('td', 'board-number');
      const board = element('span', 'tbus-link', vehicle.boardNumber);
      board.dataset.id = vehicle.boardNumber || vehicle.id;
      boardCell.append(board);
      row.append(
        boardCell,
        cellWithSpan('model', vehicle, vehicle.model),
        cellWithSpan('status', vehicle, vehicle.status),
        cellWithSpan('factory-number', vehicle, vehicle.factoryNumber),
        cellWithSpan('livery', vehicle, vehicle.livery),
        cellWithSpan('info', vehicle, lang === 'ru' ? vehicle.informationRu : vehicle.informationEn)
      );
      const status = row.querySelector('.status');
      status.dataset.status = vehicle.status || '';
      body.append(row);
    });
    table.append(head, body);
    wrapper.append(table);
    block.append(wrapper);
    return block;
  }

  function render(database) {
    const target = container();
    if (!target) return;
    const sections = Array.isArray(database?.sections) ? database.sections : [];
    const vehicles = Array.isArray(database?.vehicles) ? database.vehicles : [];
    window.TRPVehicleDatabase = { ...database, sections, vehicles };
    clearTables(target);
    target.querySelector('.vehicle-database-state')?.remove();
    if (!sections.length || !vehicles.length) {
      showState('empty', text().empty);
      return;
    }
    const lang = language();
    [...sections]
      .sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder))
      .forEach(section => {
        const sectionVehicles = vehicles
          .filter(vehicle => vehicle.sectionId === section.id)
          .sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder));
        if (sectionVehicles.length) target.append(tableBlock(section, sectionVehicles, lang));
      });
    window.dispatchEvent(new CustomEvent('trp-vehicle-database-rendered', { detail: window.TRPVehicleDatabase }));
  }

  async function load() {
    showState('loading', text().loading);
    try {
      const url = new URL(api);
      url.searchParams.set('action', 'vehicle-list');
      url.searchParams.set('_', String(Date.now()));
      const response = await fetch(url, { cache: 'no-store' });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) throw new Error(payload?.error || text().failed);
      render(payload);
    } catch (error) {
      console.error('Vehicle database load failed:', error);
      showState('error', text().failed, true);
    }
  }

  load();
  document.addEventListener('click', event => {
    if (!event.target.closest('#lang-btn')) return;
    window.setTimeout(() => {
      if (window.TRPVehicleDatabase) render(window.TRPVehicleDatabase);
    }, 100);
  });
}());
