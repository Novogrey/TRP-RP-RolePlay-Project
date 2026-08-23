(function loadSiteAnnouncements() {
  'use strict';

  const FALLBACK_API_URL = 'https://script.google.com/macros/s/AKfycbxvVIH5tTUNYTlDWHVNv26FQggpRNm-ac4GBmwhrqn_8KcqD2_AGOUt3W6c4v2zPbk9/exec';
  const REFRESH_INTERVAL_MS = 60 * 1000;
  let loading = false;

  window.TRP_SITE_ANNOUNCEMENTS = [];

  function endpoint() {
    return window.TRP_APPLICATIONS_API_URL
      || window.TRP_TRAINING_APPLICATIONS_API_URL
      || FALLBACK_API_URL;
  }

  async function refresh() {
    if (loading) return;
    loading = true;
    try {
      const url = new URL(endpoint());
      url.searchParams.set('action', 'site-announcements');
      url.searchParams.set('_', String(Date.now()));
      const response = await fetch(url.toString(), { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok || !result?.ok || !Array.isArray(result.announcements)) {
        throw new Error(result?.error || 'Announcement API returned an invalid response.');
      }
      window.TRP_SITE_ANNOUNCEMENTS = result.announcements;
      window.dispatchEvent(new CustomEvent('trp-site-announcements-updated'));
    } catch (error) {
      console.warn('[TRP Site Announcements] Failed to load announcements:', error?.message || error);
    } finally {
      loading = false;
    }
  }

  function start() {
    refresh();
    window.setInterval(refresh, REFRESH_INTERVAL_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  window.TRP_REFRESH_SITE_ANNOUNCEMENTS = refresh;
})();
