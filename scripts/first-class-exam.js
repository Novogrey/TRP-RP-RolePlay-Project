(function () {
  'use strict';
  const RU = {
    eyebrow: 'Учебный центр TRP RP', title: 'Теоретический экзамен на водителя 1-го класса',
    intro: 'Максимальный результат — 30 баллов. Для допуска к практическому экзамену необходимо набрать не менее 20 баллов.',
    rules: 'Разрешается пользоваться справочными материалами. Запрещено получать готовые ответы у других участников и полностью копировать источники без переработки.',
    account: 'Проверка аккаунта', accountText: 'Экзамен доступен только водителям троллейбуса 2-го класса.',
    identifier: 'Идентификатор работника', check: 'Проверить данные', details: 'Экзаменационные задания', review: 'Проверка результата',
    discord: 'Аккаунт Discord', roblox: 'Аккаунт Roblox', position: 'Должность', points: 'Поинты',
    paid: 'Приобретённый платный транспорт', submit: 'Отправить экзамен', loading: 'Проверяем данные...', ready: 'Данные подтверждены. Можно приступать к экзамену.',
    submitted: 'Экзамен отправлен на двухэтапную проверку.', failed: 'Не удалось выполнить запрос.', invalid: 'Укажите корректный идентификатор работника.',
    required: 'Заполните все задания.', noneRule: '«Никаких» нельзя выбирать вместе с другими вариантами.', show: 'Показать идентификатор', hide: 'Скрыть идентификатор'
  };
  const EN = {
    eyebrow: 'TRP RP Training Center', title: 'First-class trolleybus driver theory exam',
    intro: 'The maximum score is 30. At least 20 points are required for admission to the practical exam.',
    rules: 'Reference materials may be used. Obtaining ready-made answers from other members and copying sources without adaptation are prohibited.',
    account: 'Account verification', accountText: 'The exam is available only to second-class trolleybus drivers.',
    identifier: 'Employee identifier', check: 'Check details', details: 'Exam questions', review: 'Result review',
    discord: 'Discord account', roblox: 'Roblox account', position: 'Position', points: 'Points',
    paid: 'Paid vehicles owned', submit: 'Submit exam', loading: 'Checking details...', ready: 'Account confirmed. You may begin the exam.',
    submitted: 'The exam has been submitted for two-stage review.', failed: 'The request could not be completed.', invalid: 'Enter a valid employee identifier.',
    required: 'Complete every question.', noneRule: '“None” cannot be selected with another option.', show: 'Show identifier', hide: 'Hide identifier'
  };
  const language = () => localStorage.getItem('language') === 'en' ? 'en' : 'ru';
  const c = key => (language() === 'ru' ? RU : EN)[key];
  const apiBase = String(window.TRP_APPLICATIONS_API_URL || '').trim();
  const state = { config: null, profile: null };

  function endpoint(parameters) {
    const url = new URL(apiBase);
    Object.entries(parameters).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.toString();
  }

  async function read(response) {
    const payload = await response.json().catch(() => null);
    if (!payload || payload.ok === false) throw new Error(payload?.error || c('failed'));
    return payload;
  }

  function status(message, kind = '') {
    const node = document.getElementById('first-class-status');
    const formatted = window.TrpApplicationAccess?.formatMessage
      ? window.TrpApplicationAccess.formatMessage(message)
      : String(message || '');
    node.hidden = !formatted;
    node.className = `application-status ${kind}`.trim();
    node.textContent = formatted;
  }

  function progress(step) {
    const order = ['account', 'details', 'review'];
    document.querySelectorAll('[data-exam-step]').forEach(item => {
      const own = order.indexOf(item.dataset.examStep);
      const active = order.indexOf(step);
      item.classList.toggle('is-active', own === active);
      item.classList.toggle('is-complete', own < active);
    });
  }

  function profileItem(label, value, href) {
    const item = document.createElement('div');
    item.className = 'profile-item';
    const small = document.createElement('small');
    small.textContent = label;
    const content = document.createElement(href ? 'a' : 'strong');
    content.textContent = value || '—';
    if (href) { content.href = href; content.target = '_blank'; content.rel = 'noopener noreferrer'; }
    item.append(small, content);
    return item;
  }

  function renderProfile() {
    const root = document.getElementById('first-class-profile');
    root.replaceChildren(
      profileItem(c('discord'), state.profile.displayName || state.profile.discordUsername),
      profileItem(c('roblox'), state.profile.robloxUsername, state.profile.robloxProfileUrl),
      profileItem(c('position'), state.profile.positionLabel),
      profileItem(c('points'), String(state.profile.points ?? 0))
    );
    root.hidden = false;
  }

  function questionField(question) {
    const article = document.createElement('article');
    article.className = 'exam-question';
    const header = document.createElement('div');
    header.className = 'exam-question-header';
    const title = document.createElement('h3');
    title.textContent = `${question.id.toUpperCase()}. ${question.label}`;
    const score = document.createElement('span');
    score.textContent = `${question.points}/30`;
    header.append(title, score);
    article.append(header);
    if (question.description) {
      const description = document.createElement('p');
      description.textContent = question.description;
      article.append(description);
    }
    if (question.image) {
      const image = document.createElement('img');
      image.src = question.image;
      image.alt = question.label;
      image.loading = 'lazy';
      article.append(image);
    }
    if (question.type === 'single') {
      const select = document.createElement('select');
      select.id = `exam-${question.id}`;
      select.required = true;
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = language() === 'ru' ? 'Выберите ответ' : 'Select an answer';
      select.append(empty);
      question.options.forEach(entry => {
        const option = document.createElement('option');
        option.value = entry.id;
        option.textContent = entry.label;
        select.append(option);
      });
      article.append(select);
    } else {
      const input = question.type === 'long' ? document.createElement('textarea') : document.createElement('input');
      input.id = `exam-${question.id}`;
      input.required = true;
      input.maxLength = 4000;
      if (question.type === 'long') input.rows = 5;
      article.append(input);
    }
    return article;
  }

  function renderExam() {
    const paid = document.getElementById('first-class-paid');
    paid.replaceChildren();
    state.config.paidVehicles.forEach(vehicle => {
      const label = document.createElement('label');
      label.className = 'exam-check-option';
      const input = document.createElement('input');
      input.type = 'checkbox'; input.name = 'paidVehicle'; input.value = vehicle.id;
      const text = document.createElement('span'); text.textContent = vehicle.label;
      label.append(input, text); paid.append(label);
    });
    paid.addEventListener('change', event => {
      if (event.target.value === 'none' && event.target.checked) {
        paid.querySelectorAll('input:not([value="none"])').forEach(input => { input.checked = false; });
      } else if (event.target.checked) {
        const none = paid.querySelector('input[value="none"]');
        if (none) none.checked = false;
      }
    });
    const questions = document.getElementById('first-class-questions');
    questions.replaceChildren();
    state.config.sections.forEach(section => {
      const group = document.createElement('section');
      group.className = 'exam-section';
      const heading = document.createElement('h2');
      heading.textContent = `${section.id}. ${section.label} · ${section.maximumScore}/30`;
      group.append(heading);
      state.config.questions.filter(question => question.section === section.id).forEach(question => group.append(questionField(question)));
      questions.append(group);
    });
    document.getElementById('first-class-details').hidden = false;
    document.getElementById('first-class-submit').disabled = false;
    progress('details');
  }

  async function lookup() {
    const identifier = document.getElementById('worker-identifier').value.trim().toUpperCase();
    if (!/^TRP-RP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(identifier)) return status(c('invalid'), 'error');
    status(c('loading'));
    try {
      const [config, profile] = await Promise.all([
        fetch(endpoint({ action: 'first-class-exam-config', language: language() })).then(read),
        fetch(endpoint({ action: 'first-class-exam-profile', workerIdentifier: identifier, language: language() })).then(read)
      ]);
      state.config = config.config;
      state.profile = profile.profile;
      localStorage.setItem('trp-rp-worker-identifier', identifier);
      renderProfile(); renderExam(); status(c('ready'), 'success');
    } catch (error) {
      state.config = null; state.profile = null;
      document.getElementById('first-class-profile').hidden = true;
      document.getElementById('first-class-details').hidden = true;
      document.getElementById('first-class-submit').disabled = true;
      progress('account'); status(error.message || c('failed'), 'error');
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (!state.config || !state.profile) return status(c('required'), 'error');
    const paidVehicles = [...document.querySelectorAll('input[name="paidVehicle"]:checked')].map(input => input.value);
    if (!paidVehicles.length || (paidVehicles.includes('none') && paidVehicles.length > 1)) return status(c('noneRule'), 'error');
    const answers = {};
    for (const question of state.config.questions) {
      const field = document.getElementById(`exam-${question.id}`);
      if (!field.checkValidity()) { field.reportValidity(); return; }
      answers[question.id] = field.value.trim();
    }
    const button = document.getElementById('first-class-submit');
    button.disabled = true; status(c('loading'));
    try {
      const body = new URLSearchParams({ payload: JSON.stringify({
        system: 'first-class-exam', language: language(),
        workerIdentifier: document.getElementById('worker-identifier').value.trim().toUpperCase(),
        paidVehicles, answers
      }) });
      const result = await fetch(apiBase, { method: 'POST', body }).then(read);
      status(result.message || c('submitted'), 'success');
      [...event.currentTarget.elements].forEach(element => { element.disabled = true; });
      progress('review');
    } catch (error) {
      button.disabled = false; status(error.message || c('failed'), 'error');
    }
  }

  function renderPage() {
    const section = document.querySelector('.events-section');
    if (!section) return;
    section.className = 'events-section personnel-application-page first-class-exam-page';
    section.innerHTML = `<div class="container personnel-shell first-class-shell">
      <header class="personnel-heading"><span>${c('eyebrow')}</span><h1>${c('title')}</h1><p>${c('intro')}</p><p class="exam-rules">${c('rules')}</p></header>
      <form id="first-class-form" class="application-layout" novalidate>
        <aside class="application-sidebar"><strong>TRP RP Systems</strong><ol class="application-progress">
          <li data-exam-step="account" class="is-active"><b>01</b><span>${c('account')}</span></li>
          <li data-exam-step="details"><b>02</b><span>${c('details')}</span></li>
          <li data-exam-step="review"><b>03</b><span>${c('review')}</span></li>
        </ol></aside>
        <main class="application-main"><section class="application-step">
          <div class="section-heading"><span>01</span><div><h2>${c('account')}</h2><p>${c('accountText')}</p></div></div>
          <label for="worker-identifier">${c('identifier')}</label><div class="identifier-row">
            <input id="worker-identifier" type="password" name="workerIdentifier" autocomplete="off" placeholder="TRP-RP-XXXX-XXXX-XXXX">
            <button id="toggle-worker-identifier" class="icon-button" type="button" aria-label="${c('show')}">◉</button>
            <button id="first-class-lookup" class="primary-button" type="button">${c('check')}</button>
          </div><div id="first-class-profile" class="profile-grid" hidden></div>
        </section><section id="first-class-details" class="application-step" hidden>
          <div class="section-heading"><span>02</span><div><h2>${c('details')}</h2><p>${c('intro')}</p></div></div>
          <fieldset><legend>${c('paid')}</legend><div id="first-class-paid" class="exam-check-grid"></div><small class="field-help">${c('noneRule')}</small></fieldset>
          <div id="first-class-questions"></div>
        </section><div id="first-class-status" class="application-status" hidden></div>
        <button id="first-class-submit" class="submit-button" type="submit" disabled>${c('submit')}</button>
      </main></form></div>`;
    const identifier = document.getElementById('worker-identifier');
    identifier.value = localStorage.getItem('trp-rp-worker-identifier') || '';
    identifier.addEventListener('input', () => {
      identifier.value = identifier.value.toUpperCase().replace(/\s+/g, '');
      state.profile = null; state.config = null;
      document.getElementById('first-class-profile').hidden = true;
      document.getElementById('first-class-details').hidden = true;
      document.getElementById('first-class-submit').disabled = true;
      status(''); progress('account');
    });
    document.getElementById('toggle-worker-identifier').addEventListener('click', event => {
      const visible = identifier.type === 'password'; identifier.type = visible ? 'text' : 'password';
      event.currentTarget.setAttribute('aria-label', visible ? c('hide') : c('show'));
    });
    document.getElementById('first-class-lookup').addEventListener('click', lookup);
    document.getElementById('first-class-form').addEventListener('submit', submit);
  }

  if (!apiBase) return;
  if (typeof window.reinitializeEventListeners === 'function') {
    const previous = window.reinitializeEventListeners;
    window.reinitializeEventListeners = function reinitializeFirstClassExam() { previous(); queueMicrotask(renderPage); };
  }
  renderPage();
}());
