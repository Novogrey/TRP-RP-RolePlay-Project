(function () {
  'use strict';

  const MENU_ID = 'trp-install-menu';
  const scriptSource = document.currentScript
    && document.currentScript.getAttribute('src');
  const INSTALL_PAGE = scriptSource && /scripts\/install-navigation\.js(?:[?#].*)?$/i.test(scriptSource)
    ? scriptSource.replace(/scripts\/install-navigation\.js(?:[?#].*)?$/i, 'added/')
    : './added/';

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

  function boot() {
    createMenu();
    syncLabels();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  window.addEventListener('storage', syncLabels);
  window.addEventListener('trp-site-settings-change', syncLabels);
  document.addEventListener('click', (event) => {
    if (!event.target.closest('#lang-btn')) return;
    window.setTimeout(syncLabels, 0);
    window.setTimeout(syncLabels, 500);
  });
  window.TrpInstallNavigation = { sync: syncLabels };
}());
