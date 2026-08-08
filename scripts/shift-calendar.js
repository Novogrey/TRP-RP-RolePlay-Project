(function () {
  'use strict';

  const apiUrl = window.TRP_APPLICATIONS_API_URL;
  const identifierKey = 'trp-rp-worker-identifier';
  const state = { events: [], month: new Date(), selectedKey: '', profile: null, selectedShift: '' };

  function language() {
    return localStorage.getItem('language') === 'en' ? 'en' : 'ru';
  }

  function copy() {
    return language() === 'en' ? {
      title: 'Project schedule',
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], empty: 'No events are scheduled for this date.',
      shift: 'Shift', session: 'RP session', organizer: 'Organizer', time: 'Time', gathering: 'Gathering', departure: 'Departure to depot',
      open: 'Open Discord publication', register: 'Register for shift', noRegistration: 'No advance registration is required for an RP session.',
      loading: 'Loading schedule...', failed: 'The schedule could not be loaded. Try again later.',
      formTitle: 'Shift registration', identifier: 'Employee identifier', check: 'Check data', show: 'Show identifier', hide: 'Hide identifier',
      accountStep: 'Account verification', accountStepText: 'Confirm the employee identifier before selecting a position.',
      registrationStep: 'Registration details', registrationStepText: 'Specify your position and the required shift information.',
      position: 'Position', choose: 'Select an option', vehicle: 'Trolleybus fleet number', vehicleHelp: 'Required only for a driver position.',
      additional: 'Additional information', submit: 'Confirm registration', account: 'Discord account', roblox: 'Roblox account', primaryPosition: 'Primary position',
      ready: 'Data verified. Complete the registration fields.', success: 'Registration completed.', close: 'Close'
    } : {
      title: 'Расписание проекта',
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], empty: 'На выбранную дату мероприятия не запланированы.',
      shift: 'Смена', session: 'РП-сессия', organizer: 'Организатор', time: 'Время', gathering: 'Сбор', departure: 'Отъезд в парк',
      open: 'Открыть публикацию в Discord', register: 'Зарегистрироваться на смену', noRegistration: 'Предварительная регистрация на РП-сессию не требуется.',
      loading: 'Загрузка расписания...', failed: 'Не удалось загрузить расписание. Повторите попытку позднее.',
      formTitle: 'Регистрация на смену', identifier: 'Идентификатор работника', check: 'Проверить данные', show: 'Показать идентификатор', hide: 'Скрыть идентификатор',
      accountStep: 'Проверка аккаунта', accountStepText: 'Подтвердите идентификатор работника перед выбором должности.',
      registrationStep: 'Данные регистрации', registrationStepText: 'Укажите должность и необходимые сведения о смене.',
      position: 'Должность', choose: 'Выберите вариант', vehicle: 'Бортовой номер троллейбуса', vehicleHelp: 'Обязателен только для водительской должности.',
      additional: 'Дополнительная информация', submit: 'Подтвердить регистрацию', account: 'Аккаунт Discord', roblox: 'Аккаунт Roblox', primaryPosition: 'Основная должность',
      ready: 'Данные проверены. Заполните поля регистрации.', success: 'Регистрация выполнена.', close: 'Закрыть'
    };
  }

  function dateKey(value) {
    const date = new Date(value);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
  }

  async function read(response) {
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.ok === false) throw new Error(payload.error || copy().failed);
    return payload;
  }

  function eventCard(event) {
    const text = copy();
    const locale = language() === 'en' ? 'en-GB' : 'ru-RU';
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const start = new Date(event.startAt);
    const end = new Date(event.endAt);
    const type = event.eventType === 'rp_session' ? text.session : text.shift;
    return `<article class="trp-calendar-event trp-calendar-event--${event.eventType}">
      <div class="trp-calendar-event__head"><span>${type}</span><strong>${escapeHtml(event.code)}</strong></div>
      <dl><div><dt>${text.organizer}</dt><dd>${escapeHtml(event.organizerName || '-')}</dd></div>
        <div><dt>${text.time}</dt><dd>${start.toLocaleTimeString(locale, timeOptions)}-${end.toLocaleTimeString(locale, timeOptions)}</dd></div>
        ${event.eventType === 'shift' && event.gatheringAt ? `<div><dt>${text.gathering}</dt><dd>${new Date(event.gatheringAt).toLocaleTimeString(locale, timeOptions)}</dd></div>` : ''}
        ${event.eventType === 'shift' && event.departureAt ? `<div><dt>${text.departure}</dt><dd>${new Date(event.departureAt).toLocaleTimeString(locale, timeOptions)}</dd></div>` : ''}
      </dl><div class="trp-calendar-actions">
        ${event.publicationUrl ? `<a class="trp-calendar-link" href="${escapeHtml(event.publicationUrl)}" target="_blank" rel="noopener noreferrer">${text.open}</a>` : ''}
        ${event.eventType === 'shift' && event.registrationOpen ? `<button type="button" class="trp-calendar-register" data-register="${escapeHtml(event.code)}">${text.register}</button>` : ''}
      </div>${event.eventType === 'rp_session' ? `<p class="trp-calendar-caption">${text.noRegistration}</p>` : ''}
    </article>`;
  }

  function render() {
    const root = document.getElementById('trp-shift-calendar');
    if (!root) return;
    const text = copy();
    const year = state.month.getFullYear();
    const month = state.month.getMonth();
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    const locale = language() === 'en' ? 'en-GB' : 'ru-RU';
    const cells = Array.from({ length: offset }, () => '<span class="trp-calendar-day trp-calendar-day--blank"></span>');
    for (let day = 1; day <= days; day += 1) {
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const count = state.events.filter(event => dateKey(event.startAt) === key).length;
      cells.push(`<button class="trp-calendar-day${count ? ' has-events' : ''}${state.selectedKey === key ? ' is-selected' : ''}" data-date="${key}" type="button"><span>${day}</span>${count ? `<small>${count}</small>` : ''}</button>`);
    }
    const selected = state.events.filter(event => dateKey(event.startAt) === state.selectedKey);
    root.innerHTML = `<div class="trp-calendar-toolbar"><button type="button" data-month="-1" aria-label="Previous month">&#8249;</button>
      <h3>${escapeHtml(first.toLocaleDateString(locale, { month: 'long', year: 'numeric' }))}</h3><button type="button" data-month="1" aria-label="Next month">&#8250;</button></div>
      <div class="trp-calendar-weekdays">${text.weekdays.map(day => `<span>${day}</span>`).join('')}</div><div class="trp-calendar-grid">${cells.join('')}</div>
      <div class="trp-calendar-details">${selected.length ? selected.map(eventCard).join('') : `<p>${text.empty}</p>`}</div>`;
  }

  function registrationDialog() {
    let dialog = document.getElementById('trp-shift-registration');
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.id = 'trp-shift-registration';
    dialog.className = 'trp-shift-registration';
    document.body.append(dialog);
    return dialog;
  }

  function registrationStatus(message, type = '') {
    const target = document.getElementById('trp-shift-registration-status');
    if (!target) return;
    target.hidden = !message; target.textContent = message; target.dataset.type = type;
  }

  function renderRegistration(code) {
    const text = copy();
    state.selectedShift = code; state.profile = null;
    const dialog = registrationDialog();
    dialog.innerHTML = `<form id="trp-shift-registration-form" method="dialog">
      <header class="trp-registration-header">
        <div><span class="trp-registration-code">${escapeHtml(code)}</span><h2>${text.formTitle}</h2></div>
        <button class="trp-registration-close" type="button" data-close aria-label="${text.close}">&#215;</button>
      </header>
      <div class="trp-registration-body">
        <section class="trp-registration-section" aria-labelledby="trp-account-step-title">
          <div class="trp-registration-section-head"><span>01</span><div><h3 id="trp-account-step-title">${text.accountStep}</h3><p>${text.accountStepText}</p></div></div>
          <label class="trp-registration-field" for="shift-worker-identifier"><span>${text.identifier}</span></label>
          <div class="trp-registration-identifier"><input id="shift-worker-identifier" name="workerIdentifier" type="password" autocomplete="off" placeholder="TRP-RP-XXXX-XXXX-XXXX"><button type="button" data-toggle aria-label="${text.show}">&#9673;</button><button type="button" data-profile>${text.check}</button></div>
          <div id="trp-shift-profile" class="trp-shift-profile" hidden></div>
        </section>
        <section class="trp-registration-section" aria-labelledby="trp-registration-step-title">
          <div class="trp-registration-section-head"><span>02</span><div><h3 id="trp-registration-step-title">${text.registrationStep}</h3><p>${text.registrationStepText}</p></div></div>
          <div class="trp-registration-grid">
            <label class="trp-registration-field"><span>${text.position}</span><select id="shift-position" name="position" disabled><option value="">${text.choose}</option></select></label>
            <label class="trp-registration-field"><span>${text.vehicle}</span><input id="shift-vehicle" name="vehicleNumber" type="text" disabled><small>${text.vehicleHelp}</small></label>
            <label class="trp-registration-field trp-registration-field--wide"><span>${text.additional}</span><textarea id="shift-additional" name="additionalInfo" rows="3" maxlength="1000" disabled></textarea></label>
          </div>
        </section>
      </div>
      <footer class="trp-registration-footer"><div id="trp-shift-registration-status" class="trp-registration-status" hidden></div><button id="shift-register-submit" class="trp-registration-submit" type="submit" disabled>${text.submit}</button></footer>
    </form>`;
    const identifier = dialog.querySelector('#shift-worker-identifier');
    identifier.value = localStorage.getItem(identifierKey) || '';
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-toggle]').addEventListener('click', event => {
      identifier.type = identifier.type === 'password' ? 'text' : 'password';
      event.currentTarget.setAttribute('aria-label', identifier.type === 'password' ? text.show : text.hide);
    });
    dialog.querySelector('[data-profile]').addEventListener('click', loadRegistrationProfile);
    dialog.querySelector('#shift-position').addEventListener('change', syncVehicleRequirement);
    dialog.querySelector('form').addEventListener('submit', submitRegistration);
    dialog.showModal();
  }

  function syncVehicleRequirement() {
    const position = document.getElementById('shift-position');
    const vehicle = document.getElementById('shift-vehicle');
    const selected = state.profile?.positions?.find(item => item.value === position.value);
    vehicle.required = Boolean(selected?.driver); vehicle.disabled = !state.profile;
  }

  async function loadRegistrationProfile() {
    const text = copy();
    const identifier = document.getElementById('shift-worker-identifier');
    const value = identifier.value.trim().toUpperCase();
    registrationStatus(text.loading);
    try {
      const url = new URL(apiUrl);
      url.searchParams.set('action', 'shift-registration-profile'); url.searchParams.set('workerIdentifier', value); url.searchParams.set('language', language());
      const payload = await fetch(url, { cache: 'no-store' }).then(read);
      if (!payload.shifts.some(shift => shift.code === state.selectedShift)) throw new Error(language() === 'ru' ? 'Регистрация на выбранную смену закрыта.' : 'Registration for the selected shift is closed.');
      state.profile = payload; localStorage.setItem(identifierKey, value);
      document.getElementById('trp-shift-profile').hidden = false;
      document.getElementById('trp-shift-profile').innerHTML = `<div><small>${text.account}</small><strong>${escapeHtml(payload.user.discordName)}</strong></div><div><small>${text.roblox}</small><strong>${escapeHtml(payload.user.robloxName)}</strong></div><div><small>${text.primaryPosition}</small><strong>${escapeHtml(payload.user.position)}</strong></div>`;
      const select = document.getElementById('shift-position');
      select.innerHTML = `<option value="">${text.choose}</option>${payload.positions.map(item => `<option value="${escapeHtml(item.value)}">${escapeHtml(item.label)}</option>`).join('')}`;
      select.disabled = false; document.getElementById('shift-vehicle').disabled = false; document.getElementById('shift-additional').disabled = false; document.getElementById('shift-register-submit').disabled = false;
      registrationStatus(text.ready, 'success');
    } catch (error) {
      state.profile = null; registrationStatus(error.message || text.failed, 'error');
    }
  }

  async function submitRegistration(event) {
    event.preventDefault();
    const text = copy();
    const form = event.currentTarget;
    if (!state.profile || !form.reportValidity()) return;
    const button = document.getElementById('shift-register-submit'); button.disabled = true; registrationStatus(text.loading);
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      Object.assign(payload, { system: 'shift-registration', language: language(), shiftCode: state.selectedShift });
      const body = new URLSearchParams({ payload: JSON.stringify(payload) });
      const result = await fetch(apiUrl, { method: 'POST', body }).then(read);
      registrationStatus(result.message || text.success, 'success');
    } catch (error) {
      button.disabled = false; registrationStatus(error.message || text.failed, 'error');
    }
  }

  async function load() {
    const root = document.getElementById('trp-shift-calendar');
    root.innerHTML = `<p class="trp-calendar-loading">${copy().loading}</p>`;
    try {
      const payload = await fetch(`${apiUrl}?action=shift-calendar`, { cache: 'no-store' }).then(read);
      state.events = Array.isArray(payload.events) ? payload.events : [];
      const next = state.events[0] ? new Date(state.events[0].startAt) : new Date();
      state.month = new Date(next.getFullYear(), next.getMonth(), 1); state.selectedKey = state.events[0] ? dateKey(state.events[0].startAt) : dateKey(new Date()); render();
    } catch (error) { root.innerHTML = `<p class="trp-calendar-error">${copy().failed}</p>`; }
  }

  function handleCalendarClick(event) {
    if (!event.target.closest('#trp-shift-calendar')) return;
    const month = event.target.closest('[data-month]');
    if (month) {
      state.month = new Date(state.month.getFullYear(), state.month.getMonth() + Number(month.dataset.month), 1);
      render();
      return;
    }
    const date = event.target.closest('[data-date]');
    if (date) {
      state.selectedKey = date.dataset.date;
      render();
      return;
    }
    const register = event.target.closest('[data-register]');
    if (register) renderRegistration(register.dataset.register);
  }

  function mount() {
    const section = document.getElementById('calendar');
    if (!section) return;
    const existing = document.getElementById('trp-shift-calendar');
    if (!existing) {
      section.innerHTML = `<div class="container"><div class="section-header"><h2 class="section-title">${copy().title}</h2></div><div id="trp-shift-calendar" class="trp-shift-calendar"></div></div>`;
    } else if (state.events.length) {
      render();
    }
    document.getElementById('register')?.remove();
    if (!existing) load();
  }

  if (!apiUrl) return;
  if (typeof window.reinitializeEventListeners === 'function') {
    const previous = window.reinitializeEventListeners;
    window.reinitializeEventListeners = function reinitializeShiftCalendar() { previous(); queueMicrotask(mount); };
  }
  if (!window.__trpShiftCalendarClickBound) {
    window.__trpShiftCalendarClickBound = true;
    document.addEventListener('click', handleCalendarClick);
  }
  mount();
}());
