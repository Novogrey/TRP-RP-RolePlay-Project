(function () {
  'use strict';

  const API = String(window.TRP_APPLICATIONS_API_URL || '').trim();
  const STORAGE_KEY = 'trp-rp-worker-identifier';
  const state = {
    language: localStorage.getItem('language') === 'en' ? 'en' : 'ru',
    identifier: localStorage.getItem(STORAGE_KEY) || '',
    announcements: [],
    loaded: false
  };

  const copy = {
    ru: {
      announcements: 'Уведомления', announcementManagement: 'Уведомления сайта',
      announcementManagementText: 'Публикации хранятся в MongoDB и отображаются на сайте в заданный период.',
      refresh: 'Обновить', addAnnouncement: 'Добавить уведомление', announcementRecord: 'Уведомление сайта',
      addAnnouncementTitle: 'Новое уведомление', editAnnouncementTitle: 'Редактирование уведомления',
      publicationSettings: 'Публикация', publicationSettingsText: 'Определите вид, состояние и период отображения уведомления.',
      announcementType: 'Тип', typeInfo: 'Информация', typeSuccess: 'Успешно', typeWarning: 'Предупреждение', typeDanger: 'Важное',
      paths: 'Страницы', enabled: 'Включено', enabledHelp: 'Уведомление участвует в расписании показа.',
      permanent: 'Постоянное', permanentHelp: 'Не скрывать автоматически после определённой даты.',
      startsAt: 'Начало показа', endsAt: 'Окончание показа', collapsible: 'Можно свернуть',
      collapsibleHelp: 'Пользователь сможет свернуть карточку уведомления.', startCollapsed: 'Сразу свёрнуто',
      startCollapsedHelp: 'Первоначально показывать только заголовок.', content: 'Содержание',
      contentText: 'Заполните обе языковые версии. Допускается базовое HTML-форматирование текста.',
      titleRu: 'Заголовок (RU)', titleEn: 'Заголовок (EN)', bodyRu: 'Текст (RU)', bodyEn: 'Текст (EN)',
      action: 'Кнопка', actionText: 'Необязательная ссылка под текстом уведомления.', actionUrl: 'Ссылка',
      actionRu: 'Текст кнопки (RU)', actionEn: 'Текст кнопки (EN)', cancel: 'Отмена', save: 'Сохранить',
      edit: 'Изменить', delete: 'Удалить', loading: 'Загрузка уведомлений...', noAnnouncements: 'Уведомлений пока нет.',
      requestFailed: 'Не удалось выполнить запрос.', saved: 'Уведомление сохранено.', deleted: 'Уведомление удалено.',
      deleteConfirm: 'Удалить это уведомление без возможности восстановления?', active: 'Активно', scheduled: 'Запланировано',
      expired: 'Завершено', disabled: 'Отключено', permanentStatus: 'Постоянное', immediate: 'сразу', noEnd: 'без окончания',
      period: 'Период', updated: 'Обновлено', totalSummary: 'Всего: {total} · активно: {active} · запланировано: {scheduled}',
      requireEnd: 'Укажите окончание показа или включите постоянный режим.', requireContent: 'Укажите заголовок и текст хотя бы на одном языке.',
      invalidPeriod: 'Окончание показа должно быть позже начала.', from: 'с {date}', until: 'до {date}'
    },
    en: {
      announcements: 'Announcements', announcementManagement: 'Website announcements',
      announcementManagementText: 'Publications are stored in MongoDB and displayed on the website during the selected period.',
      refresh: 'Refresh', addAnnouncement: 'Add announcement', announcementRecord: 'Website announcement',
      addAnnouncementTitle: 'New announcement', editAnnouncementTitle: 'Edit announcement',
      publicationSettings: 'Publication', publicationSettingsText: 'Set the appearance, state, and display period.',
      announcementType: 'Type', typeInfo: 'Information', typeSuccess: 'Success', typeWarning: 'Warning', typeDanger: 'Important',
      paths: 'Pages', enabled: 'Enabled', enabledHelp: 'The announcement participates in the display schedule.',
      permanent: 'Permanent', permanentHelp: 'Do not hide the announcement automatically after a date.',
      startsAt: 'Display start', endsAt: 'Display end', collapsible: 'Collapsible',
      collapsibleHelp: 'Users can collapse the announcement card.', startCollapsed: 'Initially collapsed',
      startCollapsedHelp: 'Initially display only the title.', content: 'Content',
      contentText: 'Complete both language versions. Basic HTML formatting is supported.',
      titleRu: 'Title (RU)', titleEn: 'Title (EN)', bodyRu: 'Text (RU)', bodyEn: 'Text (EN)',
      action: 'Button', actionText: 'Optional link displayed below the announcement.', actionUrl: 'URL',
      actionRu: 'Button text (RU)', actionEn: 'Button text (EN)', cancel: 'Cancel', save: 'Save',
      edit: 'Edit', delete: 'Delete', loading: 'Loading announcements...', noAnnouncements: 'No announcements have been added.',
      requestFailed: 'The request could not be completed.', saved: 'Announcement saved.', deleted: 'Announcement deleted.',
      deleteConfirm: 'Permanently delete this announcement?', active: 'Active', scheduled: 'Scheduled',
      expired: 'Ended', disabled: 'Disabled', permanentStatus: 'Permanent', immediate: 'immediately', noEnd: 'no end date',
      period: 'Period', updated: 'Updated', totalSummary: 'Total: {total} · active: {active} · scheduled: {scheduled}',
      requireEnd: 'Select an end date or enable permanent mode.', requireContent: 'Add a title and text in at least one language.',
      invalidPeriod: 'The display end must be later than the start.', from: 'from {date}', until: 'until {date}'
    }
  };

  const byId = id => document.getElementById(id);
  const t = key => copy[state.language][key] || copy.en[key] || key;
  const format = (template, values) => Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template
  );

  function setNotice(id, message, type) {
    const element = byId(id);
    if (!element) return;
    element.textContent = message || '';
    element.classList.toggle('is-error', type === 'error');
    element.classList.toggle('is-success', type === 'success');
  }

  async function post(system, extra = {}) {
    if (!API) throw new Error(t('requestFailed'));
    const response = await fetch(API, {
      method: 'POST',
      body: new URLSearchParams({
        payload: JSON.stringify({
          system,
          workerIdentifier: state.identifier,
          language: state.language,
          ...extra
        })
      })
    });
    const result = await response.json().catch(() => null);
    if (!result || result.ok === false) {
      const error = new Error(result?.error || t('requestFailed'));
      error.code = result?.code;
      throw error;
    }
    return result;
  }

  function statusOf(announcement) {
    if (!announcement.enabled) return 'disabled';
    const now = Date.now();
    const startsAt = announcement.startsAtUtc ? Date.parse(announcement.startsAtUtc) : null;
    const endsAt = announcement.endsAtUtc ? Date.parse(announcement.endsAtUtc) : null;
    if (startsAt && startsAt > now) return 'scheduled';
    if (endsAt && endsAt <= now) return 'expired';
    return announcement.permanent ? 'permanentStatus' : 'active';
  }

  function dateTime(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat(state.language === 'ru' ? 'ru-RU' : 'en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  }

  function toLocalInput(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  function textFromHtml(value) {
    const container = document.createElement('div');
    container.innerHTML = String(value || '');
    return container.textContent.trim();
  }

  function periodText(announcement) {
    const starts = announcement.startsAtUtc
      ? format(t('from'), { date: dateTime(announcement.startsAtUtc) })
      : t('immediate');
    const ends = announcement.endsAtUtc
      ? format(t('until'), { date: dateTime(announcement.endsAtUtc) })
      : t('noEnd');
    return `${starts} · ${ends}`;
  }

  function render() {
    const list = byId('announcement-list');
    if (!list) return;
    list.replaceChildren();
    const activeCount = state.announcements.filter(item => ['active', 'permanentStatus'].includes(statusOf(item))).length;
    const scheduledCount = state.announcements.filter(item => statusOf(item) === 'scheduled').length;
    byId('announcement-summary').textContent = format(t('totalSummary'), {
      total: state.announcements.length,
      active: activeCount,
      scheduled: scheduledCount
    });
    if (state.announcements.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'admin-empty';
      empty.textContent = t('noAnnouncements');
      list.append(empty);
      return;
    }
    state.announcements.forEach(announcement => {
      const status = statusOf(announcement);
      const card = document.createElement('article');
      card.className = `admin-announcement-row is-${status} is-${announcement.type || 'info'}`;

      const head = document.createElement('div');
      head.className = 'admin-item-head';
      const heading = document.createElement('div');
      const title = document.createElement('h3');
      title.className = 'admin-item-title';
      title.textContent = announcement.title?.[state.language] || announcement.title?.en || announcement.title?.ru || announcement.id;
      const meta = document.createElement('p');
      meta.className = 'admin-item-meta';
      meta.textContent = announcement.id;
      heading.append(title, meta);
      const badge = document.createElement('span');
      badge.className = `admin-announcement-status is-${status}`;
      badge.textContent = t(status);
      head.append(heading, badge);

      const preview = document.createElement('p');
      preview.className = 'admin-announcement-preview';
      preview.textContent = textFromHtml(announcement.body?.[state.language] || announcement.body?.en || announcement.body?.ru).slice(0, 320);

      const details = document.createElement('div');
      details.className = 'admin-announcement-meta';
      const period = document.createElement('span');
      period.innerHTML = `<strong>${t('period')}:</strong> `;
      period.append(document.createTextNode(periodText(announcement)));
      const updated = document.createElement('span');
      updated.innerHTML = `<strong>${t('updated')}:</strong> `;
      updated.append(document.createTextNode(dateTime(announcement.updatedAt) || '—'));
      details.append(period, updated);

      const actions = document.createElement('div');
      actions.className = 'admin-item-actions';
      const edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'admin-secondary-button';
      edit.textContent = t('edit');
      edit.addEventListener('click', () => openEditor(announcement));
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'admin-danger-button';
      remove.textContent = t('delete');
      remove.addEventListener('click', () => removeAnnouncement(announcement));
      actions.append(edit, remove);
      card.append(head, preview, details, actions);
      list.append(card);
    });
  }

  function applyCopy() {
    document.querySelectorAll('[data-announcement-copy]').forEach(element => {
      element.textContent = t(element.dataset.announcementCopy);
    });
    render();
  }

  async function loadAnnouncements() {
    if (!state.identifier) return;
    setNotice('announcement-notice', t('loading'), '');
    try {
      const result = await post('admin-announcements-list');
      state.announcements = Array.isArray(result.announcements) ? result.announcements : [];
      state.loaded = true;
      setNotice('announcement-notice', '', '');
      render();
    } catch (error) {
      state.announcements = [];
      state.loaded = false;
      render();
      setNotice('announcement-notice', error.message, 'error');
      throw error;
    }
  }

  function setPermanentState() {
    const permanent = byId('announcement-permanent').checked;
    const endsAt = byId('announcement-ends-at');
    endsAt.disabled = permanent;
    endsAt.required = !permanent;
    if (permanent) endsAt.value = '';
  }

  function openEditor(announcement = null) {
    const form = byId('announcement-form');
    form.reset();
    byId('announcement-id').value = announcement?.id || '';
    byId('announcement-dialog-title').textContent = t(announcement ? 'editAnnouncementTitle' : 'addAnnouncementTitle');
    byId('announcement-type').value = announcement?.type || 'info';
    byId('announcement-paths').value = Array.isArray(announcement?.paths)
      ? announcement.paths.join(', ')
      : (announcement?.paths || 'all');
    byId('announcement-enabled').checked = announcement?.enabled !== false;
    byId('announcement-permanent').checked = announcement ? Boolean(announcement.permanent) : false;
    byId('announcement-collapsible').checked = announcement?.collapsible !== false;
    byId('announcement-start-collapsed').checked = Boolean(announcement?.startCollapsed);
    byId('announcement-starts-at').value = toLocalInput(announcement?.startsAtUtc);
    byId('announcement-ends-at').value = toLocalInput(announcement?.endsAtUtc);
    byId('announcement-title-ru').value = announcement?.title?.ru || '';
    byId('announcement-title-en').value = announcement?.title?.en || '';
    byId('announcement-body-ru').value = announcement?.body?.ru || '';
    byId('announcement-body-en').value = announcement?.body?.en || '';
    const action = announcement?.actions?.[0];
    byId('announcement-action-url').value = action?.href || '';
    byId('announcement-action-ru').value = action?.label?.ru || '';
    byId('announcement-action-en').value = action?.label?.en || '';
    setNotice('announcement-dialog-notice', '', '');
    setPermanentState();
    byId('announcement-dialog').showModal();
  }

  function collectAnnouncement() {
    const permanent = byId('announcement-permanent').checked;
    const startsValue = byId('announcement-starts-at').value;
    const endsValue = byId('announcement-ends-at').value;
    const title = {
      ru: byId('announcement-title-ru').value.trim(),
      en: byId('announcement-title-en').value.trim()
    };
    const body = {
      ru: byId('announcement-body-ru').value.trim(),
      en: byId('announcement-body-en').value.trim()
    };
    if ((!title.ru && !title.en) || (!body.ru && !body.en)) throw new Error(t('requireContent'));
    if (!permanent && !endsValue) throw new Error(t('requireEnd'));
    if (startsValue && endsValue && new Date(endsValue) <= new Date(startsValue)) throw new Error(t('invalidPeriod'));
    const actionUrl = byId('announcement-action-url').value.trim();
    const actions = actionUrl ? [{
      href: actionUrl,
      style: 'primary',
      label: {
        ru: byId('announcement-action-ru').value.trim(),
        en: byId('announcement-action-en').value.trim()
      }
    }] : [];
    return {
      id: byId('announcement-id').value,
      type: byId('announcement-type').value,
      paths: byId('announcement-paths').value,
      enabled: byId('announcement-enabled').checked,
      permanent,
      collapsible: byId('announcement-collapsible').checked,
      startCollapsed: byId('announcement-start-collapsed').checked,
      startsAt: startsValue ? new Date(startsValue).toISOString() : '',
      endsAt: !permanent && endsValue ? new Date(endsValue).toISOString() : '',
      title,
      body,
      actions
    };
  }

  async function saveAnnouncement() {
    const button = byId('save-announcement');
    button.disabled = true;
    setNotice('announcement-dialog-notice', t('loading'), '');
    try {
      await post('admin-announcements-save', { announcement: collectAnnouncement() });
      byId('announcement-dialog').close();
      await loadAnnouncements();
      setNotice('announcement-notice', t('saved'), 'success');
      window.TRP_REFRESH_SITE_ANNOUNCEMENTS?.();
    } finally {
      button.disabled = false;
    }
  }

  async function removeAnnouncement(announcement) {
    if (!window.confirm(t('deleteConfirm'))) return;
    await post('admin-announcements-delete', { announcementId: announcement.id });
    await loadAnnouncements();
    setNotice('announcement-notice', t('deleted'), 'success');
    window.TRP_REFRESH_SITE_ANNOUNCEMENTS?.();
  }

  function bind() {
    byId('new-announcement')?.addEventListener('click', () => openEditor());
    byId('refresh-announcements')?.addEventListener('click', () => {
      loadAnnouncements().catch(() => {});
    });
    byId('announcement-permanent')?.addEventListener('change', setPermanentState);
    byId('announcement-form')?.addEventListener('submit', event => {
      event.preventDefault();
      saveAnnouncement().catch(error => setNotice('announcement-dialog-notice', error.message, 'error'));
    });
    window.addEventListener('trp-admin-authenticated', event => {
      state.identifier = event.detail?.identifier || localStorage.getItem(STORAGE_KEY) || '';
      state.language = event.detail?.language === 'en' ? 'en' : 'ru';
      applyCopy();
      loadAnnouncements().catch(() => {});
    });
    window.addEventListener('trp-admin-language-change', event => {
      state.language = event.detail?.language === 'en' ? 'en' : 'ru';
      applyCopy();
    });
    applyCopy();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once: true });
  else bind();
}());
