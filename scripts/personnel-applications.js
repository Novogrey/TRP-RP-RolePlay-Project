(function () {
  'use strict';

  const SCOPE_BY_PATH = {
    tc: 'personnel_tc',
    hrdpc: 'personnel_hr',
    dtc: 'personnel_dtc',
    tsd: 'personnel_safety',
    dfs: 'personnel_dfs',
    dhuta: 'personnel_deputy_head',
    fad: 'personnel_finance',
    'dtdmi_&_dtdhi': 'personnel_depot_director'
  };
  const pathPart = Object.keys(SCOPE_BY_PATH).find(part => window.location.pathname.includes(`/personnel/${part}/`));
  const scope = SCOPE_BY_PATH[pathPart];
  if (!scope) return;

  const COPY = {
    ru: {
      eyebrow: 'Кадровые заявления TRP RP',
      account: 'Проверка аккаунта',
      accountDescription: 'Введите личный идентификатор работника. Данные Discord, Roblox и текущая должность будут заполнены автоматически.',
      identifier: 'Идентификатор работника',
      identifierGuide: 'Получить идентификатор можно в боте TRP RP Systems. Он сохраняется в этом браузере после первого ввода.',
      getIdentifier: 'Получить идентификатор',
      check: 'Проверить данные',
      details: 'Параметры заявления',
      choosePosition: 'Выберите должность',
      discord: 'Аккаунт Discord',
      roblox: 'Аккаунт Roblox',
      currentPosition: 'Текущая должность',
      points: 'Поинты',
      submit: 'Отправить заявление',
      loading: 'Проверяем идентификатор, верификацию и права доступа...',
      ready: 'Данные подтверждены. Заполните заявление.',
      submitted: 'Заявление отправлено на рассмотрение.',
      failed: 'Не удалось выполнить запрос. Повторите попытку позднее.',
      invalidIdentifier: 'Укажите идентификатор в формате TRP-RP-XXXX-XXXX-XXXX.',
      required: 'Заполните все обязательные поля.',
      review: 'Рассмотрение',
      reviewDescription: 'Решение будет принято уполномоченными сотрудниками в Discord.',
      showIdentifier: 'Показать идентификатор',
      hideIdentifier: 'Скрыть идентификатор',
      yes: 'Да',
      no: 'Нет'
    },
    en: {
      eyebrow: 'TRP RP personnel applications',
      account: 'Account verification',
      accountDescription: 'Enter your personal employee identifier. Discord, Roblox and current position details are filled automatically.',
      identifier: 'Employee identifier',
      identifierGuide: 'Get the identifier from the TRP RP Systems bot. It is stored in this browser after the first entry.',
      getIdentifier: 'Get identifier',
      check: 'Check details',
      details: 'Application details',
      choosePosition: 'Choose a position',
      discord: 'Discord account',
      roblox: 'Roblox account',
      currentPosition: 'Current position',
      points: 'Points',
      submit: 'Submit application',
      loading: 'Checking the identifier, verification and access rights...',
      ready: 'Account details confirmed. Complete the application.',
      submitted: 'The application has been submitted for review.',
      failed: 'The request could not be completed. Try again later.',
      invalidIdentifier: 'Enter an identifier in the TRP-RP-XXXX-XXXX-XXXX format.',
      required: 'Complete all required fields.',
      review: 'Review',
      reviewDescription: 'A decision will be made by authorized staff in Discord.',
      showIdentifier: 'Show identifier',
      hideIdentifier: 'Hide identifier',
      yes: 'Yes',
      no: 'No'
    }
  };

  const language = () => localStorage.getItem('language') === 'en' ? 'en' : 'ru';
  const t = key => COPY[language()][key] || key;
  const apiBase = String(window.TRP_APPLICATIONS_API_URL || '').trim();
  const state = { form: null, profile: null };

  function endpoint(parameters) {
    const url = new URL(apiBase);
    Object.entries(parameters).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.toString();
  }

  async function readResponse(response) {
    const payload = await response.json().catch(() => null);
    if (!payload || payload.ok === false) throw new Error(payload?.error || t('failed'));
    return payload;
  }

  function showStatus(message, kind = '') {
    const status = document.getElementById('personnel-status');
    if (!status) return;
    const formatted = window.TrpApplicationAccess?.formatMessage
      ? window.TrpApplicationAccess.formatMessage(message)
      : String(message || '');
    status.hidden = !formatted;
    status.className = `application-status ${kind}`.trim();
    status.textContent = formatted;
  }

  function setProgress(step) {
    const order = ['account', 'details', 'review'];
    const index = order.indexOf(step);
    document.querySelectorAll('[data-personnel-step]').forEach(item => {
      const own = order.indexOf(item.dataset.personnelStep);
      item.classList.toggle('is-active', own === index);
      item.classList.toggle('is-complete', own < index);
    });
  }

  function profileItem(label, value, href) {
    const item = document.createElement('div');
    item.className = 'profile-item';
    const caption = document.createElement('small');
    caption.textContent = label;
    const content = document.createElement(href ? 'a' : 'strong');
    content.textContent = value || '—';
    if (href) {
      content.href = href;
      content.target = '_blank';
      content.rel = 'noopener noreferrer';
    }
    item.append(caption, content);
    return item;
  }

  function renderProfile() {
    const root = document.getElementById('personnel-profile');
    root.replaceChildren(
      profileItem(t('discord'), state.profile.displayName || state.profile.discordUsername),
      profileItem(t('roblox'), state.profile.robloxUsername, state.profile.robloxProfileUrl),
      profileItem(t('currentPosition'), state.profile.positionLabel),
      profileItem(t('points'), String(state.profile.points ?? 0))
    );
    root.hidden = false;
  }

  function fieldForQuestion(question) {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-group personnel-question';
    const label = document.createElement('label');
    label.htmlFor = `question-${question.id}`;
    label.textContent = `${question.label}${question.required ? ' *' : ''}`;
    let field;
    if (question.type === 'да_нет') {
      field = document.createElement('select');
      [['', t('choosePosition')], ['yes', t('yes')], ['no', t('no')]].forEach(([value, text]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        field.append(option);
      });
    } else if (question.type === 'число' || question.type === 'utc') {
      field = document.createElement('input');
      field.type = question.type === 'число' ? 'number' : 'text';
      if (question.type === 'число') {
        field.min = String(question.min || 0);
        field.max = String(question.max || 100);
      }
      if (question.type === 'utc') field.placeholder = 'UTC+2';
    } else {
      field = document.createElement('textarea');
      field.rows = 4;
      field.maxLength = Number(question.max) || 1500;
    }
    field.id = `question-${question.id}`;
    field.name = question.id;
    field.required = question.required;
    const description = document.createElement('small');
    description.className = 'field-help';
    description.textContent = question.description || '';
    wrapper.append(label, field);
    if (description.textContent) wrapper.append(description);
    return wrapper;
  }

  function renderDetails() {
    const root = document.getElementById('personnel-fields');
    root.replaceChildren();
    if (state.form.positions.length) {
      const wrapper = document.createElement('div');
      wrapper.className = 'form-group';
      const label = document.createElement('label');
      label.htmlFor = 'personnel-target-role';
      label.textContent = t('choosePosition');
      const select = document.createElement('select');
      select.id = 'personnel-target-role';
      select.required = true;
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = t('choosePosition');
      select.append(empty);
      state.form.positions.forEach(position => {
        const option = document.createElement('option');
        option.value = position.id;
        option.textContent = position.label;
        select.append(option);
      });
      wrapper.append(label, select);
      root.append(wrapper);
    }
    state.form.questions.forEach(question => root.append(fieldForQuestion(question)));
    document.getElementById('personnel-details').hidden = false;
    document.getElementById('personnel-submit').disabled = false;
    setProgress('details');
  }

  async function lookupProfile() {
    const identifier = document.getElementById('worker-identifier').value.trim().toUpperCase();
    if (!/^TRP-RP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(identifier)) {
      showStatus(t('invalidIdentifier'), 'error');
      return;
    }
    showStatus(t('loading'));
    try {
      const [configResult, profileResult] = await Promise.all([
        fetch(endpoint({ action: 'personnel-config', scope, language: language() })).then(readResponse),
        fetch(endpoint({ action: 'personnel-profile', workerIdentifier: identifier, language: language() })).then(readResponse)
      ]);
      state.form = configResult.config.forms[0];
      state.profile = profileResult.profile;
      const access = state.profile.applicationAccess?.[scope]
        || configResult.config.applicationAccess?.[scope];
      if (access?.allowed === false) throw new Error(access.reason || t('failed'));
      localStorage.setItem('trp-rp-worker-identifier', identifier);
      document.getElementById('personnel-title').textContent = state.form.label;
      renderProfile();
      renderDetails();
      showStatus(t('ready'), 'success');
    } catch (error) {
      state.profile = null;
      document.getElementById('personnel-profile').hidden = true;
      document.getElementById('personnel-details').hidden = true;
      document.getElementById('personnel-submit').disabled = true;
      setProgress('account');
      showStatus(error.message || t('failed'), 'error');
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (!state.form || !state.profile) {
      showStatus(t('required'), 'error');
      return;
    }
    const answers = {};
    for (const question of state.form.questions) {
      const field = document.getElementById(`question-${question.id}`);
      if (!field.checkValidity()) {
        field.reportValidity();
        return;
      }
      answers[question.id] = field.value;
    }
    const button = document.getElementById('personnel-submit');
    button.disabled = true;
    showStatus(t('loading'));
    try {
      const payload = {
        system: 'personnel',
        scope,
        workerIdentifier: document.getElementById('worker-identifier').value.trim().toUpperCase(),
        language: language(),
        targetRole: document.getElementById('personnel-target-role')?.value || state.form.fixedPosition?.id || '',
        answers
      };
      const body = new URLSearchParams({ payload: JSON.stringify(payload) });
      const result = await fetch(apiBase, { method: 'POST', body }).then(readResponse);
      showStatus(result.message || t('submitted'), 'success');
      [...event.currentTarget.elements].forEach(element => { element.disabled = true; });
      setProgress('review');
    } catch (error) {
      button.disabled = false;
      showStatus(error.message || t('failed'), 'error');
    }
  }

  function renderPage() {
    const section = document.querySelector('.events-section');
    if (!section) return;
    section.className = 'events-section personnel-application-page';
    section.innerHTML = `
      <div class="container personnel-shell">
        <header class="personnel-heading">
          <span>${t('eyebrow')}</span>
          <h1 id="personnel-title">${t('details')}</h1>
        </header>
        <form id="personnel-application-form" class="application-layout" novalidate>
          <aside class="application-sidebar">
            <strong>TRP RP Systems</strong>
            <ol class="application-progress">
              <li data-personnel-step="account" class="is-active"><b>01</b><span>${t('account')}</span></li>
              <li data-personnel-step="details"><b>02</b><span>${t('details')}</span></li>
              <li data-personnel-step="review"><b>03</b><span>${t('review')}</span></li>
            </ol>
          </aside>
          <main class="application-main">
            <section class="application-step">
              <div class="section-heading"><span>01</span><div><h2>${t('account')}</h2><p>${t('accountDescription')}</p></div></div>
              <label for="worker-identifier">${t('identifier')}</label>
              <div class="identifier-row">
                <input id="worker-identifier" name="workerIdentifier" type="password" autocomplete="off" placeholder="TRP-RP-XXXX-XXXX-XXXX" />
                <button id="toggle-worker-identifier" class="icon-button" type="button" aria-label="${t('showIdentifier')}">◉</button>
                <button id="personnel-lookup" class="primary-button" type="button">${t('check')}</button>
              </div>
              <p class="identifier-guide">${t('identifierGuide')} <a href="${new URL('other/employee_number/', window.location.origin + '/TRP-RP-RolePlay-Project/').href}">${t('getIdentifier')}</a></p>
              <div id="personnel-profile" class="profile-grid" hidden></div>
            </section>
            <section id="personnel-details" class="application-step" hidden>
              <div class="section-heading"><span>02</span><div><h2>${t('details')}</h2><p>${state.form?.description || ''}</p></div></div>
              <div id="personnel-fields"></div>
            </section>
            <div id="personnel-status" class="application-status" hidden></div>
            <button id="personnel-submit" class="submit-button" type="submit" disabled>${t('submit')}</button>
            <p class="review-note"><strong>${t('review')}</strong><br>${t('reviewDescription')}</p>
          </main>
        </form>
      </div>`;
    const form = document.getElementById('personnel-application-form');
    form.addEventListener('submit', submit);
    document.getElementById('personnel-lookup').addEventListener('click', lookupProfile);
    const identifier = document.getElementById('worker-identifier');
    identifier.value = localStorage.getItem('trp-rp-worker-identifier') || '';
    identifier.addEventListener('input', () => {
      identifier.value = identifier.value.toUpperCase().replace(/\s+/g, '');
      state.profile = null;
      document.getElementById('personnel-profile').hidden = true;
      document.getElementById('personnel-details').hidden = true;
      document.getElementById('personnel-submit').disabled = true;
      showStatus('');
      setProgress('account');
    });
    document.getElementById('toggle-worker-identifier').addEventListener('click', event => {
      const visible = identifier.type === 'password';
      identifier.type = visible ? 'text' : 'password';
      event.currentTarget.setAttribute('aria-label', visible ? t('hideIdentifier') : t('showIdentifier'));
      identifier.focus();
    });
  }

  if (!apiBase) return;
  if (typeof window.reinitializeEventListeners === 'function') {
    const previousReinitialize = window.reinitializeEventListeners;
    window.reinitializeEventListeners = function reinitializePersonnelPage() {
      previousReinitialize();
      window.queueMicrotask(renderPage);
    };
  }
  renderPage();
  const initialLanguage = language();
  window.addEventListener('trp-site-settings-change', () => {
    if (language() !== initialLanguage) window.location.reload();
  });
}());
