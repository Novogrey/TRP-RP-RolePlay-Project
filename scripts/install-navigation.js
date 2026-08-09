(function () {
  'use strict';

  const MENU_ID = 'trp-install-menu';
  const scriptSource = document.currentScript
    && document.currentScript.getAttribute('src');
  const SITE_ROOT = scriptSource && /scripts\/install-navigation\.js(?:[?#].*)?$/i.test(scriptSource)
    ? scriptSource.replace(/scripts\/install-navigation\.js(?:[?#].*)?$/i, '')
    : './';
  const INSTALL_PAGE = scriptSource && /scripts\/install-navigation\.js(?:[?#].*)?$/i.test(scriptSource)
    ? scriptSource.replace(/scripts\/install-navigation\.js(?:[?#].*)?$/i, 'added/')
    : './added/';
  const WORKER_IDENTIFIER_KEY = 'trp-rp-worker-identifier';

  function currentLanguage() {
    try {
      return localStorage.getItem('language') === 'en' ? 'en' : 'ru';
    } catch (error) {
      return 'ru';
    }
  }

  function createMenu() {
    const nav = document.getElementById('nav-menu');
    if (!nav || document.getElementById(MENU_ID)) return;

    const item = document.createElement('li');
    item.id = MENU_ID;
    item.className = 'nav-item';

    const link = document.createElement('a');
    link.className = 'nav-link';
    link.href = INSTALL_PAGE;
    if (/\/added\/(?:index\.html)?$/i.test(window.location.pathname)) link.classList.add('active');
    item.append(link);

    const insertionPoint = nav.querySelector('.language-selector, .theme-selector, .settings-selector');
    nav.insertBefore(item, insertionPoint || null);
    syncLabels();
  }

  function syncLabels() {
    const item = document.getElementById(MENU_ID);
    if (!item) return;
    const language = currentLanguage();
    const link = item.querySelector('.nav-link');
    if (link) link.textContent = language === 'en' ? 'Add bot' : 'Добавить бота';
  }

  function siteUrl(path) {
    return new URL(path, new URL(SITE_ROOT, window.location.href)).href;
  }

  function repairInternalLinks() {
    const exactReplacements = new Map([
      ['dtu-dtd-instructions', 'dtc-instructions'],
      ['dks-dtd-instructions', 'dfs-instructions'],
      ['driver-instructions', 'drivers-instructions'],
      ['offical_documentation', 'official_documentation'],
      ['other/updates', 'other/website_updates'],
      ['forms/personnel/dtu', 'forms/personnel/dtc']
    ]);
    for (const anchor of document.querySelectorAll('a[href]')) {
      const raw = String(anchor.getAttribute('href') || '').trim();
      if (!raw || raw.startsWith('#') || /^(?:https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(raw)) continue;
      let normalized = raw.replace(/\\/g, '/').replace(/\s+$/, '');
      for (const [from, to] of exactReplacements) normalized = normalized.replace(from, to);
      const routeMatch = normalized.match(/(?:^|\/)((?:documentation\/)?(?:employees|departments)\/[^/?#]+\/?|forms\/(?:applications|personnel|tests|others)\/[^?#]*|events\/?|other\/(?:official_documentation|website_updates)\/?)/i);
      if (routeMatch) {
        const target = /^(?:employees|departments)\//i.test(routeMatch[1])
          ? `documentation/${routeMatch[1]}`
          : routeMatch[1];
        anchor.href = siteUrl(target);
      }
    }
  }

  function bindWorkerIdentifierStorage(root = document) {
    const selector = 'input#worker-identifier, input[name="workerIdentifier"]';
    const inputs = [
      ...(root.matches?.(selector) ? [root] : []),
      ...(root.querySelectorAll?.(selector) || [])
    ];
    for (const input of inputs) {
      if (input.dataset.workerIdentifierStorage === 'true') continue;
      input.dataset.workerIdentifierStorage = 'true';
      let saved = '';
      try { saved = localStorage.getItem(WORKER_IDENTIFIER_KEY) || ''; } catch (error) { saved = ''; }
      if (!input.value && saved) input.value = saved;
      const persist = () => {
        const value = String(input.value || '').trim().toUpperCase();
        if (!/^TRP-RP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(value)) return;
        try { localStorage.setItem(WORKER_IDENTIFIER_KEY, value); } catch (error) { /* Storage is optional. */ }
        document.querySelectorAll('input#worker-identifier, input[name="workerIdentifier"]').forEach((other) => {
          if (other !== input) other.value = value;
        });
      };
      input.addEventListener('input', persist);
      input.addEventListener('change', persist);
      input.addEventListener('blur', persist);
    }
  }

  function restoreWorkerIdentifier(value) {
    const normalized = String(value || '').trim().toUpperCase();
    if (!/^TRP-RP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(normalized)) return;
    document.querySelectorAll('input#worker-identifier, input[name="workerIdentifier"]').forEach((input) => {
      if (input.value !== normalized) input.value = normalized;
    });
  }

  function createAdministrativeSubmenu() {
    const external = [...document.querySelectorAll('a[href*="sites.google.com/view/trp-rp-control"]')];
    for (const link of external) {
      const item = link.closest('li');
      if (!item || item.dataset.adminSubmenu === 'true') continue;
      item.dataset.adminSubmenu = 'true';
      item.className = 'dropdown-submenu';
      item.replaceChildren();
      const toggle = document.createElement('a');
      toggle.href = '#';
      toggle.className = 'dropdown-link submenu-toggle';
      toggle.textContent = currentLanguage() === 'en' ? 'Administration' : 'Администрирование';
      const arrow = document.createElement('span');
      arrow.className = 'submenu-arrow';
      arrow.textContent = '▸';
      toggle.append(' ', arrow);
      const list = document.createElement('ul');
      list.className = 'dropdown-submenu-list';
      const entries = [
        ['admin/#applications', 'Заявления', 'Applications'],
        ['admin/#shifts', 'Смены и РП-сессии', 'Shifts and RP sessions'],
        ['admin/#server-status', 'Статус сервера', 'Server status'],
        ['admin/#vehicles', 'Автотранспорт', 'Vehicles']
      ];
      for (const [href, ru, en] of entries) {
        const child = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = siteUrl(href);
        anchor.className = 'dropdown-link';
        anchor.textContent = currentLanguage() === 'en' ? en : ru;
        child.append(anchor);
        list.append(child);
      }
      item.append(toggle, list);
    }
  }

  function injectCurrentWebsiteUpdate() {
    if (!/\/other\/website_updates\//i.test(window.location.pathname)) return;
    const container = document.querySelector('.updates-section .container');
    if (!container || document.getElementById('update-2026-08-08')) return;
    const article = document.createElement('article');
    article.id = 'update-2026-08-08';
    article.className = 'update-entry';
    article.innerHTML = `
      <h2 class="update-date">Большое обновление от 08.08.2026</h2>
      <p class="update-label">Список изменений:</p>
      <ul class="update-list">
        <li>Исправлены множественные ошибки навигации, форм и интерактивных элементов сайта.</li>
        <li>Обновлена система идентификаторов работников и добавлено локальное сохранение между всеми заявлениями.</li>
        <li>Обновлены заявления и теоретический экзамен на водителя 1-го класса.</li>
        <li>Административные инструменты перенесены на сайт проекта.</li>
        <li>Обновлена система событий, смен и РП-сессий.</li>
        <li>Добавлена автоматическая регистрация на смены через интерактивный календарь.</li>
        <li>Обновлена работа списка автотранспорта и управления его записями.</li>
        <li>Добавлены новые кадровые заявления и единая панель заявлений в Discord.</li>
        <li>Добавлен дополнительный способ Roblox-верификации через специальный плейс.</li>
        <li>Улучшена работа редакторов транспорта и исправлены настройки моделей ZiU.</li>
      </ul>`;
    container.prepend(article);
  }

  function loadAsset(tagName, attributes) {
    return new Promise((resolve, reject) => {
      const selector = attributes.src
        ? `script[src="${attributes.src}"]`
        : `link[href="${attributes.href}"]`;
      const existing = document.querySelector(selector);
      if (existing) {
        if (existing.dataset.loaded === 'true' || tagName === 'link') resolve();
        else existing.addEventListener('load', resolve, { once: true });
        return;
      }
      const element = document.createElement(tagName);
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
      element.addEventListener('load', () => {
        element.dataset.loaded = 'true';
        resolve();
      }, { once: true });
      element.addEventListener('error', reject, { once: true });
      document.head.append(element);
    });
  }

  async function loadPersonnelApplicationPage() {
    if (!/\/forms\/personnel\/(?:tc|hrdpc|dtc|tsd|dfs|dhuta|fad|dtdmi_&_dtdhi)\//i.test(window.location.pathname)) return;
    await Promise.all([
      loadAsset('link', { rel: 'stylesheet', href: siteUrl('css/form-exam-styles.css?v=20260808') }),
      loadAsset('link', { rel: 'stylesheet', href: siteUrl('css/personnel-applications.css?v=20260808') })
    ]);
    if (!window.TRP_APPLICATIONS_API_URL) {
      await loadAsset('script', { src: siteUrl('scripts/training-applications-config.js?v=20260808c') });
    }
    await loadAsset('script', { src: siteUrl('scripts/personnel-applications.js?v=20260808') });
  }

  async function loadFirstClassExamPage() {
    if (!/\/forms\/tests\/(?:index\.html)?$/i.test(window.location.pathname)) return;
    await Promise.all([
      loadAsset('link', { rel: 'stylesheet', href: siteUrl('css/form-exam-styles.css?v=20260808') }),
      loadAsset('link', { rel: 'stylesheet', href: siteUrl('css/personnel-applications.css?v=20260808') }),
      loadAsset('link', { rel: 'stylesheet', href: siteUrl('css/first-class-exam.css?v=20260808') })
    ]);
    if (!window.TRP_APPLICATIONS_API_URL) {
      await loadAsset('script', { src: siteUrl('scripts/training-applications-config.js?v=20260808c') });
    }
    await loadAsset('script', { src: siteUrl('scripts/first-class-exam.js?v=20260808') });
  }

  async function loadShiftCalendarPage() {
    if (!/\/events\/(?:index\.html)?$/i.test(window.location.pathname)) return;
    await loadAsset('link', { rel: 'stylesheet', href: siteUrl('css/shift-calendar.css?v=20260808b') });
    if (!window.TRP_APPLICATIONS_API_URL) {
      await loadAsset('script', { src: siteUrl('scripts/training-applications-config.js?v=20260808c') });
    }
    await loadAsset('script', { src: siteUrl('scripts/shift-calendar.js?v=20260808c') });
  }

  async function loadServerStatusIndicator() {
    if (!document.getElementById('server-button')) return;
    if (!window.TRP_APPLICATIONS_API_URL) {
      await loadAsset('script', { src: siteUrl('scripts/training-applications-config.js?v=20260808c') });
    }
    await loadAsset('script', { src: siteUrl('scripts/site-server-status.js?v=20260809a') });
  }

  async function loadVehicleDatabasePage() {
    if (!/\/other\/vehicle_list\/(?:index\.html)?$/i.test(window.location.pathname)) return;
    if (!window.TRP_APPLICATIONS_API_URL) {
      await loadAsset('script', { src: siteUrl('scripts/training-applications-config.js?v=20260808c') });
    }
      await loadAsset('script', { src: siteUrl('scripts/vehicle-list-database.js?v=20260809b') });
  }

  function boot() {
    createMenu();
    repairInternalLinks();
    bindWorkerIdentifierStorage();
    createAdministrativeSubmenu();
    injectCurrentWebsiteUpdate();
    loadPersonnelApplicationPage().catch(error => console.error('Personnel application page failed:', error));
    loadFirstClassExamPage().catch(error => console.error('First-class exam page failed:', error));
    loadShiftCalendarPage().catch(error => console.error('Shift calendar page failed:', error));
    loadServerStatusIndicator().catch(error => console.error('Server status indicator failed:', error));
    loadVehicleDatabasePage().catch(error => console.error('Vehicle database page failed:', error));
    syncLabels();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  window.addEventListener('storage', (event) => {
    syncLabels();
    if (event.key === WORKER_IDENTIFIER_KEY) restoreWorkerIdentifier(event.newValue);
  });
  window.addEventListener('trp-site-settings-change', syncLabels);
  document.addEventListener('click', (event) => {
    if (!event.target.closest('#lang-btn')) return;
    window.setTimeout(syncLabels, 0);
    window.setTimeout(syncLabels, 500);
  });
  window.TrpInstallNavigation = { sync: syncLabels, boot, bindWorkerIdentifierStorage };
  if (document.body) {
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) bindWorkerIdentifierStorage(node);
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }
}());
