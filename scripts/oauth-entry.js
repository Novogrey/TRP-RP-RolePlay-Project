(() => {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbx6VZxf9DEQxZTjYrNPZ9nUio_wfTRECe7CExkOfHdnmHLruJul8658-wg72kQFzIWZ/exec';
  const copy = {
    en: {
      home: 'Home', privacy: 'Privacy Policy', terms: 'Terms of Service',
      eyebrow: 'OFFICIAL ACCOUNT VERIFICATION', title: 'Verify your Roblox account',
      description: 'Confirm your Discord identity, authorize your Roblox account on the official Roblox page, and link both accounts to TRP RP.',
      start: 'Start verification', join: 'Join the Discord server',
      requirement: 'You must be a member of the TRP RP Discord server before starting.',
      processLabel: 'VERIFICATION PROCESS', processTitle: 'Three secure steps',
      step1Title: 'Join TRP RP in Discord', step1Text: 'Membership is required so the bot can apply verification roles and link the correct account.',
      step2Title: 'Confirm your Discord identity', step2Text: 'Discord provides only your basic account identity. No server-management permissions are requested.',
      step3Title: 'Authorize through Roblox', step3Text: 'Roblox asks for the openid and profile scopes. Your password is never shared with TRP RP.',
      securityLabel: 'DATA AND SECURITY', securityTitle: 'Only the information required for verification',
      receivedTitle: 'Received', receivedText: 'Discord account ID, Roblox account ID, username, and verification result.',
      notReceivedTitle: 'Not received', notReceivedText: 'Passwords, private messages, payment details, or private Roblox data.',
      tokensTitle: 'OAuth tokens', tokensText: 'Used only during authorization, never stored in the project database, and revoked after verification.',
      footerText: 'Official Roblox OAuth 2.0 verification for the TRP RP community.'
    },
    ru: {
      home: 'Главная', privacy: 'Политика конфиденциальности', terms: 'Условия использования',
      eyebrow: 'ОФИЦИАЛЬНАЯ ВЕРИФИКАЦИЯ АККАУНТА', title: 'Подтвердите аккаунт Roblox',
      description: 'Подтвердите Discord, разрешите доступ к публичным данным аккаунта на официальной странице Roblox и свяжите оба аккаунта с TRP RP.',
      start: 'Начать верификацию', join: 'Присоединиться к Discord',
      requirement: 'Перед началом необходимо состоять на Discord-сервере TRP RP.',
      processLabel: 'ПОРЯДОК ВЕРИФИКАЦИИ', processTitle: 'Три защищённых этапа',
      step1Title: 'Вступите на Discord-сервер TRP RP', step1Text: 'Участие необходимо, чтобы бот мог выдать роли верификации и связать правильный аккаунт.',
      step2Title: 'Подтвердите Discord', step2Text: 'Discord передаёт только базовый идентификатор аккаунта. Права управления сервером не запрашиваются.',
      step3Title: 'Подтвердите Roblox', step3Text: 'Roblox запрашивает разрешения openid и profile. Пароль никогда не передаётся TRP RP.',
      securityLabel: 'ДАННЫЕ И БЕЗОПАСНОСТЬ', securityTitle: 'Только необходимые для верификации сведения',
      receivedTitle: 'Получаем', receivedText: 'ID Discord, ID Roblox, имя аккаунта и результат верификации.',
      notReceivedTitle: 'Не получаем', notReceivedText: 'Пароли, личные сообщения, платёжные сведения и закрытые данные Roblox.',
      tokensTitle: 'OAuth-токены', tokensText: 'Используются только во время авторизации, не сохраняются в базе проекта и отзываются после проверки.',
      footerText: 'Официальная OAuth 2.0-верификация Roblox для сообщества TRP RP.'
    }
  };

  let language = localStorage.getItem('trp-oauth-language');
  if (!copy[language]) language = navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';

  function applyLanguage(next) {
    language = copy[next] ? next : 'en';
    localStorage.setItem('trp-oauth-language', language);
    document.documentElement.lang = language;
    document.querySelectorAll('[data-copy]').forEach(element => {
      const value = copy[language][element.dataset.copy];
      if (value) element.textContent = value;
    });
    const start = document.getElementById('start-verification');
    const url = new URL(GAS_URL);
    url.searchParams.set('action', 'discord-oauth-start');
    url.searchParams.set('language', language);
    start.href = url.toString();
    document.getElementById('language-toggle').textContent = language === 'ru' ? 'EN' : 'RU';
  }

  document.getElementById('language-toggle').addEventListener('click', () => {
    applyLanguage(language === 'ru' ? 'en' : 'ru');
  });
  applyLanguage(language);
})();
