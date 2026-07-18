(function () {
  'use strict';

  function activeLanguage() {
    return document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'ru';
  }

  function syncLegalLanguage() {
    const language = activeLanguage();
    document.querySelectorAll('[data-bot-legal-language]').forEach((section) => {
      section.hidden = section.dataset.botLegalLanguage !== language;
    });
  }

  const observer = new MutationObserver(syncLegalLanguage);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncLegalLanguage, { once: true });
  } else {
    syncLegalLanguage();
  }

  window.addEventListener('pageshow', syncLegalLanguage);
})();
