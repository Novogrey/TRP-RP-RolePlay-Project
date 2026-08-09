(function () {
  'use strict';

  const API = String(window.TRP_APPLICATIONS_API_URL || '').trim();
  const STORAGE_KEY = 'trp-rp-worker-identifier';
  const state = {
    language: localStorage.getItem('language') === 'en' ? 'en' : 'ru',
    identifier: '',
    applications: [],
    shiftProfile: null,
    shiftOffers: [],
    rpSessions: [],
    shiftPage: 0,
    shiftTotalPages: 1,
    shiftReservation: null,
    statusProfile: null,
    vehicleDatabase: { sections: [], vehicles: [] },
    vehicleSectionFilter: ''
  };
  const copy = {
    ru: {
      eyebrow: 'Внутренние инструменты TRP RP', title: 'Администрирование', accessTitle: 'Доступ',
      accessText: 'Введите личный идентификатор работника. Доступ к каждому разделу определяется отдельно.',
      identifier: 'Идентификатор работника', login: 'Войти', applications: 'Заявления', shifts: 'Смены и РП-сессии', serverStatus: 'Статус сервера',
      vehicles: 'Автотранспорт', openApplications: 'Открытые заявления',
      openApplicationsText: 'Показываются только заявления, доступные вам для проверки.', refresh: 'Обновить',
      serverStatusText: 'Изменение сохраняется в MongoDB и публикуется в Discord.', newStatus: 'Новый статус',
      comment: 'Комментарий', publishStatus: 'Опубликовать статус', vehicleDatabase: 'База автотранспорта',
      vehicleDatabaseText: 'Разделы и записи синхронизируются с Google Sheets.', importCurrent: 'Импортировать текущий список',
      addVehicle: 'Добавить транспорт', sections: 'Категории и разделы', filterSection: 'Фильтр по категории или разделу', allSections: 'Все категории и разделы',
      vehicleCount: 'Показано: {shown} из {total}', noVehiclesInSection: 'В выбранном разделе нет записей.',
      cancel: 'Отмена', confirm: 'Подтвердить', save: 'Сохранить',
      vehicleRecord: 'Запись автотранспорта', addVehicleRecord: 'Регистрация транспорта', editVehicleRecord: 'Редактирование транспорта',
      sectionRecord: 'Категория или раздел списка', section: 'Раздел', sortOrder: 'Порядок',
      parentCategory: 'Родительская категория', rootCategory: 'Без родительской категории',
      boardNumber: 'Бортовой номер', model: 'Модель', status: 'Статус', factoryNumber: 'Заводской номер',
      built: 'Построен', arrived: 'Поступил', assignmentRu: 'Назначение (RU)', assignmentEn: 'Назначение (EN)',
      livery: 'Окраска', drivers: 'Закреплённые водители', informationRu: 'Дополнительная информация (RU)',
      informationEn: 'Дополнительная информация (EN)', code: 'Код', photos: 'Фотографии', nameRu: 'Название (RU)',
      vehicleMain: 'Основные данные', vehicleMainText: 'Раздел, идентификаторы и текущее состояние транспорта.',
      vehicleDetails: 'Эксплуатационные данные', vehicleDetailsText: 'Даты, назначение, окраска и закреплённые сотрудники.',
      vehicleInformation: 'Информация и код', vehicleInformationText: 'Тексты для обеих языковых версий и служебный код.',
      photosHelp: 'Добавьте прямую ссылку на изображение и данные для подписи.', addPhoto: 'Добавить фотографию',
      photo: 'Фотография', imageUrl: 'URL изображения', depotRu: 'Депо (RU)', depotEn: 'Депо (EN)', photoDate: 'Дата',
      photoAuthor: 'Автор', authorUrl: 'Ссылка на автора', photoEvent: 'Событие или подпись', removePhoto: 'Удалить',
      noPhotos: 'Фотографии не добавлены.', invalidPhotoUrl: 'Укажите корректную ссылку на изображение.',
      nameEn: 'Название (EN)', loading: 'Проверяем доступ к разделам...', ready: 'Доступ проверен.', invalidId: 'Укажите идентификатор формата TRP-RP-XXXX-XXXX-XXXX.',
      requestFailed: 'Не удалось выполнить запрос.', noApplications: 'Открытых заявлений для ваших ролей нет.',
      noVehicleData: 'В таблице пока нет разделов и записей.', applicant: 'Заявитель', position: 'Должность', points: 'Поинты',
      submitted: 'Подано', accept: 'Принять', reject: 'Отклонить', sendScores: 'Передать баллы',
      acceptanceDetails: 'Дополнительная информация', rejectionReason: 'Причина отклонения',
      decisionSaved: 'Решение сохранено. Заявление удалено из открытого списка.', statusSaved: 'Статус опубликован.',
      vehicleSaved: 'Изменения сохранены в Google Sheets.', importConfirm: 'Заменить базу в Google Sheets данными текущей страницы списка автотранспорта?',
      importDone: 'Текущий список импортирован.', deleteConfirm: 'Удалить эту запись?', edit: 'Изменить', delete: 'Удалить',
      selectModel: 'Выберите модель', selectStatus: 'Выберите статус', selectLivery: 'Выберите окраску',
      liveriesUnavailable: 'Для этой модели окраски недоступны.', duplicateBoard: 'Этот бортовой номер уже используется.',
      duplicateFactory: 'Этот заводской номер уже используется.',
      currentScore: 'Автоматические баллы', answer: 'Ответ', score: 'Баллы', accessDenied: 'Раздел недоступен для ваших ролей.',
      show: 'Показать', hide: 'Скрыть',
      availableShifts: 'Доступные даты', availableShiftsText: 'Даты берутся из того же графика, что и команда /график-смен. Создание доступно только сотрудникам с правом ДТУ.',
      availableOffers: 'Можно взять', upcomingRpSessions: 'Предстоящие РП-сессии', previous: 'Назад', next: 'Далее',
      takeShift: 'Взять', noShiftOffers: 'Свободных дат сейчас нет.', noRpSessions: 'Предстоящих РП-сессий нет.',
      page: 'Страница {page} из {total}', createScheduledEvent: 'Создание публикации', eventType: 'Тип события',
      regularShift: 'Смена', rpSession: 'РП-сессия', publicationLanguage: 'Язык публикации', startTime: 'Начало по Москве',
      endTime: 'Окончание по Москве', breakStart: 'Начало перерыва', breakEnd: 'Окончание перерыва',
      breakHelp: 'Для события продолжительностью от 4 часов необходимо указать начало и окончание перерыва.',
      publish: 'Опубликовать', reservationUntil: 'Резерв действует до {time}.', shiftPublished: 'Публикация создана: {code}.',
      shiftDate: 'Дата по Москве: {date}', organizer: 'Организатор: {name}', lockPanel: 'Заблокировать панель',
      unlockPanel: 'Разблокировать панель', panelLocked: 'Панель заблокирована разработчиком.',
      lockReason: 'Причина блокировки', lockDuration: 'Срок в минутах',
      lockDurationHelp: 'Укажите 0 для бессрочной блокировки.', permanentLock: 'бессрочно',
      lockedUntil: 'до {time}', lockedDetails: '{reason}; {duration}'
    },
    en: {
      eyebrow: 'TRP RP internal tools', title: 'Administration', accessTitle: 'Access',
      accessText: 'Enter your personal employee identifier. Access is checked separately for each section.',
      identifier: 'Employee identifier', login: 'Sign in', applications: 'Applications', shifts: 'Shifts and RP sessions', serverStatus: 'Server status',
      vehicles: 'Vehicles', openApplications: 'Open applications', openApplicationsText: 'Only applications available for your review are shown.',
      refresh: 'Refresh', serverStatusText: 'Changes are stored in MongoDB and published to Discord.', newStatus: 'New status',
      comment: 'Comment', publishStatus: 'Publish status', vehicleDatabase: 'Vehicle database',
      vehicleDatabaseText: 'Sections and records are synchronized with Google Sheets.', importCurrent: 'Import current list',
      addVehicle: 'Add vehicle', sections: 'Categories and sections', filterSection: 'Filter by category or section', allSections: 'All categories and sections',
      vehicleCount: 'Showing {shown} of {total}', noVehiclesInSection: 'There are no records in the selected section.',
      cancel: 'Cancel', confirm: 'Confirm', save: 'Save',
      vehicleRecord: 'Vehicle record', addVehicleRecord: 'Register vehicle', editVehicleRecord: 'Edit vehicle',
      sectionRecord: 'List category or section', section: 'Section', sortOrder: 'Order',
      parentCategory: 'Parent category', rootCategory: 'No parent category',
      boardNumber: 'Fleet number', model: 'Model', status: 'Status', factoryNumber: 'Factory number', built: 'Built',
      arrived: 'Arrived', assignmentRu: 'Assignment (RU)', assignmentEn: 'Assignment (EN)', livery: 'Livery',
      drivers: 'Assigned drivers', informationRu: 'Additional information (RU)', informationEn: 'Additional information (EN)',
      code: 'Code', photos: 'Photos', nameRu: 'Name (RU)', nameEn: 'Name (EN)',
      vehicleMain: 'Main data', vehicleMainText: 'Section, identifiers and current vehicle status.',
      vehicleDetails: 'Operational data', vehicleDetailsText: 'Dates, assignment, livery and assigned employees.',
      vehicleInformation: 'Information and code', vehicleInformationText: 'Text for both language versions and the service code.',
      photosHelp: 'Add a direct image URL and the information displayed with it.', addPhoto: 'Add photo',
      photo: 'Photo', imageUrl: 'Image URL', depotRu: 'Depot (RU)', depotEn: 'Depot (EN)', photoDate: 'Date',
      photoAuthor: 'Author', authorUrl: 'Author URL', photoEvent: 'Event or caption', removePhoto: 'Remove',
      noPhotos: 'No photos added.', invalidPhotoUrl: 'Enter a valid image URL.', loading: 'Checking section access...',
      ready: 'Access check completed.', invalidId: 'Enter an identifier in the TRP-RP-XXXX-XXXX-XXXX format.',
      requestFailed: 'The request could not be completed.', noApplications: 'There are no open applications for your roles.',
      noVehicleData: 'The spreadsheet does not contain any sections or records yet.', applicant: 'Applicant', position: 'Position',
      points: 'Points', submitted: 'Submitted', accept: 'Accept', reject: 'Reject', sendScores: 'Submit scores',
      acceptanceDetails: 'Additional information', rejectionReason: 'Rejection reason',
      decisionSaved: 'The decision was saved. The application was removed from the open list.', statusSaved: 'Status published.',
      vehicleSaved: 'Changes saved to Google Sheets.', importConfirm: 'Replace the Google Sheets database with the current vehicle-list page data?',
      importDone: 'The current list was imported.', deleteConfirm: 'Delete this record?', edit: 'Edit', delete: 'Delete',
      selectModel: 'Select a model', selectStatus: 'Select a status', selectLivery: 'Select a livery',
      liveriesUnavailable: 'No liveries are available for this model.', duplicateBoard: 'This fleet number is already in use.',
      duplicateFactory: 'This factory number is already in use.',
      currentScore: 'Automatic score', answer: 'Answer', score: 'Score', accessDenied: 'This section is unavailable for your roles.',
      show: 'Show', hide: 'Hide',
      availableShifts: 'Available dates', availableShiftsText: 'Dates come from the same schedule as /shift-schedule. Creation is available only to employees with DTC permission.',
      availableOffers: 'Available to claim', upcomingRpSessions: 'Upcoming RP sessions', previous: 'Previous', next: 'Next',
      takeShift: 'Claim', noShiftOffers: 'There are no available dates.', noRpSessions: 'There are no upcoming RP sessions.',
      page: 'Page {page} of {total}', createScheduledEvent: 'Create publication', eventType: 'Event type',
      regularShift: 'Shift', rpSession: 'RP session', publicationLanguage: 'Publication language', startTime: 'Start time in Moscow',
      endTime: 'End time in Moscow', breakStart: 'Break start', breakEnd: 'Break end',
      breakHelp: 'Events lasting 4 hours or more require a break start and end time.',
      publish: 'Publish', reservationUntil: 'Reservation is valid until {time}.', shiftPublished: 'Publication created: {code}.',
      shiftDate: 'Moscow date: {date}', organizer: 'Organizer: {name}', lockPanel: 'Lock panel',
      unlockPanel: 'Unlock panel', panelLocked: 'The panel is locked by the developer.',
      lockReason: 'Lock reason', lockDuration: 'Duration in minutes',
      lockDurationHelp: 'Enter 0 for a permanent lock.', permanentLock: 'permanently',
      lockedUntil: 'until {time}', lockedDetails: '{reason}; {duration}'
    }
  };

  const t = key => copy[state.language][key] || key;
  const byId = id => document.getElementById(id);
  const vehicleStatuses = [
    'Эксплуатируется',
    'В ремонте',
    'Не эксплуатируется',
    'Выведен из эксплуатации / ожидание исключения',
    'Капитально-восстановительный ремонт',
    'Загружается',
    'Модернизация',
    'Списан',
    'Передан в другой город',
    'Местонахождение и судьба неизвестны'
  ];

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
    renderShifts();
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
    const lockButton = byId('toggle-status-lock');
    const saveButton = byId('save-server-status');
    const locked = Boolean(profile.lock?.locked);
    lockButton.hidden = !profile.lock?.canManage;
    lockButton.textContent = t(locked ? 'unlockPanel' : 'lockPanel');
    select.disabled = locked && !profile.lock?.canManage;
    saveButton.disabled = locked && !profile.lock?.canManage;
    if (locked) {
      const duration = profile.lock?.expiresAt
        ? t('lockedUntil').replace('{time}', formatMoscowDate(profile.lock.expiresAt, true))
        : t('permanentLock');
      const details = t('lockedDetails')
        .replace('{reason}', profile.lock?.reason || t('panelLocked'))
        .replace('{duration}', duration);
      setNotice('server-status-notice', `${t('panelLocked')} ${details}`, profile.lock?.canManage ? '' : 'error');
    }
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

  async function toggleStatusLock() {
    const locked = Boolean(state.statusProfile?.lock?.locked);
    if (!locked) {
      byId('status-lock-reason').value = '';
      byId('status-lock-duration').value = '60';
      setNotice('status-lock-notice', '', '');
      byId('status-lock-dialog').showModal();
      return;
    }
    await post(payload('admin-status-update', { action: 'unlock' }));
    await loadStatusProfile();
  }

  async function submitStatusLock() {
    const durationMinutes = Number(byId('status-lock-duration').value);
    const lockReason = byId('status-lock-reason').value.trim();
    await post(payload('admin-status-update', {
      action: 'lock',
      lockReason,
      durationMinutes
    }));
    byId('status-lock-dialog').close();
    await loadStatusProfile();
  }

  function formatMoscowDate(value, includeTime = false) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat(state.language === 'ru' ? 'ru-RU' : 'en-GB', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(includeTime ? { hour: '2-digit', minute: '2-digit' } : {})
    }).format(date);
  }

  function shiftRow(title, description, action = null) {
    const row = document.createElement('article');
    row.className = 'admin-shift-row';
    const heading = document.createElement('h4');
    heading.textContent = title;
    const body = document.createElement('p');
    body.textContent = description;
    row.append(heading, body);
    if (action) row.append(action);
    return row;
  }

  function renderShifts() {
    const offers = byId('available-shift-list');
    const sessions = byId('upcoming-rp-list');
    if (!offers || !sessions) return;
    offers.replaceChildren();
    sessions.replaceChildren();

    if (!state.shiftOffers.length) {
      const empty = document.createElement('div');
      empty.className = 'admin-empty';
      empty.textContent = t('noShiftOffers');
      offers.append(empty);
    } else {
      state.shiftOffers.forEach(offer => {
        const date = formatMoscowDate(offer.windowStartAt);
        offers.append(shiftRow(
          date,
          t('shiftDate').replace('{date}', date),
          button(t('takeShift'), 'admin-primary-button', () => claimShift(offer))
        ));
      });
    }

    if (!state.rpSessions.length) {
      const empty = document.createElement('div');
      empty.className = 'admin-empty';
      empty.textContent = t('noRpSessions');
      sessions.append(empty);
    } else {
      state.rpSessions.forEach(session => {
        const row = shiftRow(
          `${formatMoscowDate(session.startAt, true)} - ${formatMoscowDate(session.endAt, true)}`,
          t('organizer').replace('{name}', session.organizerName || '—')
        );
        if (session.threadUrl) {
          const link = document.createElement('a');
          link.href = session.threadUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.className = 'admin-secondary-button';
          link.textContent = state.language === 'ru' ? 'Открыть публикацию' : 'Open publication';
          row.append(link);
        }
        sessions.append(row);
      });
    }

    byId('shift-page-indicator').textContent = t('page')
      .replace('{page}', String(state.shiftPage + 1))
      .replace('{total}', String(state.shiftTotalPages));
    byId('shift-page-previous').disabled = state.shiftPage <= 0;
    byId('shift-page-next').disabled = state.shiftPage >= state.shiftTotalPages - 1;
  }

  async function loadShifts(page = state.shiftPage) {
    try {
      const result = await post(payload('admin-shifts-profile', { page }));
      state.shiftProfile = result.profile;
      state.shiftOffers = result.offers || [];
      state.rpSessions = result.rpSessions || [];
      state.shiftPage = Number(result.page) || 0;
      state.shiftTotalPages = Math.max(1, Number(result.totalPages) || 1);
      setNotice('shift-notice', '', '');
    } catch (error) {
      state.shiftProfile = null;
      state.shiftOffers = [];
      state.rpSessions = [];
      state.shiftPage = 0;
      state.shiftTotalPages = 1;
      setNotice('shift-notice', error.message, 'error');
    }
    renderShifts();
  }

  async function claimShift(offer) {
    setNotice('shift-notice', '', '');
    const result = await post(payload('admin-shifts-claim', { offerId: offer.id }));
    state.shiftReservation = result.reservation;
    byId('shift-selected-date').textContent = `${t('shiftDate').replace('{date}', formatMoscowDate(result.offer.windowStartAt))} ${t('reservationUntil').replace('{time}', formatMoscowDate(result.reservation.expiresAt, true))}`;
    byId('shift-event-type').value = 'shift';
    byId('shift-language').value = state.language;
    byId('shift-start-time').value = '';
    byId('shift-end-time').value = '';
    byId('shift-break-start').value = '';
    byId('shift-break-end').value = '';
    setNotice('shift-dialog-notice', '', '');
    byId('shift-dialog').showModal();
  }

  async function publishClaimedShift() {
    if (!state.shiftReservation) throw new Error(t('requestFailed'));
    byId('publish-shift').disabled = true;
    try {
      const result = await post(payload('admin-shifts-publish', {
        reservation: state.shiftReservation,
        eventType: byId('shift-event-type').value,
        publicationLanguage: byId('shift-language').value,
        startTime: byId('shift-start-time').value,
        endTime: byId('shift-end-time').value,
        breakStartTime: byId('shift-break-start').value,
        breakEndTime: byId('shift-break-end').value
      }));
      state.shiftReservation = null;
      byId('shift-dialog').close();
      await loadShifts(state.shiftPage);
      setNotice('shift-notice', t('shiftPublished').replace('{code}', result.code), 'success');
    } catch (error) {
      state.shiftReservation = null;
      setNotice('shift-dialog-notice', error.message, 'error');
      await loadShifts(state.shiftPage);
    } finally {
      byId('publish-shift').disabled = false;
    }
  }

  function orderedVehicleSections(sections) {
    const sorted = [...sections].sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder));
    const ids = new Set(sorted.map(section => section.id));
    const children = new Map();
    sorted.forEach(section => {
      const parentId = ids.has(section.parentId) ? section.parentId : '';
      if (!children.has(parentId)) children.set(parentId, []);
      children.get(parentId).push(section);
    });
    const result = [];
    const visited = new Set();
    const visit = (section, depth) => {
      if (visited.has(section.id)) return;
      visited.add(section.id);
      result.push({ section, depth });
      (children.get(section.id) || []).forEach(child => visit(child, depth + 1));
    };
    (children.get('') || []).forEach(section => visit(section, 0));
    sorted.forEach(section => visit(section, 0));
    return result;
  }

  function vehicleSectionLabel(section) {
    return state.language === 'ru' ? section.nameRu : section.nameEn;
  }

  function vehicleSectionPath(section, sectionsById) {
    const names = [];
    const visited = new Set();
    let current = section;
    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      names.unshift(vehicleSectionLabel(current));
      current = sectionsById.get(current.parentId);
    }
    return names.join(' / ');
  }

  function vehicleSectionFilterIds(sectionId, sections) {
    if (!sectionId) return null;
    const result = new Set([sectionId]);
    let changed = true;
    while (changed) {
      changed = false;
      sections.forEach(section => {
        if (result.has(section.parentId) && !result.has(section.id)) {
          result.add(section.id);
          changed = true;
        }
      });
    }
    return result;
  }

  function renderVehicles() {
    const sectionList = byId('vehicle-sections');
    const vehicleList = byId('vehicle-list');
    const sectionSelect = byId('vehicle-section');
    const sectionFilter = byId('vehicle-section-filter');
    const vehicleCount = byId('vehicle-count');
    if (!sectionList || !vehicleList || !sectionSelect || !sectionFilter) return;
    sectionList.replaceChildren();
    vehicleList.replaceChildren();
    sectionSelect.replaceChildren();
    sectionFilter.replaceChildren();
    const sections = [...state.vehicleDatabase.sections];
    const orderedSections = orderedVehicleSections(sections);
    const childParentIds = new Set(sections.map(section => section.parentId).filter(Boolean));
    if (state.vehicleSectionFilter && !sections.some(section => section.id === state.vehicleSectionFilter)) {
      state.vehicleSectionFilter = '';
    }
    const allSections = document.createElement('option');
    allSections.value = '';
    allSections.textContent = t('allSections');
    sectionFilter.append(allSections);
    orderedSections.forEach(({ section, depth }) => {
      const row = document.createElement('div');
      row.className = 'admin-section-row';
      row.style.setProperty('--section-depth', String(Math.min(depth, 12)));
      row.classList.toggle('is-child', depth > 0);
      row.classList.toggle('is-category', childParentIds.has(section.id));
      row.classList.toggle('is-active', state.vehicleSectionFilter === section.id);
      const label = button(
        vehicleSectionLabel(section),
        'admin-section-name',
        () => {
          state.vehicleSectionFilter = section.id;
          renderVehicles();
        }
      );
      row.append(
        label,
        button('✎', 'admin-icon-button', () => openSection(section)),
        button('×', 'admin-icon-button', () => deleteSection(section))
      );
      sectionList.append(row);
      const optionElement = document.createElement('option');
      optionElement.value = section.id;
      optionElement.textContent = `${depth ? '— '.repeat(depth) : ''}${label.textContent}`;
      optionElement.disabled = childParentIds.has(section.id);
      sectionSelect.append(optionElement);
      const filterOption = optionElement.cloneNode(true);
      filterOption.disabled = false;
      sectionFilter.append(filterOption);
    });
    sectionFilter.value = state.vehicleSectionFilter;
    if (!sections.length && !state.vehicleDatabase.vehicles.length) {
      const empty = document.createElement('div');
      empty.className = 'admin-empty';
      empty.textContent = t('noVehicleData');
      vehicleList.append(empty);
      if (vehicleCount) vehicleCount.textContent = '';
      return;
    }
    const visibleSectionIds = vehicleSectionFilterIds(state.vehicleSectionFilter, sections);
    const sectionOrder = new Map(orderedSections.map(({ section }, index) => [section.id, index]));
    const vehicles = [...state.vehicleDatabase.vehicles]
      .filter(vehicle => !visibleSectionIds || visibleSectionIds.has(vehicle.sectionId))
      .sort((a, b) => (sectionOrder.get(a.sectionId) ?? 9999) - (sectionOrder.get(b.sectionId) ?? 9999) || a.sortOrder - b.sortOrder);
    if (vehicleCount) {
      vehicleCount.textContent = t('vehicleCount')
        .replace('{shown}', String(vehicles.length))
        .replace('{total}', String(state.vehicleDatabase.vehicles.length));
    }
    if (!vehicles.length) {
      const empty = document.createElement('div');
      empty.className = 'admin-empty';
      empty.textContent = t('noVehiclesInSection');
      vehicleList.append(empty);
      return;
    }
    const sectionsById = new Map(sections.map(section => [section.id, section]));
    const sectionMap = new Map(sections.map(section => {
      return [section.id, vehicleSectionPath(section, sectionsById)];
    }));
    vehicles.forEach(vehicle => {
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
      meta.textContent = `${sectionMap.get(vehicle.sectionId) || vehicle.sectionId} · ${vehicle.status}`;
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
    const parentSelect = byId('section-parent');
    parentSelect.replaceChildren();
    const emptyParent = document.createElement('option');
    emptyParent.value = '';
    emptyParent.textContent = t('rootCategory');
    parentSelect.append(emptyParent);
    const sections = state.vehicleDatabase.sections;
    const excludedParentIds = section ? vehicleSectionFilterIds(section.id, sections) : new Set();
    orderedVehicleSections(sections)
      .filter(({ section: entry }) => !excludedParentIds.has(entry.id))
      .forEach(({ section: entry, depth }) => {
        const option = document.createElement('option');
        option.value = entry.id;
        const visibleDepth = Math.min(depth, 10);
        option.textContent = `${'— '.repeat(visibleDepth)}${depth > visibleDepth ? '… ' : ''}${vehicleSectionLabel(entry)}`;
        option.disabled = state.vehicleDatabase.vehicles.some(vehicle => vehicle.sectionId === entry.id);
        parentSelect.append(option);
      });
    byId('section-id').value = section?.id || '';
    byId('section-id').readOnly = Boolean(section);
    byId('section-name-ru').value = section?.nameRu || '';
    byId('section-name-en').value = section?.nameEn || '';
    byId('section-order').value = section?.sortOrder ?? state.vehicleDatabase.sections.length;
    parentSelect.value = section?.parentId || '';
    parentSelect.disabled = false;
    byId('section-dialog').showModal();
  }

  async function saveSection() {
    await saveVehicleOperation({
      action: 'upsertSection',
      section: {
        id: byId('section-id').value.trim(),
        nameRu: byId('section-name-ru').value.trim(),
        nameEn: byId('section-name-en').value.trim(),
        sortOrder: Number(byId('section-order').value) || 0,
        parentId: byId('section-parent').value
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

  function normalizedVehicleValue(value) {
    return String(value || '').trim().toLocaleLowerCase('ru-RU').replace(/\s+/g, ' ');
  }

  function meaningfulFactoryNumber(value) {
    const normalized = normalizedVehicleValue(value);
    return normalized && !['-', '—', 'утерян', 'unknown', 'none', 'отсутствует'].includes(normalized)
      ? normalized
      : '';
  }

  function uniqueVehicleValues(key, extra = []) {
    return [...new Set([
      ...state.vehicleDatabase.vehicles.map(vehicle => String(vehicle[key] || '').trim()),
      ...extra.map(value => String(value || '').trim())
    ].filter(Boolean))].sort((left, right) => left.localeCompare(right, state.language === 'ru' ? 'ru' : 'en'));
  }

  function populateVehicleSelect(select, values, selected, placeholder) {
    select.replaceChildren();
    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = placeholder;
    empty.disabled = select.required;
    select.append(empty);
    values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.append(option);
    });
    select.value = selected || '';
  }

  function populateVehicleChoices(vehicle = null) {
    const catalogModels = window.TrpVehicleCatalog?.getModels?.() || [];
    populateVehicleSelect(
      byId('vehicle-model'),
      uniqueVehicleValues('model', [...catalogModels, ...(vehicle?.model ? [vehicle.model] : [])]),
      vehicle?.model || '',
      t('selectModel')
    );
    populateVehicleSelect(
      byId('vehicle-status'),
      uniqueVehicleValues('status', [...vehicleStatuses, ...(vehicle?.status ? [vehicle.status] : [])]),
      vehicle?.status || '',
      t('selectStatus')
    );
    populateLiveryChoices(vehicle?.livery || '', true);
  }

  function populateLiveryChoices(selected = '', preserveLegacy = false) {
    const select = byId('vehicle-livery');
    const model = byId('vehicle-model').value;
    const catalog = window.TrpVehicleCatalog;
    const values = catalog?.getLiveries ? catalog.getLiveries(model) : [];
    if (preserveLegacy && selected && selected !== '-' && !values.includes(selected)) values.push(selected);
    populateVehicleSelect(
      select,
      [...new Set(values)],
      selected === '-' ? '' : selected,
      values.length ? t('selectLivery') : t('liveriesUnavailable')
    );
    select.disabled = !values.length;
  }

  function photoField(key, label, value = '', type = 'text') {
    const field = document.createElement('label');
    field.className = 'admin-field';
    const caption = document.createElement('span');
    caption.dataset.copy = label;
    caption.textContent = t(label);
    const input = document.createElement('input');
    input.type = type;
    input.value = value || '';
    input.dataset.photoKey = key;
    input.autocomplete = 'off';
    field.append(caption, input);
    return field;
  }

  function updatePhotoPreview(card) {
    const input = card.querySelector('[data-photo-key="img"]');
    const image = card.querySelector('.admin-photo-preview img');
    const placeholder = card.querySelector('.admin-photo-placeholder');
    const value = input.value.trim();
    if (!value) {
      image.removeAttribute('src');
      image.hidden = true;
      placeholder.hidden = false;
      return;
    }
    try {
      const resolved = new URL(value, new URL('../other/vehicle_list/', location.href));
      if (!/^https?:$/.test(resolved.protocol)) throw new Error('Invalid image protocol');
      image.src = resolved.href;
      image.hidden = false;
      placeholder.hidden = true;
    } catch (error) {
      image.removeAttribute('src');
      image.hidden = true;
      placeholder.hidden = false;
    }
  }

  function photoCard(photo = {}, index = 0) {
    const card = document.createElement('article');
    card.className = 'admin-photo-card';
    const preview = document.createElement('div');
    preview.className = 'admin-photo-preview';
    const image = document.createElement('img');
    image.alt = `${t('photo')} ${index + 1}`;
    image.hidden = true;
    image.addEventListener('error', () => {
      image.hidden = true;
      card.querySelector('.admin-photo-placeholder').hidden = false;
    });
    const placeholder = document.createElement('span');
    placeholder.className = 'admin-photo-placeholder';
    placeholder.textContent = String(index + 1).padStart(2, '0');
    preview.append(image, placeholder);

    const fields = document.createElement('div');
    fields.className = 'admin-photo-fields';
    const imageField = photoField('img', 'imageUrl', photo.img, 'text');
    imageField.classList.add('admin-field-wide');
    fields.append(
      imageField,
      photoField('depot_ru', 'depotRu', photo.depot_ru),
      photoField('depot_en', 'depotEn', photo.depot_en),
      photoField('date', 'photoDate', photo.date),
      photoField('author', 'photoAuthor', photo.author),
      photoField('authorUrl', 'authorUrl', photo.authorUrl, 'url'),
      photoField('event', 'photoEvent', photo.event)
    );

    const remove = button(t('removePhoto'), 'admin-danger-button admin-photo-remove', () => {
      card.remove();
      refreshPhotoEditorState();
    });
    remove.dataset.copy = 'removePhoto';
    card.append(preview, fields, remove);
    card.querySelector('[data-photo-key="img"]').addEventListener('input', () => updatePhotoPreview(card));
    updatePhotoPreview(card);
    return card;
  }

  function refreshPhotoEditorState() {
    const list = byId('vehicle-photos-list');
    if (!list) return;
    list.querySelector('.admin-photo-empty')?.remove();
    const cards = [...list.querySelectorAll('.admin-photo-card')];
    cards.forEach((card, index) => {
      card.querySelector('.admin-photo-placeholder').textContent = String(index + 1).padStart(2, '0');
      card.querySelector('.admin-photo-preview img').alt = `${t('photo')} ${index + 1}`;
    });
    if (!cards.length) {
      const empty = document.createElement('p');
      empty.className = 'admin-photo-empty';
      empty.dataset.copy = 'noPhotos';
      empty.textContent = t('noPhotos');
      list.append(empty);
    }
  }

  function addPhoto(photo = {}) {
    const list = byId('vehicle-photos-list');
    if (!list) return;
    list.querySelector('.admin-photo-empty')?.remove();
    list.append(photoCard(photo, list.querySelectorAll('.admin-photo-card').length));
    refreshPhotoEditorState();
  }

  function renderPhotoEditor(photos = []) {
    const list = byId('vehicle-photos-list');
    if (!list) return;
    list.replaceChildren();
    photos.forEach(photo => addPhoto(photo));
    refreshPhotoEditorState();
  }

  function collectVehiclePhotos() {
    return [...byId('vehicle-photos-list').querySelectorAll('.admin-photo-card')].map(card => {
      const photo = {};
      card.querySelectorAll('[data-photo-key]').forEach(input => { photo[input.dataset.photoKey] = input.value.trim(); });
      if (!photo.img) throw new Error(t('invalidPhotoUrl'));
      let resolved;
      try { resolved = new URL(photo.img, new URL('../other/vehicle_list/', location.href)); } catch (error) { throw new Error(t('invalidPhotoUrl')); }
      if (!/^https?:$/.test(resolved.protocol)) throw new Error(t('invalidPhotoUrl'));
      if (photo.authorUrl) {
        try {
          const authorUrl = new URL(photo.authorUrl, location.href);
          if (!/^https?:$/.test(authorUrl.protocol)) throw new Error('Invalid protocol');
        } catch (error) { throw new Error(t('invalidPhotoUrl')); }
      }
      return photo;
    });
  }

  function openVehicle(vehicle = null) {
    const title = byId('vehicle-dialog-title');
    title.dataset.copy = vehicle ? 'editVehicleRecord' : 'addVehicleRecord';
    title.textContent = t(title.dataset.copy);
    populateVehicleChoices(vehicle);
    Object.entries(vehicleFieldIds).forEach(([key, id]) => {
      byId(id).value = vehicle?.[key] ?? (key === 'sortOrder' ? state.vehicleDatabase.vehicles.length : '');
    });
    if (!vehicle && state.vehicleSectionFilter
        && !state.vehicleDatabase.sections.some(section => section.parentId === state.vehicleSectionFilter)) {
      byId('vehicle-section').value = state.vehicleSectionFilter;
    }
    renderPhotoEditor(vehicle?.photos || []);
    setNotice('vehicle-dialog-notice', '', '');
    byId('vehicle-dialog').showModal();
  }

  async function saveVehicle() {
    const saveButton = byId('save-vehicle');
    saveButton.disabled = true;
    setNotice('vehicle-dialog-notice', t('loading'), '');
    try {
      const vehicle = {};
      Object.entries(vehicleFieldIds).forEach(([key, id]) => {
        vehicle[key] = key === 'sortOrder' ? Number(byId(id).value) || 0 : byId(id).value.trim();
      });
      vehicle.id = vehicle.id || vehicle.boardNumber;
      const duplicateBoard = state.vehicleDatabase.vehicles.some(entry => (
        entry.id !== vehicle.id
        && normalizedVehicleValue(entry.boardNumber) === normalizedVehicleValue(vehicle.boardNumber)
      ));
      if (duplicateBoard) throw new Error(t('duplicateBoard'));
      const factoryNumber = meaningfulFactoryNumber(vehicle.factoryNumber);
      const duplicateFactory = factoryNumber && state.vehicleDatabase.vehicles.some(entry => (
        entry.id !== vehicle.id && meaningfulFactoryNumber(entry.factoryNumber) === factoryNumber
      ));
      if (duplicateFactory) throw new Error(t('duplicateFactory'));
      vehicle.photos = collectVehiclePhotos();
      await saveVehicleOperation({ action: 'upsertVehicle', vehicle });
      byId('vehicle-dialog').close();
    } finally {
      saveButton.disabled = false;
    }
  }

  async function deleteVehicle(vehicle) {
    if (!confirm(t('deleteConfirm'))) return;
    await saveVehicleOperation({ action: 'deleteVehicle', vehicleId: vehicle.id, boardNumber: vehicle.boardNumber });
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
    const tasks = await Promise.allSettled([refreshApplications(), loadShifts(), loadStatusProfile(), loadVehicles()]);
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
    byId('refresh-shifts').addEventListener('click', () => loadShifts().catch(error => setNotice('shift-notice', error.message, 'error')));
    byId('shift-page-previous').addEventListener('click', () => loadShifts(Math.max(0, state.shiftPage - 1)));
    byId('shift-page-next').addEventListener('click', () => loadShifts(Math.min(state.shiftTotalPages - 1, state.shiftPage + 1)));
    byId('shift-form').addEventListener('submit', event => {
      event.preventDefault();
      publishClaimedShift().catch(error => setNotice('shift-dialog-notice', error.message, 'error'));
    });
    byId('save-server-status').addEventListener('click', () => saveStatus().catch(error => setNotice('server-status-notice', error.message, 'error')));
    byId('toggle-status-lock').addEventListener('click', () => toggleStatusLock().catch(error => setNotice('server-status-notice', error.message, 'error')));
    byId('status-lock-form').addEventListener('submit', event => {
      event.preventDefault();
      submitStatusLock().catch(error => setNotice('status-lock-notice', error.message, 'error'));
    });
    byId('new-section').addEventListener('click', () => openSection());
    byId('new-vehicle').addEventListener('click', () => openVehicle());
    byId('vehicle-section-filter').addEventListener('change', event => {
      state.vehicleSectionFilter = event.currentTarget.value;
      renderVehicles();
    });
    byId('add-vehicle-photo').addEventListener('click', () => addPhoto());
    byId('vehicle-model').addEventListener('change', () => populateLiveryChoices());
    byId('import-vehicle-list').addEventListener('click', () => importCurrentVehicleList().catch(error => setNotice('vehicle-notice', error.message, 'error')));
    byId('decision-form').addEventListener('submit', event => { event.preventDefault(); submitDecision().catch(error => setNotice('admin-notice', error.message, 'error')); });
    byId('section-form').addEventListener('submit', event => { event.preventDefault(); saveSection().catch(error => setNotice('vehicle-notice', error.message, 'error')); });
    byId('vehicle-form').addEventListener('submit', event => {
      event.preventDefault();
      saveVehicle().catch(error => {
        setNotice('vehicle-dialog-notice', error.message, 'error');
        setNotice('vehicle-notice', error.message, 'error');
      });
    });
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
