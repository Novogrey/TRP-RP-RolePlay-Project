(function () {
  'use strict';

  const APPLICATION_ID = '1055811401983197184';
  const CALLBACK_URL = encodeURIComponent('https://novogrey.github.io/TRP-RP-RolePlay-Project/added/');
  const AUTH_URLS = {
    server: `https://discord.com/oauth2/authorize?client_id=${APPLICATION_ID}&permissions=35840&response_type=code&redirect_uri=${CALLBACK_URL}&integration_type=0&scope=bot%20applications.commands&state=server`,
    account: `https://discord.com/oauth2/authorize?client_id=${APPLICATION_ID}&response_type=code&redirect_uri=${CALLBACK_URL}&integration_type=1&scope=applications.commands&state=account`
  };

  const translations = {
    ru: {
      pageTitle: 'Добавить TRP RP Systems',
      pageDescription: 'Добавьте TRP RP Systems на сервер Discord или в свой аккаунт и используйте редакторы конфигураций TRP RP.',
      back: '← Назад', navHome: 'Главная', navTeam: 'Команда проекта', navEvents: 'События и смены', navEditors: 'Редакторы', navSocial: 'Социальные сети',
      commandVehicle: 'Генератор транспорта', commandLivery: 'Редактор окрасок', commandRoute: 'Редактор маршрутов',
      commandAnnouncement: 'Редактор информатора', commandTdw: 'Генератор сцены TDW', commandMap: 'Конфигуратор карты',
      heroTitle: 'Добавьте редакторы TRP RP в Discord',
      heroCopy: 'Создавайте и изменяйте конфигурации транспорта, окрасок, маршрутов, информаторов, сцен TDW и карт прямо через команды Discord.',
      serverTitle: 'Добавить на сервер', serverHint: 'Редакторы доступны участникам сервера',
      accountTitle: 'Добавить на аккаунт', accountHint: 'Редакторы доступны лично вам',
      chooseTitle: 'Выберите способ установки', chooseDescription: 'Discord откроет безопасное окно подтверждения с необходимыми разрешениями.',
      installAgain: 'Установить повторно',
      commandsKicker: 'КОМАНДЫ', commandsTitle: 'Шесть редакторов в одном приложении',
      commandsCopy: 'Каждая команда открывает полноценную интерактивную панель и формирует файл для соответствующей системы TRP RP.',
      finalKicker: 'TRP RP SYSTEMS', finalTitle: 'Выберите подходящий способ установки',
      footerText: '© 2026 TRP RP. Все права защищены.', privacy: 'Политика конфиденциальности',
      menuOpen: 'Открыть меню', darkTheme: 'Включить тёмную тему', lightTheme: 'Включить светлую тему',
      pauseAnimation: 'Приостановить анимацию', resumeAnimation: 'Продолжить анимацию',
      serverInstalledHero: 'TRP RP Systems добавлен на сервер',
      accountInstalledHero: 'TRP RP Systems добавлен в аккаунт',
      serverInstalledCopy: 'Discord подтвердил серверную установку. Участникам доступны шесть публичных редакторов и команда /help.',
      accountInstalledCopy: 'Discord подтвердил пользовательскую установку. Редакторы доступны вам на поддерживаемых серверах, в личных и групповых сообщениях.',
      serverInstalledTitle: 'Серверная установка завершена',
      accountInstalledTitle: 'Установка в аккаунт завершена',
      installCanceledTitle: 'Установка отменена', installCanceledDescription: 'Discord не предоставил приложению доступ. Вы можете повторить установку в любое время.',
      resultReady: 'Файл подготовлен'
    },
    en: {
      pageTitle: 'Add TRP RP Systems',
      pageDescription: 'Add TRP RP Systems to a Discord server or your account and use the TRP RP configuration editors.',
      back: '← Back', navHome: 'Home', navTeam: 'Project team', navEvents: 'Events and shifts', navEditors: 'Editors', navSocial: 'Social media',
      commandVehicle: 'Vehicle generator', commandLivery: 'Livery editor', commandRoute: 'Route editor',
      commandAnnouncement: 'Announcement editor', commandTdw: 'TDW stage generator', commandMap: 'Map configurator',
      heroTitle: 'Add the TRP RP editors to Discord',
      heroCopy: 'Create and update vehicle, livery, route, announcement, TDW stage, and map configurations directly through Discord commands.',
      serverTitle: 'Add to server', serverHint: 'Editors are available to server members',
      accountTitle: 'Add to account', accountHint: 'Editors are available personally to you',
      chooseTitle: 'Choose an installation method', chooseDescription: 'Discord will open a secure confirmation screen with the required permissions.',
      installAgain: 'Install again',
      commandsKicker: 'COMMANDS', commandsTitle: 'Six editors in one app',
      commandsCopy: 'Each command opens a complete interactive panel and creates a file for the corresponding TRP RP system.',
      finalKicker: 'TRP RP SYSTEMS', finalTitle: 'Choose the installation method that fits your use',
      footerText: '© 2026 TRP RP. All rights reserved.', privacy: 'Privacy policy',
      menuOpen: 'Open menu', darkTheme: 'Enable dark theme', lightTheme: 'Enable light theme',
      pauseAnimation: 'Pause animation', resumeAnimation: 'Resume animation',
      serverInstalledHero: 'TRP RP Systems was added to the server',
      accountInstalledHero: 'TRP RP Systems was added to your account',
      serverInstalledCopy: 'Discord confirmed the server installation. Members can use the six public editors and the /help command.',
      accountInstalledCopy: 'Discord confirmed the user installation. The editors are available to you in supported servers, DMs, and group messages.',
      serverInstalledTitle: 'Server installation completed',
      accountInstalledTitle: 'Account installation completed',
      installCanceledTitle: 'Installation canceled', installCanceledDescription: 'Discord did not grant access to the app. You can restart the installation at any time.',
      resultReady: 'File prepared'
    }
  };

  const demos = [
    {
      command: '/vehiclespawn', file: 'vehicle_spawn.json',
      ru: { title: 'Генератор транспорта', description: 'Настройте модель, бортовой номер, окраску, флаги и оснащение.', fields: [['Модель', 'ZiU-682'], ['Бортовой номер', '1545'], ['Окраска', 'Moscow'], ['Экраны', 'Включено']] },
      en: { title: 'Vehicle Spawn Generator', description: 'Configure the model, fleet number, livery, flags, and equipment.', fields: [['Model', 'ZiU-682'], ['Fleet number', '1545'], ['Livery', 'Moscow'], ['Displays', 'Enabled']] }
    },
    {
      command: '/livery-editor', file: 'livery.json',
      ru: { title: 'Редактор окрасок', description: 'Изменяйте цвета, материалы, текстуры и параметры всех элементов окраски.', fields: [['Кузов', '#F2D21B'], ['Полосы', '#D92323'], ['Диски', '#D8D8D8'], ['Текстура', '12843851']] },
      en: { title: 'Livery Editor', description: 'Edit colors, materials, textures, and every livery element.', fields: [['Body', '#F2D21B'], ['Stripes', '#D92323'], ['Wheels', '#D8D8D8'], ['Texture', '12843851']] }
    },
    {
      command: '/route-editor', file: 'route.json',
      ru: { title: 'Редактор маршрутов', description: 'Соберите маршрут, укажите начальную и конечную остановки и интервалы.', fields: [['Маршрут', '10A'], ['Начало', 'Town Park'], ['Конечная', 'Green Village'], ['Интервал', '8 мин']] },
      en: { title: 'Route Editor', description: 'Build a route with its starting stop, terminal stop, and intervals.', fields: [['Route', '10A'], ['Start', 'Town Park'], ['Terminal', 'Green Village'], ['Interval', '8 min']] }
    },
    {
      command: '/announcement-editor', file: 'announcements.json',
      ru: { title: 'Редактор информатора', description: 'Свяжите референсные названия остановок с SoundId объявлений.', fields: [['Остановка', 'tpark_o'], ['SoundId', '18490321'], ['Остановка', 'green_v'], ['SoundId', '18490344']] },
      en: { title: 'Announcement Editor', description: 'Connect stop reference names to announcement SoundIds.', fields: [['Stop', 'tpark_o'], ['SoundId', '18490321'], ['Stop', 'green_v'], ['SoundId', '18490344']] }
    },
    {
      command: '/tdw-stage-editor', file: 'tdw_stage.json',
      ru: { title: 'Генератор сцены TDW', description: 'Расположите действия сцены по времени без добавления аудиофайла.', fields: [['Время', '0.0 сек'], ['Действие', 'OpenCurtain'], ['Время', '5.5 сек'], ['Цель', 'MainLight']] },
      en: { title: 'TDW Stage Generator', description: 'Arrange stage actions by timing without attaching an audio file.', fields: [['Time', '0.0 sec'], ['Action', 'OpenCurtain'], ['Time', '5.5 sec'], ['Target', 'MainLight']] }
    },
    {
      command: '/map-configurator', file: 'map_config.json',
      ru: { title: 'Конфигуратор карты', description: 'Подготовьте название, изображение и параметры опубликованной карты.', fields: [['Название', 'Hardbass'], ['Image ID', '12485822'], ['Пустая карта', 'Нет'], ['Маршруты', '6, 9, 10']] },
      en: { title: 'Map Configurator', description: 'Prepare the name, image, and published map settings.', fields: [['Name', 'Hardbass'], ['Image ID', '12485822'], ['Empty map', 'No'], ['Routes', '6, 9, 10']] }
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const stateTarget = Object.prototype.hasOwnProperty.call(AUTH_URLS, params.get('state')) ? params.get('state') : null;
  const savedTarget = Object.prototype.hasOwnProperty.call(AUTH_URLS, params.get('installed')) ? params.get('installed') : null;
  const target = stateTarget || savedTarget;
  const installationCompleted = Boolean((params.get('code') && stateTarget) || savedTarget);
  const installationCanceled = params.get('error') === 'access_denied';
  let language = getSavedLanguage();
  let currentDemo = 0;
  let demoTimer = null;
  let typingTimer = null;
  let demoStarted = false;
  let demoPaused = prefersReducedMotion();

  if (params.get('code') && stateTarget) {
    const cleanUrl = `${window.location.pathname}?installed=${stateTarget}${window.location.hash}`;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  function getSavedLanguage() {
    try {
      return localStorage.getItem('language') === 'en' ? 'en' : 'ru';
    } catch (error) {
      return 'ru';
    }
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    } catch (error) {
      return 'light';
    }
  }

  function prefersReducedMotion() {
    const systemReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const settingsReduced = window.TrpSiteSettings && window.TrpSiteSettings.getPreferences().animations === 'off';
    return Boolean(systemReduced || settingsReduced);
  }

  function text(key) {
    return translations[language][key] || translations.ru[key] || key;
  }

  function applyLanguage(nextLanguage, persist) {
    language = nextLanguage === 'en' ? 'en' : 'ru';
    document.documentElement.lang = language;
    document.title = text('pageTitle');
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = text('pageDescription');
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = text(element.dataset.i18n);
      if (value) element.textContent = value;
    });
    const langButton = document.getElementById('lang-btn');
    if (langButton) langButton.textContent = language === 'ru' ? 'EN' : 'RU';
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) menuToggle.setAttribute('aria-label', text('menuOpen'));
    syncThemeButton();
    syncInstallationStatus();
    renderDemo(currentDemo, false);
    if (window.TrpInstallNavigation) window.TrpInstallNavigation.sync();

    if (persist) {
      if (window.TrpSiteSettings) window.TrpSiteSettings.setPreferences({ language });
      else {
        try { localStorage.setItem('language', language); } catch (error) {}
        window.dispatchEvent(new CustomEvent('trp-site-settings-change'));
      }
    }
  }

  function applyTheme(theme, persist) {
    const dark = theme === 'dark';
    document.body.classList.toggle('dark-mode', dark);
    syncThemeButton();
    if (persist) {
      if (window.TrpSiteSettings) window.TrpSiteSettings.setPreferences({ theme: dark ? 'dark' : 'light' });
      else {
        try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (error) {}
      }
    }
  }

  function syncThemeButton() {
    const button = document.getElementById('theme-btn');
    if (!button) return;
    const dark = document.body.classList.contains('dark-mode');
    button.textContent = dark ? '☀️' : '🌙';
    button.setAttribute('aria-label', text(dark ? 'lightTheme' : 'darkTheme'));
    button.title = text(dark ? 'lightTheme' : 'darkTheme');
  }

  function syncInstallationStatus() {
    const status = document.getElementById('redirect-status');
    const title = document.getElementById('redirect-title');
    const description = document.getElementById('redirect-description');
    const continueLink = document.getElementById('continue-link');
    const heroTitle = document.getElementById('hero-title');
    const heroCopy = document.getElementById('hero-copy');
    if (!status || !title || !description || !continueLink || !heroTitle || !heroCopy) return;

    document.querySelectorAll('.install-option').forEach((option) => {
      option.classList.toggle('is-active', option.dataset.target === target);
    });
    status.classList.remove('is-returned', 'is-error');
    heroTitle.textContent = text('heroTitle');
    heroCopy.textContent = text('heroCopy');

    if (installationCanceled) {
      status.classList.add('is-error');
      title.textContent = text('installCanceledTitle');
      description.textContent = text('installCanceledDescription');
      if (target) {
        continueLink.href = AUTH_URLS[target];
        continueLink.classList.remove('is-hidden');
      } else {
        continueLink.classList.add('is-hidden');
      }
      return;
    }

    if (!installationCompleted || !target) {
      title.textContent = text('chooseTitle');
      description.textContent = text('chooseDescription');
      continueLink.classList.add('is-hidden');
      return;
    }

    status.classList.add('is-returned');
    continueLink.href = AUTH_URLS[target];
    continueLink.classList.remove('is-hidden');
    heroTitle.textContent = text(target === 'server' ? 'serverInstalledHero' : 'accountInstalledHero');
    heroCopy.textContent = text(target === 'server' ? 'serverInstalledCopy' : 'accountInstalledCopy');
    title.textContent = text(target === 'server' ? 'serverInstalledTitle' : 'accountInstalledTitle');
    description.textContent = text(target === 'server' ? 'serverInstalledCopy' : 'accountInstalledCopy');
  }

  function renderDemo(index, animate) {
    currentDemo = Math.max(0, Math.min(demos.length - 1, Number(index) || 0));
    const demo = demos[currentDemo];
    const localized = demo[language];
    const commandElement = document.getElementById('demo-command');
    const title = document.getElementById('demo-title');
    const description = document.getElementById('demo-description');
    const fields = document.getElementById('demo-fields');
    const file = document.getElementById('demo-file');
    const resultLabel = document.getElementById('demo-result-label');
    if (!commandElement || !title || !description || !fields || !file || !resultLabel) return;

    document.querySelectorAll('[data-command-index]').forEach((button) => {
      button.classList.toggle('is-active', Number(button.dataset.commandIndex) === currentDemo);
    });
    if (typingTimer) window.clearInterval(typingTimer);
    commandElement.textContent = animate && !prefersReducedMotion() ? '' : demo.command;
    if (animate && !prefersReducedMotion()) {
      let character = 0;
      typingTimer = window.setInterval(() => {
        character += 1;
        commandElement.textContent = demo.command.slice(0, character);
        if (character >= demo.command.length) {
          window.clearInterval(typingTimer);
          typingTimer = null;
        }
      }, 42);
    }

    title.textContent = localized.title;
    description.textContent = localized.description;
    fields.replaceChildren(...localized.fields.map(([label, value]) => {
      const field = document.createElement('div');
      field.className = 'demo-field';
      const small = document.createElement('small');
      const strong = document.createElement('strong');
      small.textContent = label;
      strong.textContent = value;
      field.append(small, strong);
      return field;
    }));
    file.textContent = demo.file;
    resultLabel.textContent = text('resultReady');
    restartProgress();
  }

  function restartProgress() {
    const progress = document.getElementById('demo-progress-bar');
    if (!progress) return;
    progress.classList.remove('is-running');
    progress.getBoundingClientRect();
    if (!demoPaused && demoStarted && !prefersReducedMotion()) progress.classList.add('is-running');
  }

  function scheduleNextDemo() {
    if (demoTimer) window.clearTimeout(demoTimer);
    if (demoPaused || !demoStarted) return;
    demoTimer = window.setTimeout(() => {
      renderDemo((currentDemo + 1) % demos.length, true);
      scheduleNextDemo();
    }, 5000);
  }

  function syncDemoControl() {
    const button = document.getElementById('demo-control');
    if (!button) return;
    button.textContent = demoPaused ? '▶' : 'Ⅱ';
    button.setAttribute('aria-label', text(demoPaused ? 'resumeAnimation' : 'pauseAnimation'));
    button.title = text(demoPaused ? 'resumeAnimation' : 'pauseAnimation');
  }

  function initializeObservers() {
    const sections = document.querySelectorAll('.reveal-section');
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      sections.forEach((section) => section.classList.add('is-visible'));
      demoStarted = true;
      renderDemo(0, false);
      scheduleNextDemo();
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => revealObserver.observe(section));

    const demo = document.getElementById('discord-demo');
    const demoObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || demoStarted) return;
      demoStarted = true;
      renderDemo(0, true);
      scheduleNextDemo();
      demoObserver.disconnect();
    }, { threshold: 0.3 });
    if (demo) demoObserver.observe(demo);
  }

  function boot() {
    const settingsLink = document.getElementById('trp-settings-link');
    if (settingsLink) settingsLink.href = '../settings/';
    applyTheme(getSavedTheme(), false);
    applyLanguage(language, false);
    syncDemoControl();
    initializeObservers();

    document.getElementById('lang-btn')?.addEventListener('click', () => {
      applyLanguage(language === 'ru' ? 'en' : 'ru', true);
    });
    document.getElementById('theme-btn')?.addEventListener('click', () => {
      applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark', true);
    });
    document.querySelectorAll('[data-command-index]').forEach((button) => {
      button.addEventListener('click', () => {
        renderDemo(button.dataset.commandIndex, true);
        scheduleNextDemo();
      });
    });
    document.getElementById('demo-control')?.addEventListener('click', () => {
      demoPaused = !demoPaused;
      if (demoPaused) {
        if (demoTimer) window.clearTimeout(demoTimer);
        document.getElementById('demo-progress-bar')?.classList.remove('is-running');
      } else {
        restartProgress();
        scheduleNextDemo();
      }
      syncDemoControl();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}());
