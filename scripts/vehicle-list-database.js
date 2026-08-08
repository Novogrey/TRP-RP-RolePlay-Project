(function () {
  'use strict';

  const api = String(window.TRP_APPLICATIONS_API_URL || '').trim();
  const container = document.querySelector('.tables-section .container');
  if (!api || !container) return;

  function language() {
    return localStorage.getItem('language') === 'en' ? 'en' : 'ru';
  }

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content != null) node.textContent = String(content);
    return node;
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
    if (!database?.sections?.length || !database?.vehicles?.length) return;
    window.TRPVehicleDatabase = database;
    container.querySelectorAll('.table-block').forEach(block => block.remove());
    const lang = language();
    [...database.sections]
      .sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder))
      .forEach(section => {
        const vehicles = database.vehicles
          .filter(vehicle => vehicle.sectionId === section.id)
          .sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder));
        container.append(tableBlock(section, vehicles, lang));
      });
    window.dispatchEvent(new CustomEvent('trp-vehicle-database-rendered', { detail: database }));
  }

  async function load() {
    const url = new URL(api);
    url.searchParams.set('action', 'vehicle-list');
    const response = await fetch(url, { cache: 'no-store' });
    const payload = await response.json();
    if (payload?.ok) render(payload);
  }

  load().catch(error => console.error('Vehicle database load failed:', error));
  document.addEventListener('click', event => {
    if (!event.target.closest('#lang-btn')) return;
    window.setTimeout(() => {
      if (window.TRPVehicleDatabase) render(window.TRPVehicleDatabase);
    }, 100);
  });
}());
