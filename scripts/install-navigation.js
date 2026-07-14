(function () {
  'use strict';

  const MENU_ID = 'trp-install-menu';
  const APPLICATION_ID = '1055811401983197184';
  const CALLBACK_URL = encodeURIComponent('https://novogrey.github.io/TRP-RP-RolePlay-Project/added/');
  const INSTALL_URLS = {
    server: `https://discord.com/oauth2/authorize?client_id=${APPLICATION_ID}&permissions=35840&response_type=code&redirect_uri=${CALLBACK_URL}&integration_type=0&scope=bot%20applications.commands&state=server`,
    account: `https://discord.com/oauth2/authorize?client_id=${APPLICATION_ID}&response_type=code&redirect_uri=${CALLBACK_URL}&integration_type=1&scope=applications.commands&state=account`
  };

  function currentLanguage() {
    try {
      return localStorage.getItem('language') === 'en' ? 'en' : 'ru';
    } catch (error) {
      return 'ru';
    }
  }

  function createLink(target, className) {
    const link = document.createElement('a');
    link.className = className;
    link.href = INSTALL_URLS[target];
    link.dataset.installTarget = target;
    return link;
  }

  function createMenu() {
    const nav = document.getElementById('nav-menu');
    if (!nav || document.getElementById(MENU_ID)) return;

    const item = document.createElement('li');
    item.id = MENU_ID;
    item.className = 'nav-item has-dropdown';

    const toggle = document.createElement('button');
    toggle.className = 'dropdown-toggle';
    toggle.type = 'button';

    const label = document.createElement('span');
    label.className = 'trp-install-menu-label';
    const arrow = document.createElement('span');
    arrow.className = 'dropdown-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '▾';
    toggle.append(label, arrow);

    const list = document.createElement('ul');
    list.className = 'dropdown-menu';
    list.append(createLink('server', 'dropdown-link'), createLink('account', 'dropdown-link'));
    item.append(toggle, list);

    const insertionPoint = nav.querySelector('.language-selector, .theme-selector, .settings-selector');
    nav.insertBefore(item, insertionPoint || null);
    syncLabels();
  }

  function syncLabels() {
    const item = document.getElementById(MENU_ID);
    if (!item) return;
    const language = currentLanguage();
    const label = item.querySelector('.trp-install-menu-label');
    const server = item.querySelector('[data-install-target="server"]');
    const account = item.querySelector('[data-install-target="account"]');
    if (label) label.textContent = language === 'en' ? 'Add app' : 'Добавить';
    if (server) server.textContent = language === 'en' ? 'Add to server' : 'Добавить на сервер';
    if (account) account.textContent = language === 'en' ? 'Add to account' : 'Добавить на аккаунт';
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
