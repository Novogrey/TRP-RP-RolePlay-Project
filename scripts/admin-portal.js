(function () {
  'use strict';

  const API = String(window.TRP_APPLICATIONS_API_URL || '').trim();
  const STORAGE_KEY = 'trp-rp-worker-identifier';
  const state = {
    language: localStorage.getItem('language') === 'en' ? 'en' : 'ru',
    identifier: '',
    applications: [],
    statusProfile: null,
    vehicleDatabase: { sections: [], vehicles: [] }
  };
  const copy = {
    ru: {
      eyebrow: 'Внутренние инструменты TRP RP', title: 'Администрирование', accessTitle: 'Доступ',
      accessText: 'Введите личный идентификатор работника. Доступ к каждому разделу определяется отдельно.',
      identifier: 'Идентификатор работника', login: 'Войти', applications: 'Заявления', serverStatus: 'Статус сервера',
      vehicles: 'Автотранспорт', openApplications: 'Открытые заявления',
      openApplicationsText: 'Показываются только заявления, доступные вам для проверки.', refresh: 'Обновить',
      serverStatusText: 'Изменение сохраняется в MongoDB и публикуется в Discord.', newStatus: 'Новый статус',
      comment: 'Комментарий', publishStatus: 'Опубликовать статус', vehicleDatabase: 'База автотранспорта',
      vehicleDatabaseText: 'Разделы и записи синхронизируются с Google Sheets.', importCurrent: 'Импортировать текущий список',
      addVehicle: 'Добавить транспорт', sections: 'Разделы', cancel: 'Отмена', confirm: 'Подтвердить', save: 'Сохранить',
      vehicleRecord: 'Запись автотранспорта', sectionRecord: 'Раздел списка', section: 'Раздел', sortOrder: 'Порядок',
      boardNumber: 'Бортовой номер', model: 'Модель', status: 'Статус', factoryNumber: 'Заводской номер',
      built: 'Построен', arrived: 'Поступил', assignmentRu: 'Назначение (RU)', assignmentEn: 'Назначение (EN)',
      livery: 'Окраска', drivers: 'Закреплённые водители', informationRu: 'Дополнительная информация (RU)',
      informationEn: 'Дополнительная информация (EN)', code: 'Код', photos: 'Фотографии (JSON)', nameRu: 'Название (RU)',
      nameEn: 'Название (EN)', loading: 'Проверяем доступ к разделам...', ready: 'Доступ проверен.', invalidId: 'Укажите идентификатор формата TRP-RP-XXXX-XXXX-XXXX.',
      requestFailed: 'Не удалось выполнить запрос.', noApplications: 'Открытых заявлений для ваших ролей нет.',
      noVehicleData: 'В таблице пока нет разделов и записей.', applicant: 'Заявитель', position: 'Должность', points: 'Поинты',
      submitted: 'Подано', accept: 'Принять', reject: 'Отклонить', sendScores: 'Передать баллы',
      acceptanceDetails: 'Дополнительная информация', rejectionReason: 'Причина отклонения',
      decisionSaved: 'Решение сохранено. Заявление удалено из открытого списка.', statusSaved: 'Статус опубликован.',
      vehicleSaved: 'Изменения сохранены в Google Sheets.', importConfirm: 'Заменить базу в Google Sheets данными текущей страницы списка автотранспорта?',
      importDone: 'Текущий список импортирован.', deleteConfirm: 'Удалить эту запись?', edit: 'Изменить', delete: 'Удалить',
      currentScore: 'Автоматические баллы', answer: 'Ответ', score: 'Баллы', accessDenied: 'Раздел недоступен для ваших ролей.',
      show: 'Показать', hide: 'Скрыть'
    },
    en: {
      eyebrow: 'TRP RP internal tools', title: 'Administration', accessTitle: 'Access',
      accessText: 'Enter your personal employee identifier. Access is checked separately for each section.',
      identifier: 'Employee identifier', login: 'Sign in', applications: 'Applications', serverStatus: 'Server status',
      vehicles: 'Vehicles', openApplications: 'Open applications', openApplicationsText: 'Only applications available for your review are shown.',
      refresh: 'Refresh', serverStatusText: 'Changes are stored in MongoDB and published to Discord.', newStatus: 'New status',
      comment: 'Comment', publishStatus: 'Publish status', vehicleDatabase: 'Vehicle database',
      vehicleDatabaseText: 'Sections and records are synchronized with Google Sheets.', importCurrent: 'Import current list',
      addVehicle: 'Add vehicle', sections: 'Sections', cancel: 'Cancel', confirm: 'Confirm', save: 'Save',
      vehicleRecord: 'Vehicle record', sectionRecord: 'List section', section: 'Section', sortOrder: 'Order',
      boardNumber: 'Fleet number', model: 'Model', status: 'Status', factoryNumber: 'Factory number', built: 'Built',
      arrived: 'Arrived', assignmentRu: 'Assignment (RU)', assignmentEn: 'Assignment (EN)', livery: 'Livery',
      drivers: 'Assigned drivers', informationRu: 'Additional information (RU)', informationEn: 'Additional information (EN)',
      code: 'Code', photos: 'Photos (JSON)', nameRu: 'Name (RU)', nameEn: 'Name (EN)', loading: 'Checking section access...',
      ready: 'Access check completed.', invalidId: 'Enter an identifier in the TRP-RP-XXXX-XXXX-XXXX format.',
      requestFailed: 'The request could not be completed.', noApplications: 'There are no open applications for your roles.',
      noVehicleData: 'The spreadsheet does not contain any sections or records yet.', applicant: 'Applicant', position: 'Position',
      points: 'Points', submitted: 'Submitted', accept: 'Accept', reject: 'Reject', sendScores: 'Submit scores',
      acceptanceDetails: 'Additional information', rejectionReason: 'Rejection reason',
      decisionSaved: 'The decision was saved. The application was removed from the open list.', statusSaved: 'Status published.',
      vehicleSaved: 'Changes saved to Google Sheets.', importConfirm: 'Replace the Google Sheets database with the current vehicle-list page data?',
      importDone: 'The current list was imported.', deleteConfirm: 'Delete this record?', edit: 'Edit', delete: 'Delete',
      currentScore: 'Automatic score', answer: 'Answer', score: 'Score', accessDenied: 'This section is unavailable for your roles.',
      show: 'Show', hide: 'Hide'
    }
  };

  const t = key => copy[state.language][key] || key;
  const byId = id => document.getElementById(id);

  function maskIdentifier(identifier) {
    return /^TRP-RP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(identifier)
      ? 'TRP-RP-••••-••••-••••'
      : '';
  }

  function setNotice(id, message, type) {
    const element = byId(id);
    if (!element) return;
    element.textContent = message || '';
    element.classList.toggle('is-error', type === 'error');
    element.classList.toggle('is-success', type === 'success');
  }

  async function post(payload) {
    if (!API) throw new Error(t('requestFailed'));
    const response = await fetch(API, {
      method: 'POST',
      body: new URLSearchParams({ payload: JSON.stringify(payload) })
    });
    const result = await response.json().catch(() => null);
    if (!result || result.ok === false) {
      const error = new Error(result?.error || t('requestFailed'));
      error.code = result?.code;
      throw error;
    }
    return result;
  }

  function payload(system, extra = {}) {
    return { system, workerIdentifier: state.identifier, language: state.language, ...extra };
  }

  function applyCopy() {
    document.documentElement.lang = state.language;
    document.querySelectorAll('[data-copy]').forEach(element => {
      element.textContent = t(element.dataset.copy);
    });
    const langButton = byId('lang-btn');
    if (langButton) langButton.textContent = state.language === 'ru' ? 'EN' : 'RU';
    renderApplications();
    renderStatus();
    renderVehicles();
  }

  async function syncSiteShell() {
    if (!/^https?:$/.test(location.protocol)) return;
    try {
      const rootUrl = new URL('../', location.href);
      const html = await fetch(rootUrl).then(response => response.text());
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const sourceNav = parsed.querySelector('.navbar');
      const sourceContacts = parsed.querySelector('.contacts-section');
      const sourceDocs = parsed.querySelector('.docs-section');
      const sourceFooter = parsed.querySelector('footer');

      const rebaseShellLinks = shell => {
        shell?.querySelectorAll('[href], [src]').forEach(element => {
          for (const attribute of ['href', 'src']) {
            const value = element.getAttribute(attribute);
            if (!value || /^(?:https?:|mailto:|tel:|data:)/i.test(value)) continue;
            if (value.startsWith('#')) {
              if (attribute === 'href' && element.matches('a.logo, a.nav-link')) {
                element.setAttribute(attribute, new URL(value, rootUrl).href);
              }
              continue;
            }
            element.setAttribute(attribute, new URL(value, rootUrl).href);
          }
        });
      };

      [sourceNav, sourceContacts, sourceDocs, sourceFooter].forEach(rebaseShellLinks);
      if (sourceNav) {
        sourceNav.querySelector('.nav-link.active')?.classList.remove('active');
        document.querySelector('.navbar')?.replaceWith(sourceNav);
      }
      if (sourceContacts) document.querySelector('.contacts-section')?.replaceWith(sourceContacts);
      if (sourceDocs) document.querySelector('.docs-section')?.replaceWith(sourceDocs);
      if (sourceFooter) document.querySelector('footer')?.replaceWith(sourceFooter);
      window.TrpInstallNavigation?.boot?.();
      window.TrpSharedMenu?.init?.();
      const settingsLink = document.querySelector('#trp-settings-link, .trp-settings-btn');
      if (settingsLink) settingsLink.href = new URL('settings/', rootUrl).href;
      bindShellControls();
      applyCopy();
    } catch (error) {
      // The local file fallback shell remains available when index.html cannot be fetched.
    }
  }

  function bindShellControls() {
    const langButton = byId('lang-btn');
    if (langButton && langButton.dataset.adminBound !== 'true') {
      langButton.dataset.adminBound = 'true';
      langButton.addEventListener('click', () => {
        state.language = state.language === 'ru' ? 'en' : 'ru';
        localStorage.setItem('language', state.language);
        applyCopy();
      });
    }
    const themeButton = byId('theme-btn');
    if (themeButton && themeButton.dataset.adminBound !== 'true') {
      themeButton.dataset.adminBound = 'true';
      themeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
      themeButton.addEventListener('click', () => {
        const dark = !document.body.classList.contains('dark-mode');
        document.body.classList.toggle('dark-mode', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        themeButton.textContent = dark ? '☀️' : '🌙';
      });
    }
  }

  function detail(label, value) {
    const item = document.createElement('div');
    item.className = 'admin-detail';
    const name = document.createElement('span');
    name.textContent = label;
    const content = document.createElement('strong');
    content.textContent = value == null || value === '' ? '—' : String(value);
    item.append(name, content);
    return item;
  }

  function button(label, className, handler) {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = className;
    element.textContent = label;
    element.addEventListener('click', handler);
    return element;
  }

  function applicantName(application) {
    return application.applicant?.displayName
      || application.applicant?.discordUsername
      || application.applicant?.robloxUsername
      || '—';
  }

  function renderApplications() {
    const list = byId('application-list');
    if (!list) return;
    list.replaceChildren();
    if (!state.applications.length) {
      const empty = document.createElement('div');
      empty.className = 'admin-empty';
      empty.textContent = t('noApplications');
      list.append(empty);
      return;
    }
    state.applications.forEach(application => {
      const article = document.createElement('article');
      article.className = 'admin-application';
      const head = document.createElement('div');
      head.className = 'admin-item-head';
      const titleWrap = document.createElement('div');
      const title = document.createElement('h3');
      title.className = 'admin-item-title';
      title.textContent = `${application.code} · ${application.type}`;
      const meta = document.createElement('p');
      meta.className = 'admin-item-meta';
      meta.textContent = `${t('applicant')}: ${applicantName(application)}`;
      titleWrap.append(title, meta);
      const actions = document.createElement('div');
      actions.className = 'admin-item-actions';
      head.append(titleWrap, actions);
      const details = document.createElement('div');
      details.className = 'admin-detail-grid';
      details.append(
        detail(t('position'), application.applicant?.positionLabel),
        detail(t('points'), application.applicant?.points),
        detail(t('submitted'), application.submittedAt ? new Date(application.submittedAt).toLocaleString(state.language) : '—')
      );
      (application.fields || []).forEach(field => details.append(detail(field.label, field.value)));
      article.append(head, details);

      if (application.stage === 'stage1_review') {
        const questions = document.createElement('div');
        questions.className = 'admin-list';
        (application.manualQuestions || []).forEach(question => {
          const block = document.createElement('div');
          block.className = 'admin-manual-question';
          const label = document.createElement('strong');
          label.textContent = question.label;
          const answer = document.createElement('p');
          answer.textContent = `${t('answer')}: ${question.answer}`;
          const scoreRow = document.createElement('div');
          scoreRow.className = 'admin-score-row';
          const info = document.createElement('span');
          info.textContent = `${t('currentScore')}: ${application.automaticScore}/${application.maximumScore}`;
          const input = document.createElement('input');
          input.type = 'number';
          input.min = '0';
          input.max = String(question.maximumScore);
          input.required = true;
          input.dataset.scoreQuestion = question.id;
          input.value = question.score == null ? '' : String(question.score);
          input.setAttribute('aria-label', `${t('score')} 0-${question.maximumScore}`);
          scoreRow.append(info, input);
          block.append(label, answer, scoreRow);
          questions.append(block);
        });
        article.append(questions);
        actions.append(button(t('sendScores'), 'admin-primary-button', () => submitScores(application, article)));
      } else {
        actions.append(
          button(t('accept'), 'admin-primary-button', () => openDecision(application, 'accepted')),
          button(t('reject'), 'admin-danger-button', () => openDecision(application, 'rejected'))
        );
      }
      list.append(article);
    });
  }

  async function refreshApplications() {
    const result = await post(payload('admin-applications-list'));
    state.applications = result.applications || [];
    renderApplications();
  }

  function openDecision(application, decision) {
    byId('decision-application-id').value = application.id;
    byId('decision-category').value = application.category;
    byId('decision-value').value = decision;
    byId('decision-note').value = '';
    byId('decision-note').required = decision === 'rejected';
    byId('decision-title').textContent = decision === 'accepted' ? t('accept') : t('reject');
    byId('decision-note-label').textContent = decision === 'accepted' ? t('acceptanceDetails') : t('rejectionReason');
    byId('decision-dialog').showModal();
  }

  async function submitDecision() {
    const decision = byId('decision-value').value;
    const note = byId('decision-note').value.trim();
    if (decision === 'rejected' && note.length < 3) return;
    await post(payload('admin-applications-decision', {
      applicationId: byId('decision-application-id').value,
      category: byId('decision-category').value,
      decision,
      reason: note,
      details: note
    }));
    byId('decision-dialog').close();
    setNotice('admin-notice', t('decisionSaved'), 'success');
    await refreshApplications();
  }

  async function submitScores(application, article) {
    const scores = {};
    for (const input of article.querySelectorAll('[data-score-question]')) {
      if (!input.value) return input.focus();
      scores[input.dataset.scoreQuestion] = Number(input.value);
    }
    await post(payload('admin-applications-decision', {
      applicationId: application.id,
      category: application.category,
      scores
    }));
    setNotice('admin-notice', t('decisionSaved'), 'success');
    await refreshApplications();
  }

  function renderStatus() {
    const profile = state.statusProfile;
    const badge = byId('current-server-status');
    const select = byId('server-status-select');
    if (!badge || !select) return;
    select.replaceChildren();
    if (!profile) {
      badge.textContent = t('accessDenied');
      badge.style.color = '';
      return;
    }
    badge.textContent = profile.status.label;
    badge.style.color = profile.status.color;
    profile.options.forEach(item => {
      const optionElement = document.createElement('option');
      optionElement.value = item.id;
      optionElement.textContent = item.label;
      optionElement.selected = item.id === profile.status.state;
      select.append(optionElement);
    });
  }

  async function loadStatusProfile() {
    try {
      const result = await post(payload('admin-status-profile'));
      state.statusProfile = result.profile;
      setNotice('server-status-notice', '', '');
    } catch (error) {
      state.statusProfile = null;
      setNotice('server-status-notice', error.message, 'error');
    }
    renderStatus();
  }

  async function saveStatus() {
    const result = await post(payload('admin-status-update', {
      state: byId('server-status-select').value,
      reason: byId('server-status-reason').value.trim()
    }));
    state.statusProfile.status = result.status;
    renderStatus();
    setNotice('server-status-notice', t('statusSaved'), 'success');
  }

  function renderVehicles() {
    const sectionList = byId('vehicle-sections');
    const vehicleList = byId('vehicle-list');
    const sectionSelect = byId('vehicle-section');
    if (!sectionList || !vehicleList || !sectionSelect) return;
    sectionList.replaceChildren();
    vehicleList.replaceChildren();
    sectionSelect.replaceChildren();
    const sections = [...state.vehicleDatabase.sections].sort((a, b) => a.sortOrder - b.sortOrder);
    sections.forEach(section => {
      const row = document.createElement('div');
      row.className = 'admin-section-row';
      const label = document.createElement('strong');
      label.textContent = state.language === 'ru' ? section.nameRu : section.nameEn;
      row.append(
        label,
        button('✎', 'admin-icon-button', () => openSection(section)),
        button('×', 'admin-icon-button', () => deleteSection(section))
      );
      sectionList.append(row);
      const optionElement = document.createElement('option');
      optionElement.value = section.id;
      optionElement.textContent = label.textContent;
      sectionSelect.append(optionElement);
    });
    if (!sections.length && !state.vehicleDatabase.vehicles.length) {
      const empty = document.createElement('div');
      empty.className = 'admin-empty';
      empty.textContent = t('noVehicleData');
      vehicleList.append(empty);
      return;
    }
    [...state.vehicleDatabase.vehicles].sort((a, b) => a.sectionId.localeCompare(b.sectionId) || a.sortOrder - b.sortOrder).forEach(vehicle => {
      const row = document.createElement('article');
      row.className = 'admin-vehicle-row';
      const head = document.createElement('div');
      head.className = 'admin-item-head';
      const info = document.createElement('div');
      const title = document.createElement('h3');
      title.className = 'admin-item-title';
      title.textContent = `${vehicle.boardNumber} · ${vehicle.model}`;
      const meta = document.createElement('p');
      meta.className = 'admin-item-meta';
      meta.textContent = vehicle.status;
      info.append(title, meta);
      const actions = document.createElement('div');
      actions.className = 'admin-item-actions';
      actions.append(
        button(t('edit'), 'admin-secondary-button', () => openVehicle(vehicle)),
        button(t('delete'), 'admin-danger-button', () => deleteVehicle(vehicle))
      );
      head.append(info, actions);
      row.append(head);
      vehicleList.append(row);
    });
  }

  async function loadVehicles() {
    try {
      const result = await post(payload('vehicle-admin-load'));
      state.vehicleDatabase = result.database || { sections: [], vehicles: [] };
      setNotice('vehicle-notice', '', '');
    } catch (error) {
      state.vehicleDatabase = { sections: [], vehicles: [] };
      setNotice('vehicle-notice', error.message, 'error');
    }
    renderVehicles();
  }

  async function saveVehicleOperation(operation, successMessage = t('vehicleSaved')) {
    const result = await post(payload('vehicle-admin-save', { operation }));
    state.vehicleDatabase = result.database;
    renderVehicles();
    setNotice('vehicle-notice', successMessage, 'success');
  }

  function openSection(section = null) {
    byId('section-id').value = section?.id || '';
    byId('section-id').readOnly = Boolean(section);
    byId('section-name-ru').value = section?.nameRu || '';
    byId('section-name-en').value = section?.nameEn || '';
    byId('section-order').value = section?.sortOrder ?? state.vehicleDatabase.sections.length;
    byId('section-dialog').showModal();
  }

  async function saveSection() {
    await saveVehicleOperation({
      action: 'upsertSection',
      section: {
        id: byId('section-id').value.trim(),
        nameRu: byId('section-name-ru').value.trim(),
        nameEn: byId('section-name-en').value.trim(),
        sortOrder: Number(byId('section-order').value) || 0
      }
    });
    byId('section-dialog').close();
  }

  async function deleteSection(section) {
    if (!confirm(t('deleteConfirm'))) return;
    await saveVehicleOperation({ action: 'deleteSection', sectionId: section.id });
  }

  const vehicleFieldIds = {
    id: 'vehicle-id', sectionId: 'vehicle-section', sortOrder: 'vehicle-order', boardNumber: 'vehicle-board',
    model: 'vehicle-model', status: 'vehicle-status', factoryNumber: 'vehicle-factory', built: 'vehicle-built',
    arrived: 'vehicle-arrived', assignmentRu: 'vehicle-assignment-ru', assignmentEn: 'vehicle-assignment-en',
    livery: 'vehicle-livery', drivers: 'vehicle-drivers', informationRu: 'vehicle-info-ru',
    informationEn: 'vehicle-info-en', code: 'vehicle-code'
  };

  function openVehicle(vehicle = null) {
    Object.entries(vehicleFieldIds).forEach(([key, id]) => {
      byId(id).value = vehicle?.[key] ?? (key === 'sortOrder' ? state.vehicleDatabase.vehicles.length : '');
    });
    byId('vehicle-photos').value = JSON.stringify(vehicle?.photos || [], null, 2);
    byId('vehicle-dialog').showModal();
  }

  async function saveVehicle() {
    let photos = [];
    const photosText = byId('vehicle-photos').value.trim();
    if (photosText) {
      photos = JSON.parse(photosText);
      if (!Array.isArray(photos)) throw new Error('Photos JSON must be an array.');
    }
    const vehicle = {};
    Object.entries(vehicleFieldIds).forEach(([key, id]) => {
      vehicle[key] = key === 'sortOrder' ? Number(byId(id).value) || 0 : byId(id).value.trim();
    });
    vehicle.id = vehicle.id || vehicle.boardNumber;
    vehicle.photos = photos;
    await saveVehicleOperation({ action: 'upsertVehicle', vehicle });
    byId('vehicle-dialog').close();
  }

  async function deleteVehicle(vehicle) {
    if (!confirm(t('deleteConfirm'))) return;
    await saveVehicleOperation({ action: 'deleteVehicle', vehicleId: vehicle.id });
  }

  async function importCurrentVehicleList() {
    if (!confirm(t('importConfirm'))) return;
    const url = new URL('../other/vehicle_list/', location.href);
    const html = await fetch(url).then(response => response.text());
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    const blocks = [...parsed.querySelectorAll('.tables-section .table-block')];
    const sections = [];
    const vehicles = [];
    blocks.forEach((block, blockIndex) => {
      const id = `section_${blockIndex + 1}`;
      const name = block.querySelector('h2')?.textContent.trim() || id;
      sections.push({ id, nameRu: name, nameEn: name, sortOrder: blockIndex });
      [...block.querySelectorAll('tbody tr')].forEach((row, rowIndex) => {
        const cells = [...row.cells].map(cell => cell.textContent.trim());
        if (cells.length < 4) return;
        const boardNumber = row.querySelector('.tbus-link')?.dataset.id || cells[1];
        vehicles.push({
          id: boardNumber,
          sectionId: id,
          sortOrder: rowIndex,
          boardNumber,
          model: cells[2] || '—',
          status: cells[3] || '—',
          factoryNumber: cells[4] || '',
          livery: cells[5] || '',
          informationRu: cells[6] || '',
          informationEn: '',
          built: '', arrived: '', assignmentRu: '', assignmentEn: '', drivers: '', code: '', photos: []
        });
      });
    });
    await saveVehicleOperation({ action: 'replaceDatabase', sections, vehicles }, t('importDone'));
  }

  async function login() {
    const identifier = byId('worker-identifier').value.trim().toUpperCase();
    if (!/^TRP-RP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(identifier)) {
      return setNotice('admin-notice', t('invalidId'), 'error');
    }
    state.identifier = identifier;
    localStorage.setItem(STORAGE_KEY, identifier);
    setNotice('admin-notice', t('loading'), '');
    byId('admin-login').disabled = true;
    const tasks = await Promise.allSettled([refreshApplications(), loadStatusProfile(), loadVehicles()]);
    byId('admin-login').disabled = false;
    if (tasks.every(result => result.status === 'rejected')) {
      return setNotice('admin-notice', tasks[0].reason?.message || t('requestFailed'), 'error');
    }
    byId('admin-workspace').hidden = false;
    byId('admin-account').hidden = false;
    byId('admin-account-name').textContent = maskIdentifier(identifier);
    setNotice('admin-notice', t('ready'), 'success');
  }

  function bind() {
    document.body.classList.toggle('dark-mode', (localStorage.getItem('theme') || 'dark') === 'dark');
    const saved = localStorage.getItem(STORAGE_KEY) || '';
    byId('worker-identifier').value = saved;
    byId('admin-login').addEventListener('click', () => login().catch(error => setNotice('admin-notice', error.message, 'error')));
    byId('identifier-visibility').addEventListener('click', () => {
      const input = byId('worker-identifier');
      input.type = input.type === 'password' ? 'text' : 'password';
      byId('identifier-visibility').title = input.type === 'password' ? t('show') : t('hide');
    });
    document.querySelectorAll('.admin-tab').forEach(tab => tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(item => item.classList.toggle('is-active', item === tab));
      document.querySelectorAll('.admin-panel').forEach(panel => {
        const active = panel.id === tab.dataset.tab;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
      history.replaceState(null, '', `#${tab.dataset.tab}`);
    }));
    byId('refresh-applications').addEventListener('click', () => refreshApplications().catch(error => setNotice('admin-notice', error.message, 'error')));
    byId('save-server-status').addEventListener('click', () => saveStatus().catch(error => setNotice('server-status-notice', error.message, 'error')));
    byId('new-section').addEventListener('click', () => openSection());
    byId('new-vehicle').addEventListener('click', () => openVehicle());
    byId('import-vehicle-list').addEventListener('click', () => importCurrentVehicleList().catch(error => setNotice('vehicle-notice', error.message, 'error')));
    byId('decision-form').addEventListener('submit', event => { event.preventDefault(); submitDecision().catch(error => setNotice('admin-notice', error.message, 'error')); });
    byId('section-form').addEventListener('submit', event => { event.preventDefault(); saveSection().catch(error => setNotice('vehicle-notice', error.message, 'error')); });
    byId('vehicle-form').addEventListener('submit', event => { event.preventDefault(); saveVehicle().catch(error => setNotice('vehicle-notice', error.message, 'error')); });
    document.querySelectorAll('.admin-dialog [value="cancel"]').forEach(control => {
      control.addEventListener('click', () => control.closest('dialog')?.close());
    });
    bindShellControls();
    applyCopy();
    const initialTab = location.hash.slice(1);
    document.querySelector(`.admin-tab[data-tab="${CSS.escape(initialTab)}"]`)?.click();
    syncSiteShell();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once: true });
  else bind();
}());
