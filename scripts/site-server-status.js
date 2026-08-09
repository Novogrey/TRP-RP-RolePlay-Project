(function () {
  'use strict';

  const api = String(window.TRP_APPLICATIONS_API_URL || '').trim();
  const button = document.getElementById('server-button');
  if (!api || !button) return;
  const originalUrl = button.getAttribute('href');

  function language() {
    return localStorage.getItem('language') === 'en' ? 'en' : 'ru';
  }

  async function update() {
    const url = new URL(api);
    url.searchParams.set('action', 'server-status-public');
    url.searchParams.set('language', language());
    const response = await fetch(url, { cache: 'no-store' });
    const payload = await response.json();
    if (!payload?.ok || !payload.status) return;
    const status = payload.status;
    button.dataset.serverState = status.state;
    const unavailable = status.state === 'offline' || status.state === 'restarting';
    const indicatorColor = unavailable ? '#D83C3E' : '#2E7D32';
    button.textContent = language() === 'en' ? 'Roblox Server' : 'Сервер Roblox';
    button.style.backgroundColor = indicatorColor;
    button.style.borderColor = indicatorColor;
    button.style.color = '#ffffff';
    button.title = status.reason || status.label;
    button.setAttribute('aria-disabled', unavailable ? 'true' : 'false');
    if (unavailable) button.removeAttribute('href');
    else button.href = status.joinUrl || originalUrl;
  }

  update().catch(() => null);
  window.setInterval(() => update().catch(() => null), 60_000);
  document.addEventListener('click', event => {
    if (event.target.closest('#lang-btn')) window.setTimeout(() => update().catch(() => null), 100);
  });
}());
