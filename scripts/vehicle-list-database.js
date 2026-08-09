(function () {
  'use strict';

  const api = String(window.TRP_APPLICATIONS_API_URL || '').trim();
  const registrationPath = '../../forms/applications/registration_&_replacement/';
  const collapsedGroupsKey = 'trp-rp-vehicle-list-collapsed';
  const collapsedGroups = loadCollapsedGroups();
  let collapseControlId = 0;
  const statusCopy = Object.freeze({
    'Эксплуатируется': 'In service',
    'В ремонте': 'Under repair',
    'Не эксплуатируется': 'Not in service',
    'Выведен из эксплуатации / ожидание исключения': 'Withdrawn from service / awaiting removal',
    'Капитально-восстановительный ремонт': 'Capital restoration repair',
    'Загружается': 'Loading',
    'Модернизация': 'Modernization',
    'Списан': 'Decommissioned',
    'Передан в другой город': 'Transferred to another city',
    'Местонахождение и судьба неизвестны': 'Location and fate unknown'
  });

  function container() {
    return document.querySelector('.tables-section .container');
  }

  function loadCollapsedGroups() {
    try {
      const stored = JSON.parse(localStorage.getItem(collapsedGroupsKey) || '[]');
      return new Set(Array.isArray(stored) ? stored.map(String) : []);
    } catch (error) {
      return new Set();
    }
  }

  function persistCollapsedGroups() {
    try {
      localStorage.setItem(collapsedGroupsKey, JSON.stringify([...collapsedGroups]));
    } catch (error) {
      // The list remains usable when browser storage is unavailable.
    }
  }

  if (!api || !container()) return;

  function language() {
    return localStorage.getItem('language') === 'en' ? 'en' : 'ru';
  }

  function syncPageTitle() {
    const title = language() === 'en'
      ? 'Officially registered rolling stock of "TRP RP"'
      : 'Официально зарегистрированный подвижной состав "TRP RP"';
    document.title = title;
    const heading = document.querySelector('.hero-list-content h1, .hero-list h1');
    if (heading) heading.textContent = title;
  }

  function text() {
    return language() === 'en'
      ? { loading: 'Loading vehicle database...', empty: 'The vehicle database is empty.', failed: 'The vehicle database could not be loaded.', retry: 'Retry' }
      : { loading: 'Загрузка базы автотранспорта...', empty: 'В базе автотранспорта пока нет записей.', failed: 'Не удалось загрузить базу автотранспорта.', retry: 'Повторить' };
  }

  function localizedStatus(status, lang = language()) {
    const canonical = String(status || '').trim();
    return lang === 'en' ? statusCopy[canonical] || canonical : canonical;
  }

  function syncLocalizedStatusUi() {
    const lang = language();
    document.querySelectorAll('.status[data-status]').forEach(status => {
      const canonical = String(status.dataset.status || '').trim();
      const translated = localizedStatus(canonical, lang);
      if (canonical && status.textContent !== translated) status.textContent = translated;
    });

    const filter = document.getElementById('vehicle-filter-status');
    if (!filter) return;
    const selected = filter.value;
    const desired = [
      { value: '', label: lang === 'en' ? 'All statuses' : 'Все статусы' },
      ...Object.keys(statusCopy).map(status => ({ value: status, label: localizedStatus(status, lang) }))
    ];
    const current = [...filter.options].map(option => ({ value: option.value, label: option.textContent }));
    const matches = current.length === desired.length
      && current.every((option, index) => option.value === desired[index].value && option.label === desired[index].label);
    if (!matches) {
      const options = desired.map(entry => {
        const option = document.createElement('option');
        option.value = entry.value;
        option.textContent = entry.label;
        return option;
      });
      filter.replaceChildren(...options);
    }
    filter.value = [...filter.options].some(option => option.value === selected) ? selected : '';
  }

  function scheduleLocalizedStatusUi() {
    window.requestAnimationFrame(() => {
      syncLocalizedStatusUi();
      syncPageTitle();
    });
    window.setTimeout(() => {
      syncLocalizedStatusUi();
      syncPageTitle();
    }, 80);
  }

  function assignedDriverCount(value) {
    if (Array.isArray(value)) return new Set(value.map(String).map(entry => entry.trim()).filter(Boolean)).size;
    const normalized = String(value || '').trim();
    if (!normalized || ['-', '—', 'нет', 'none', 'no data'].includes(normalized.toLowerCase())) return 0;
    return new Set(normalized.split(/[,;|\n]+/).map(entry => entry.trim()).filter(Boolean)).size;
  }

  function canRegister(vehicle) {
    return String(vehicle?.status || '').trim() === 'Эксплуатируется'
      && assignedDriverCount(vehicle?.drivers) < 3;
  }

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content != null) node.textContent = String(content);
    return node;
  }

  function clearTables(target) {
    target.querySelectorAll('.vehicle-category').forEach(group => group.remove());
    target.querySelectorAll('.table-block').forEach(block => block.remove());
  }

  function collapsibleHeading(title, content, key, className, owner) {
    const heading = element('h2', className);
    const toggle = element('button', 'vehicle-collapse-toggle');
    const label = element('span', 'vehicle-collapse-label', title);
    const icon = element('span', 'vehicle-collapse-icon');
    const contentId = `vehicle-collapse-${++collapseControlId}`;
    const collapsed = collapsedGroups.has(key);

    content.id = contentId;
    content.hidden = collapsed;
    owner.classList.toggle('is-collapsed', collapsed);
    toggle.type = 'button';
    toggle.setAttribute('aria-controls', contentId);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    icon.setAttribute('aria-hidden', 'true');
    toggle.append(label, icon);
    toggle.addEventListener('click', () => {
      const nextCollapsed = !content.hidden;
      content.hidden = nextCollapsed;
      owner.classList.toggle('is-collapsed', nextCollapsed);
      toggle.setAttribute('aria-expanded', String(!nextCollapsed));
      if (nextCollapsed) collapsedGroups.add(key);
      else collapsedGroups.delete(key);
      persistCollapsedGroups();
    });
    heading.append(toggle);
    return heading;
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

  function tableBlock(section, vehicles, lang, hideHeading = false) {
    const block = element('div', 'table-block');
    block.dataset.vehicleSection = section.id;
    const wrapper = element('div', 'table-wrapper');
    if (!hideHeading) {
      block.append(collapsibleHeading(
        lang === 'ru' ? section.nameRu : section.nameEn,
        wrapper,
        `section:${section.id}`,
        '',
        block
      ));
    }
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
        cellWithSpan('status', vehicle, localizedStatus(vehicle.status, lang)),
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

  function categoryBlock(category, childrenByParent, vehiclesBySection, lang, ancestors, rendered) {
    if (ancestors.has(category.id)) return null;
    rendered.add(category.id);
    const childSections = childrenByParent.get(category.id) || [];
    const categoryVehicles = vehiclesBySection.get(category.id) || [];
    if (!childSections.length) {
      return categoryVehicles.length ? tableBlock(category, categoryVehicles, lang) : null;
    }

    const nextAncestors = new Set(ancestors);
    nextAncestors.add(category.id);
    const childBlocks = childSections
      .map(section => categoryBlock(
        section,
        childrenByParent,
        vehiclesBySection,
        lang,
        nextAncestors,
        rendered
      ))
      .filter(Boolean);
    if (!categoryVehicles.length && !childBlocks.length) return null;

    const group = element('section', 'vehicle-category');
    group.dataset.vehicleCategory = category.id;
    group.style.setProperty('--vehicle-category-depth', String(Math.min(ancestors.size, 12)));
    const content = element('div', 'vehicle-category-sections');
    group.append(collapsibleHeading(
      lang === 'ru' ? category.nameRu : category.nameEn,
      content,
      `section:${category.id}`,
      'vehicle-category-title',
      group
    ));
    if (categoryVehicles.length) content.append(tableBlock(category, categoryVehicles, lang, true));
    childBlocks.forEach(block => content.append(block));
    group.append(content);
    return group;
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
    const sortedSections = [...sections].sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder));
    const sectionIds = new Set(sortedSections.map(section => section.id));
    const childrenByParent = new Map();
    sortedSections.forEach(section => {
      const parentId = section.parentId !== section.id && sectionIds.has(section.parentId)
        ? section.parentId
        : '';
      if (!childrenByParent.has(parentId)) childrenByParent.set(parentId, []);
      childrenByParent.get(parentId).push(section);
    });
    const vehiclesBySection = new Map();
    vehicles.forEach(vehicle => {
      if (!vehiclesBySection.has(vehicle.sectionId)) vehiclesBySection.set(vehicle.sectionId, []);
      vehiclesBySection.get(vehicle.sectionId).push(vehicle);
    });
    vehiclesBySection.forEach(entries => {
      entries.sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder));
    });
    const validCollapseKeys = new Set(sortedSections.map(section => `section:${section.id}`));
    let collapseStateChanged = false;
    collapsedGroups.forEach(key => {
      if (!validCollapseKeys.has(key)) {
        collapsedGroups.delete(key);
        collapseStateChanged = true;
      }
    });
    if (collapseStateChanged) persistCollapsedGroups();

    const rendered = new Set();
    const appendSection = section => {
      const block = categoryBlock(
        section,
        childrenByParent,
        vehiclesBySection,
        lang,
        new Set(),
        rendered
      );
      if (block) target.append(block);
    };
    (childrenByParent.get('') || []).forEach(appendSection);
    sortedSections.forEach(section => {
      if (!rendered.has(section.id)) appendSection(section);
    });
    window.dispatchEvent(new CustomEvent('trp-vehicle-database-rendered', { detail: window.TRPVehicleDatabase }));
    scheduleLocalizedStatusUi();
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

  function updateRegistrationButton(boardNumber) {
    const button = document.getElementById('modalRegisterBtn');
    if (!button) return;
    const vehicle = window.TRPVehicleDatabase?.vehicles?.find(entry => {
      return String(entry.boardNumber || entry.id) === String(boardNumber || '');
    });
    const available = canRegister(vehicle);
    button.hidden = !available;
    button.style.display = available ? '' : 'none';
    button.setAttribute('aria-hidden', String(!available));
    if (available) {
      const url = new URL(registrationPath, window.location.href);
      url.searchParams.set('operation', 'bind');
      url.searchParams.set('vehicle', String(vehicle.boardNumber || vehicle.id));
      button.href = url.toString();
      button.removeAttribute('target');
    } else {
      button.removeAttribute('href');
    }
  }

  updateRegistrationButton('');

  let restoreTimer = 0;
  function restoreAfterBodyReplacement() {
    clearTimeout(restoreTimer);
    restoreTimer = window.setTimeout(() => {
      const target = container();
      if (!target || !window.TRPVehicleDatabase) return;
      if (!target.querySelector('.table-block')) render(window.TRPVehicleDatabase);
      updateRegistrationButton('');
      scheduleLocalizedStatusUi();
    }, 40);
  }

  syncPageTitle();
  load();
  document.addEventListener('click', event => {
    const vehicleLink = event.target.closest('.tbus-link');
    if (vehicleLink) {
      window.setTimeout(() => updateRegistrationButton(vehicleLink.dataset.id), 0);
    }
    if (event.target.closest('#lang-btn')) {
      [100, 500, 1000, 1800, 2600].forEach(delay => window.setTimeout(restoreAfterBodyReplacement, delay));
    }
  });

  new MutationObserver(mutations => {
    if (!window.TRPVehicleDatabase) return;
    if (mutations.some(mutation => mutation.type === 'childList')) restoreAfterBodyReplacement();
  }).observe(document.documentElement, { childList: true, subtree: true });
}());
