"undefined" == typeof window ||
  window.__TRP_INTERACTION_GUARD__ ||
  ((window.__TRP_INTERACTION_GUARD__ = !0),
  document.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    !0,
  ),
  document.addEventListener(
    "keydown",
    function (e) {
      var t = "F12" === e.key || "F12" === e.code || 123 === e.keyCode,
        n =
          "ContextMenu" === e.key ||
          "ContextMenu" === e.code ||
          (e.shiftKey && "F10" === e.key),
        o =
          e.ctrlKey &&
          ("s" === e.key ||
            "S" === e.key ||
            "KeyS" === e.code ||
            83 === e.keyCode);
      (t || n || o) && (e.preventDefault(), e.stopPropagation());
    },
    !0,
  ));
const translations = {
  ru: {
    Главная: "Главная",
    "Логические схемы": "Логические схемы",
    "Конфигуратор опубликованной карты": "Конфигуратор опубликованной карты",
    "Команда проекта": "Команда проекта",
    "События и смены": "События и смены",
    Документация: "Документация",
    Прочее: "Прочее",
    "Социальные сети": "Социальные сети",
    "TRP RP": "TRP RP",
    "Календарь событий и регистрация на смены":
      "Календарь событий и регистрация на смены",
    "Календарь событий": "Календарь событий",
    "Регистрация на смену": "Регистрация на смену",
    "Следите за расписанием мероприятий и смен проекта TRP RP в реальном времени.":
      "Следите за расписанием мероприятий и смен проекта TRP RP в реальном времени.",
    "Заполните заявку для участия в смене или её отмены. Заявки обрабатываются в течение 5 рабочих дней.":
      "Заполните заявку для участия в смене или её отмены. Заявки обрабатываются в течение 5 рабочих дней.",
    'Контакты проекта "TRP RP"': 'Контакты проекта "TRP RP"',
    Discord: "Discord",
    TeamSpeak: "TeamSpeak",
    YouTube: "YouTube",
    TikTok: "TikTok",
    Telegram: "Telegram",
    ВКонтакте: "ВКонтакте",
    'Юридическая документация проекта "TRP RP"':
      'Юридическая документация проекта "TRP RP"',
    "Политика конфиденциальности": "Политика конфиденциальности",
    "Пользовательское соглашение": "Пользовательское соглашение",
    'Проект "TRP RP" не является юридическим лицом и не предоставляет никаких услуг!':
      'Проект "TRP RP" не является юридическим лицом и не предоставляет никаких услуг!',
    "© 2026 TRP RP. Все права защищены.": "© 2026 TRP RP. Все права защищены.",
    "← Назад": "← Назад",
    "Устав проекта": "Устав проекта",
    ПДД: "ПДД",
    "Для сотрудников": "Для сотрудников",
    Маршруты: "Маршруты",
    "Регламент радиообмена": "Регламент радиообмена",
    "Инструкция ДТУ и ДТД": "Инструкция ДТУ и ДТД",
    "Инструкция ДКС и ДТД": "Инструкция ДКС и ДТД",
    "Инструкция водителей": "Инструкция водителей",
    "Для отделов": "Для отделов",
    "Директор ГТОП/ТПОХ": "Директор ГТОП/ТПОХ",
    КОУП: "КОУП",
    ФАО: "ФАО",
    ОБД: "ОБД",
    УбЦ: "УбЦ",
    Лекции: "Лекции",
    "Запуск троллейбусов": "Запуск троллейбусов",
    "Схемы депо и маршрутов": "Схемы депо и маршрутов",
    Анкеты: "Анкеты",
    Заявления: "Заявления",
    "Экзамен и обучение": "Экзамен и обучение",
    "Отпуск & Больничный": "Отпуск & Больничный",
    "Увольнение & Восстановление": "Увольнение & Восстановление",
    "Регистрация & Замена троллейбуса": "Регистрация & Замена троллейбуса",
    "Ремонт троллейбусов": "Ремонт троллейбусов",
    Персонал: "Персонал",
    ЗНГТУ: "ЗНГТУ",
    "ДТПГО & ДТПоХ": "ДТПГО & ДТПоХ",
    ДТУ: "ДТУ",
    ДКС: "ДКС",
    Тесты: "Тесты",
    "Теоретический экзамен": "Теоретический экзамен",
    "Подать апелляцию": "Подать апелляцию",
    "Регистрация на смену": "Регистрация на смену",
    "Прочие анкеты": "Прочие анкеты",
    "Редакторы и генераторы": "Редакторы и генераторы",
    "Генератор спавна машин": "Генератор спавна машин",
    "Создание окрасок": "Создание окрасок",
    "Редактор маршрутов": "Редактор маршрутов",
    Информатор: "Информатор",
    Расписание: "Расписание",
    "Трибуна TDW": "Трибуна TDW",
    'Правила проекта "TRP RP"': 'Правила проекта "TRP RP"',
    "ЧАВО - Частые вопросы": "ЧАВО - Частые вопросы",
    "Официальная документация": "Официальная документация",
    "Обновления сайта": "Обновления сайта",
    "База данных": "База данных",
    "Список автотранспорта": "Список автотранспорта",
    Команды: "Команды",
    "Идентификатор работника": "Идентификатор работника",
    "Административный сайт": "Административный сайт",
    VK: "VK",
  },
  en: {
    Главная: "Home",
    "Логические схемы": "Logical Circuits",
    "Конфигуратор опубликованной карты": "Published Map Configurator",
    "Команда проекта": "Project Team",
    "События и смены": "Events and Shifts",
    Документация: "Documentation",
    Прочее: "Other",
    "Социальные сети": "Social Media",
    "TRP RP": "TRP RP",
    "Календарь событий и регистрация на смены":
      "Event Calendar and Shift Registration",
    "Календарь событий": "Event Calendar",
    "Регистрация на смену": "Shift Registration",
    "Следите за расписанием мероприятий и смен проекта TRP RP в реальном времени.":
      "Follow the schedule of TRP RP project events and shifts in real time.",
    "Заполните заявку для участия в смене или её отмены. Заявки обрабатываются в течение 5 рабочих дней.":
      "Fill out the application to participate in a shift or cancel it. Applications are processed within 5 business days.",
    'Контакты проекта "TRP RP"': "TRP RP Project Contacts",
    Discord: "Discord",
    TeamSpeak: "TeamSpeak",
    YouTube: "YouTube",
    TikTok: "TikTok",
    Telegram: "Telegram",
    ВКонтакте: "VKontakte",
    'Юридическая документация проекта "TRP RP"':
      "Legal Documentation of the TRP RP Project",
    "Политика конфиденциальности": "Privacy Policy",
    "Пользовательское соглашение": "Terms of Use",
    'Проект "TRP RP" не является юридическим лицом и не предоставляет никаких услуг!':
      'The "TRP RP" project is not a legal entity and does not provide any services!',
    "© 2026 TRP RP. Все права защищены.": "© 2026 TRP RP. All rights reserved.",
    "← Назад": "← Back",
    "Устав проекта": "Project Charter",
    ПДД: "Traffic Rules",
    "Для сотрудников": "For Employees",
    Маршруты: "Routes",
    "Регламент радиообмена": "Radio Communication Regulations",
    "Инструкция ДТУ и ДТД": "DTU and DTD Instructions",
    "Инструкция ДКС и ДТД": "DKS and DTD Instructions",
    "Инструкция водителей": "Driver Instructions",
    "Для отделов": "For Departments",
    "Директор ГТОП/ТПОХ": "Director GTOP/TPOH",
    КОУП: "KOUP",
    ФАО: "FAO",
    ОБД: "OBD",
    УбЦ: "UbTs",
    Лекции: "Lectures",
    "Запуск троллейбусов": "Trolleybus Launch",
    "Схемы депо и маршрутов": "Depot and Route Schemes",
    Анкеты: "Forms",
    Заявления: "Applications",
    "Экзамен и обучение": "Exam and Training",
    "Отпуск & Больничный": "Vacation & Sick Leave",
    "Увольнение & Восстановление": "Dismissal & Reinstatement",
    "Регистрация & Замена троллейбуса": "Registration & Trolleybus Replacement",
    "Ремонт троллейбусов": "Trolleybus Repair",
    Персонал: "Personnel",
    ЗНГТУ: "ZNGTU",
    "ДТПГО & ДТПоХ": "DTPGO & DTPokH",
    ДТУ: "DTU",
    ДКС: "DKS",
    Тесты: "Tests",
    "Теоретический экзамен": "Theoretical Exam",
    "Подать апелляцию": "Submit Appeal",
    "Регистрация на смену": "Shift Registration",
    "Прочие анкеты": "Other Forms",
    "Редакторы и генераторы": "Editors and Generators",
    "Генератор спавна машин": "Vehicle Spawn Generator",
    "Создание окрасок": "Create Liveries",
    "Редактор маршрутов": "Route Editor",
    Информатор: "Informer",
    Расписание: "Schedule",
    "Трибуна TDW": "TDW Tribune",
    'Правила проекта "TRP RP"': "TRP RP Project Rules",
    "ЧАВО - Частые вопросы": "FAQ - Frequently Asked Questions",
    "Официальная документация": "Official Documentation",
    "Обновления сайта": "Website Updates",
    "База данных": "Database",
    "Список автотранспорта": "Vehicle List",
    Команды: "Commands",
    "Идентификатор работника": "Employee ID",
    "Административный сайт": "Admin Site",
    VK: "VK",
  },
};
Object.assign(translations.ru, {
  "Экзамен и обучение": "Экзамен и обучение",
  "Учебный центр TRP RP": "Учебный центр TRP RP",
  "Проверка до 3 дней": "Проверка до 3 дней",
  "Решение только в Discord": "Решение только в Discord",
  "Учебный центр": "Учебный центр",
  "Discord и Roblox": "Идентификатор и Roblox",
  "Экзамен или обучение": "Экзамен или обучение",
  "Рассмотрение": "Рассмотрение",
  "Решение Учебного центра": "Решение Учебного центра",
  "Подайте заявление на приватный экзамен или углублённое обучение. Данные Roblox, должность и доступные варианты будут определены автоматически после проверки аккаунта Discord.": "Подайте заявление на приватный экзамен или углублённое обучение. Данные Roblox, должность и доступные варианты будут определены автоматически после проверки аккаунта Discord.",
  "Проверка аккаунта": "Проверка аккаунта",
  "Укажите личный идентификатор работника, полученный через бота TRP RP Systems.": "Укажите личный идентификатор работника, полученный через бота TRP RP Systems.",
  "Идентификатор работника": "Идентификатор работника",
  "Введите свой Discord ID на странице получения, подтвердите запрос в личных сообщениях бота и используйте выданный код здесь.": "Введите свой Discord ID на странице получения, подтвердите запрос в личных сообщениях бота и используйте выданный код здесь.",
  "Получить идентификатор работника": "Получить идентификатор работника",
  "Проверить данные": "Проверить данные",
  "Параметры заявления": "Параметры заявления",
  "Выберите формат и заполните доступные для него поля.": "Выберите формат и заполните доступные для него поля.",
  "Выберите заявление": "Выберите заявление",
  "Тип приватного экзамена": "Тип приватного экзамена",
  "Модель троллейбуса": "Модель троллейбуса",
  "Опыт работы в других РП-проектах по TrP": "Опыт работы в других РП-проектах по TrP",
  "Наличие платного контента": "Наличие платного контента",
  "Согласие на обучение": "Согласие на обучение",
  "Отправить заявление": "Отправить заявление"
});
Object.assign(translations.en, {
  "Экзамен и обучение": "Exam and Training",
  "Учебный центр TRP RP": "TRP RP Training Center",
  "Проверка до 3 дней": "Review within 3 days",
  "Решение только в Discord": "Decision only in Discord",
  "Учебный центр": "Training Center",
  "Discord и Roblox": "Identifier and Roblox",
  "Экзамен или обучение": "Exam or training",
  "Рассмотрение": "Review",
  "Решение Учебного центра": "Training Center decision",
  "Подайте заявление на приватный экзамен или углублённое обучение. Данные Roblox, должность и доступные варианты будут определены автоматически после проверки аккаунта Discord.": "Apply for a private exam or in-depth training. Roblox details, position and available options are determined automatically after your Discord account is checked.",
  "Проверка аккаунта": "Account verification",
  "Укажите личный идентификатор работника, полученный через бота TRP RP Systems.": "Enter the personal employee identifier issued by the TRP RP Systems bot.",
  "Идентификатор работника": "Employee identifier",
  "Введите свой Discord ID на странице получения, подтвердите запрос в личных сообщениях бота и используйте выданный код здесь.": "Enter your Discord ID on the identifier page, confirm the request in the bot's direct messages, then use the issued code here.",
  "Получить идентификатор работника": "Get employee identifier",
  "Проверить данные": "Check details",
  "Параметры заявления": "Application details",
  "Выберите формат и заполните доступные для него поля.": "Choose a format and complete the available fields.",
  "Выберите заявление": "Choose an application",
  "Тип приватного экзамена": "Private exam type",
  "Модель троллейбуса": "Trolleybus model",
  "Опыт работы в других РП-проектах по TrP": "Experience in other TrP role-play projects",
  "Наличие платного контента": "Paid content available",
  "Согласие на обучение": "Training consent",
  "Отправить заявление": "Submit application"
});
let originalHTML = null;
function initThemeSystem() {
  applyTheme(localStorage.getItem("theme") || "light");
  const e = document.getElementById("theme-btn");
  e && e.addEventListener("click", handleThemeClick);
}
function applyTheme(e) {
  localStorage.setItem("theme", e);
  const t = document.getElementById("theme-btn");
  "dark" === e
    ? (document.body.classList.add("dark-mode"), t && (t.textContent = "☀️"))
    : (document.body.classList.remove("dark-mode"),
      t && (t.textContent = "🌙"));
}
function handleThemeClick() {
  applyTheme(
    "light" === (localStorage.getItem("theme") || "light") ? "dark" : "light",
  );
}
function initLanguageSystem() {
  originalHTML || (originalHTML = document.body.innerHTML);
  const e = localStorage.getItem("language") || "ru";
  (setLanguage(e),
    updateLangButton(e),
    setupLanguageButton(),
    reinitializeEventListeners(),
    initThemeSystem());
}
function setLanguage(e) {
  function t(n) {
    if (3 === n.nodeType) {
      let t = n.textContent.trim();
      t &&
        translations[e] &&
        translations[e][t] &&
        (n.textContent = n.textContent.replace(t, translations[e][t]));
    } else if (1 === n.nodeType && "SCRIPT" !== n.tagName)
      for (let e = 0; e < n.childNodes.length; e++) t(n.childNodes[e]);
  }
  (localStorage.setItem("language", e),
    (document.documentElement.lang = e),
    (document.body.innerHTML = originalHTML));
  for (let e = 0; e < document.body.childNodes.length; e++)
    t(document.body.childNodes[e]);
  (reinitializeEventListeners(), reinitializeTheme(), initMobileMenu());
}
function updateLangButton(e) {
  const t = document.getElementById("lang-btn");
  t && (t.textContent = "ru" === e ? "EN" : "RU");
}
function setupLanguageButton() {
  const e = document.getElementById("lang-btn");
  if (e) {
    const t = e.cloneNode(!0);
    (e.parentNode.replaceChild(t, e),
      document
        .getElementById("lang-btn")
        .addEventListener("click", function () {
          const e =
            "ru" === (localStorage.getItem("language") || "ru") ? "en" : "ru";
          (setLanguage(e), updateLangButton(e));
        }));
  }
}
function reinitializeEventListeners() {
  (setupLanguageButton(),
    document.querySelectorAll('a[href^="#"]').forEach((e) => {
      e.addEventListener("click", function (e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute("href"));
        t && t.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }),
    initDropdowns(),
    initMobileMenu(),
    queueMicrotask(initTrainingApplicationForm));
}
function reinitializeTheme() {
  applyTheme(localStorage.getItem("theme") || "light");
  const e = document.getElementById("theme-btn");
  (e &&
    (e.removeEventListener("click", handleThemeClick),
    e.addEventListener("click", handleThemeClick)),
    initDropdowns(),
    initMobileMenu());
}
function initMobileMenu() {
  window.TrpSharedMenu &&
    "function" == typeof window.TrpSharedMenu.init &&
    window.TrpSharedMenu.init();
}
function updateNavbar() {
  const e = document.querySelector(".navbar");
  e &&
    (window.scrollY > 50
      ? e.classList.add("scrolled")
      : e.classList.remove("scrolled"));
}
function initDropdowns() {
  window.TrpSharedMenu &&
    "function" == typeof window.TrpSharedMenu.init &&
    window.TrpSharedMenu.init();
}
(window.addEventListener("scroll", updateNavbar),
  document.addEventListener("DOMContentLoaded", updateNavbar),
  updateNavbar(),
  "loading" === document.readyState
    ? document.addEventListener("DOMContentLoaded", () => {
        (initThemeSystem(),
          initLanguageSystem(),
          initMobileMenu(),
          initDropdowns());
      })
    : (initThemeSystem(),
      initLanguageSystem(),
      initMobileMenu(),
      initDropdowns()),
  (() => {
    if (window.__trpPageAnimationsBooted) return;
    window.__trpPageAnimationsBooted = !0;
    const e = "trp-nav-animate",
      t = "trp-hero-block",
      n = "trp-scroll-reveal",
      o = "trp-banner-reveal",
      a = "trp-visible",
      i = [
        ".hero-content h1",
        '[class*="hero-"][class*="content"] h1',
        '[class*="hero"][class*="content"] h1',
        ".database-hero h1",
        ".section-title",
        ".subsection-title",
        ".section-header",
        ".section-header > *",
        ".contacts-section h2",
        ".docs-section h2",
        ".disclaimer",
        ".calendar-card",
        ".form-card",
        ".charter-card",
        ".scheme-card",
        ".faq-item",
        ".update-entry",
        ".table-block",
        ".database-frame-wrap",
        ".local-generator-card",
        ".generator-card",
        ".buttons-container > *",
        ".contact-buttons > *",
        ".docs-buttons > *",
        ".team-grid > *",
        ".winners-grid > *",
      ].join(", "),
      r = new WeakSet(),
      s = new WeakSet();
    let c = null,
      l = 0,
      d = !1;
    function u(e) {
      requestAnimationFrame(() => {
        requestAnimationFrame(e);
      });
    }
    function m(e) {
      if (!e || !e.isConnected || e.hidden) return !0;
      const t = window.getComputedStyle(e);
      return "none" === t.display || "hidden" === t.visibility;
    }
    function h(e) {
      return (
        /^H[1-6]$/.test(e.tagName) ||
        e.classList.contains("section-title") ||
        e.classList.contains("subsection-title") ||
        e.classList.contains("section-header") ||
        e.classList.contains("update-date")
      );
    }
    function g(e) {
      if (
        !e ||
        m(e) ||
        (function (e) {
          return (
            e.classList.contains("reveal") ||
            e.classList.contains("reveal-left") ||
            e.classList.contains("reveal-right") ||
            e.classList.contains("reveal-up") ||
            e.classList.contains("lang-enter") ||
            e.classList.contains("lang-exit") ||
            e.classList.contains(n) ||
            e.classList.contains("animate")
          );
        })(e)
      )
        return !1;
      if (
        e.closest(
          ".navbar, .dropdown-menu, .dropdown-submenu-list, .menu-toggle, footer, .footer, .error-banner, .error-banner-outer",
        )
      )
        return !1;
      const t = e.tagName;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(t)) return !1;
      const o = Array.from(e.classList).join(" ");
      return (
        !/(nav|menu|dropdown|submenu|logo|theme|lang|footer)/i.test(o) &&
        (!(
          !h(e) &&
          !["P", "ARTICLE", "FORM", "TABLE", "UL", "OL", "FIGURE"].includes(t)
        ) ||
          !!e.querySelector("iframe, table, img, video, canvas") ||
          /(card|item|block|entry|wrap|wrapper|panel|table|hero|frame|hint|buttons|form|search|filter|result|preview|update|faq|scheme|list|grid|database)/i.test(
            o,
          ) ||
          (e.textContent || "").trim().length > 60)
      );
    }
    function p(e, t) {
      g(e) &&
        !r.has(e) &&
        (r.add(e),
        e.classList.add(n),
        e.style.setProperty("--trp-stagger", t + "ms"),
        h(e) && e.classList.add("trp-title-reveal"),
        !c &&
          "IntersectionObserver" in window &&
          (c = new IntersectionObserver(
            (e) => {
              e.forEach((e) => {
                e.isIntersecting &&
                  (e.target.classList.add(a), c.unobserve(e.target));
              });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
          )),
        (function (e) {
          const t = e.getBoundingClientRect();
          return (
            (t.top < window.innerHeight - 40 || 0 === t.top) &&
            (u(() => {
              e.classList.add(a);
            }),
            !0)
          );
        })(e) ||
          !c ||
          s.has(e) ||
          (c.observe(e), s.add(e)));
    }
    function f(e) {
      Array.from(e.children).forEach((e, t) => {
        p(e, 70 * t);
      });
    }
    function T(e) {
      if (!e || /hero/i.test(e.className)) return;
      const t = (function (e) {
        return (
          e.querySelector(":scope > .container") ||
          e.querySelector(":scope > .generator-container") ||
          e.querySelector(":scope > .content-container") ||
          e.querySelector(":scope > .table-container") ||
          e.querySelector(":scope > .faq-container") ||
          e
        );
      })(e);
      let n = 0;
      Array.from(t.children).forEach((e) => {
        if (!m(e))
          if (
            e.matches(
              ".contact-buttons, .docs-buttons, .hero-buttons, .buttons-container",
            )
          )
            f(e);
          else {
            if (e.matches(".section-header")) {
              const t = Array.from(
                e.querySelectorAll(
                  ":scope > .section-title, :scope > .subsection-title, :scope > h1, :scope > h2, :scope > h3",
                ),
              );
              if (t.length)
                return (
                  t.forEach((e, t) => {
                    p(e, 60 * (n + t));
                  }),
                  void (n += t.length)
                );
            }
            /(grid|list)/i.test(Array.from(e.classList).join(" ")) &&
            e.children.length > 1
              ? Array.from(e.children).forEach((e, t) => {
                  p(e, 70 * t);
                })
              : g(e) && (p(e, 60 * n), (n += 1));
          }
      });
    }
    function L(e, t, n) {
      if (!e) return;
      let o = e.querySelector(":scope > ." + t);
      (o ||
        ((o = document.createElement("span")),
        (o.className = t),
        e.append(document.createTextNode(" "), o)),
        (o.textContent = n),
        o.setAttribute("aria-hidden", "true"));
    }
    function y(e = document) {
      return Array.from(
        new Set(
          Array.from(e.querySelectorAll(i)).filter(
            (e) =>
              e &&
              e.isConnected &&
              !m(e) &&
              !e.closest(".navbar, footer, .footer"),
          ),
        ),
      );
    }
    function b() {
      ((function () {
        if (
          window.__trpLanguageWrapInstalled ||
          "function" != typeof window.setLanguage
        )
          return;
        const e = window.setLanguage;
        ((window.__trpLanguageWrapInstalled = !0),
          (window.setLanguage = function (t, n = !1) {
            const o =
              window.matchMedia &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (n || !d || o) {
              const n = e.call(this, t, !0);
              return ((d = !0), u(b), n);
            }
            const a = y(document);
            a.forEach((e, t) => {
              (e.classList.remove("lang-enter"),
                (e.style.animationDelay = 30 * t + "ms"),
                e.classList.add("lang-exit"));
            });
            const i = Math.min(30 * a.length + 200, 400);
            window.setTimeout(() => {
              (e.call(this, t, !0),
                "function" == typeof window.updateLangButton &&
                  window.updateLangButton(t),
                u(() => {
                  (y(document).forEach((e, t) => {
                    (e.classList.remove("lang-exit"),
                      (e.style.animationDelay = 45 * t + "ms"),
                      e.classList.add("lang-enter"),
                      e.addEventListener(
                        "animationend",
                        () => {
                          (e.classList.remove("lang-enter"),
                            (e.style.animationDelay = ""));
                        },
                        { once: !0 },
                      ));
                  }),
                    b());
                }));
            }, i);
          }));
      })(),
        document.querySelectorAll(".dropdown-toggle").forEach((e) => {
          L(e, "dropdown-arrow", "▾");
        }),
        document.querySelectorAll(".submenu-toggle").forEach((e) => {
          L(e, "submenu-arrow", "▸");
        }),
        (function () {
          const e = document.getElementById("theme-btn");
          e &&
            "true" !== e.dataset.trpSpinBound &&
            ((e.dataset.trpSpinBound = "true"),
            e.addEventListener("click", () => {
              (e.classList.remove("spinning"),
                e.offsetWidth,
                e.classList.add("spinning"),
                e.addEventListener(
                  "animationend",
                  () => {
                    e.classList.remove("spinning");
                  },
                  { once: !0 },
                ));
            }));
        })(),
        (function () {
          const t = document.querySelector(".navbar");
          !t ||
            t.classList.contains("nav-animate") ||
            t.classList.contains(e) ||
            u(() => {
              t.classList.add(e);
            });
        })(),
        document
          .querySelectorAll(
            '.hero-content, [class*="hero-"][class*="content"], [class*="hero"][class*="content"], .database-hero',
          )
          .forEach((e) => {
            e.classList.contains(t) ||
              e.classList.contains("animate") ||
              (e.classList.add(t),
              Array.from(e.children).forEach((e, t) => {
                e.style.setProperty("--trp-hero-delay", 140 * t + "ms");
              }),
              u(() => {
                e.classList.add("trp-hero-visible");
              }));
          }),
        document
          .querySelectorAll(".error-banner-outer, .error-banner")
          .forEach((e, t) => {
            e.classList.contains(o) ||
              (e.classList.add(o),
              (e.style.transitionDelay = 70 * t + "ms"),
              u(() => {
                e.classList.add(a);
              }));
          }),
        document.querySelectorAll("section").forEach(T),
        document
          .querySelectorAll(
            ".contacts-section h2, .docs-section h2, .disclaimer, .footer p, .section-title, .subsection-title, .section-header, .section-header > *",
          )
          .forEach((e, t) => {
            p(e, 40 * t);
          }),
        document
          .querySelectorAll(".contact-buttons, .docs-buttons")
          .forEach(f));
    }
    function w() {
      (clearTimeout(l), (l = window.setTimeout(b, 60)));
    }
    ("loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", b)
      : b(),
      window.addEventListener("load", b, { once: !0 }),
      window.addEventListener("resize", w),
      document.body &&
        new MutationObserver((e) => {
          e.some((e) => "childList" === e.type) && w();
        }).observe(document.body, { childList: !0, subtree: !0 }));
  })());

const applicationPageCopy = {
  ru: {
    apiMissing: "Форма ещё не подключена к API заявлений.",
    invalidIdentifier: "Укажите корректный идентификатор работника.",
    loading: "Проверяем идентификатор, верификацию и участие в Roblox-группе...",
    profileReady: "Данные подтверждены. Заполните параметры заявления.",
    loadFailed: "Не удалось проверить данные. Повторите попытку позднее.",
    discord: "Аккаунт Discord",
    roblox: "Аккаунт Roblox",
    position: "Должность",
    points: "Доступно поинтов",
    unavailable: "Недоступно",
    noPoints: "Недостаточно поинтов",
    pointsRequired: "Для выбранного экзамена требуется поинтов: ",
    rightsCalculated: "Доступные права рассчитаны по текущему балансу поинтов.",
    pointsSuffix: "поинтов",
    choose: "Выберите вариант",
    submitting: "Отправляем заявление...",
    submitFailed: "Не удалось отправить заявление.",
    submitted: "Заявление отправлено.",
    required: "Заполните все обязательные поля.",
    noneExclusive: "Вариант «Отсутствует» нельзя выбирать вместе с другими вариантами."
  },
  en: {
    apiMissing: "The form is not connected to the application API.",
    invalidIdentifier: "Enter a valid employee identifier.",
    loading: "Checking the identifier, verification and Roblox group membership...",
    profileReady: "Account details confirmed. Complete the application.",
    loadFailed: "Account details could not be checked. Try again later.",
    discord: "Discord account",
    roblox: "Roblox account",
    position: "Position",
    points: "Points available",
    unavailable: "Unavailable",
    noPoints: "Insufficient points",
    pointsRequired: "Points required for this exam: ",
    rightsCalculated: "Available qualifications are calculated from your current points balance.",
    pointsSuffix: "points",
    choose: "Choose an option",
    submitting: "Submitting application...",
    submitFailed: "The application could not be submitted.",
    submitted: "Application submitted.",
    required: "Complete all required fields.",
    noneExclusive: "The “None” option cannot be selected with other options."
  }
};

function initTrainingApplicationForm() {
  const form = document.getElementById("training-application-form");
  if (!form || form.dataset.initialized === "true") return;
  form.dataset.initialized = "true";

  const state = {
    config: null,
    profile: null,
    applicationType: null
  };
  const byId = (id) => document.getElementById(id);
  const lang = () => (localStorage.getItem("language") === "en" ? "en" : "ru");
  const copy = (key) => applicationPageCopy[lang()][key];
  const apiBase = String(window.TRP_TRAINING_APPLICATIONS_API_URL || "").trim();
  const fallbackVehicleExamIds = new Set([
    "trolley_driver_3",
    "trolley_driver_2",
    "trolley_driver_1",
    "driving_licence"
  ]);
  const fallbackDrivingLicenceCosts = {
    ziu_682: 0,
    ziu_6205: 30,
    ziu_682_emu: 50,
    ziu_682_service: 50
  };

  function examRequiresVehicleModel(exam) {
    if (!exam) return false;
    if (typeof exam.requiresVehicleModel === "boolean") return exam.requiresVehicleModel;
    return fallbackVehicleExamIds.has(exam.id);
  }

  function drivingLicenceCost(model) {
    const configured = Number(model?.drivingLicenceRequiredPoints);
    if (Number.isInteger(configured) && configured >= 0) return configured;
    return Number(fallbackDrivingLicenceCosts[model?.id] || 0);
  }

  function showStatus(message, kind = "") {
    const element = byId("application-status");
    const formatted = window.TrpApplicationAccess?.formatMessage(message) || String(message || "");
    element.hidden = false;
    element.className = `application-status ${kind}`.trim();
    element.textContent = formatted;
  }

  function clearStatus() {
    const element = byId("application-status");
    element.hidden = true;
    element.textContent = "";
    element.className = "application-status";
  }

  function updateProgress(stage) {
    const order = ["account", "details", "review"];
    const activeIndex = Math.max(0, order.indexOf(stage));
    document.querySelectorAll("[data-progress-step]").forEach((item) => {
      const itemIndex = order.indexOf(item.dataset.progressStep);
      item.classList.toggle("is-active", itemIndex === activeIndex);
      item.classList.toggle("is-complete", itemIndex < activeIndex);
    });
  }

  function endpoint(parameters) {
    const url = new URL(apiBase);
    Object.entries(parameters).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.toString();
  }

  async function readResponse(response) {
    const payload = await response.json().catch(() => null);
    if (!payload || payload.ok === false) {
      const message = window.TrpApplicationAccess?.formatMessage(payload?.error)
        || payload?.error
        || copy("loadFailed");
      throw new Error(message);
    }
    return payload;
  }

  function profileItem(label, value, href = "") {
    const item = document.createElement("div");
    item.className = "profile-item";
    const caption = document.createElement("small");
    caption.textContent = label;
    const content = document.createElement(href ? "a" : "strong");
    content.textContent = value || "—";
    if (href) {
      content.href = href;
      content.target = "_blank";
      content.rel = "noopener noreferrer";
    }
    item.append(caption, content);
    return item;
  }

  function renderProfile() {
    const summary = byId("profile-summary");
    summary.replaceChildren(
      profileItem(copy("discord"), state.profile.displayName || state.profile.discordUsername),
      profileItem(copy("roblox"), state.profile.robloxUsername, state.profile.robloxProfileUrl),
      profileItem(copy("position"), state.profile.positionLabel),
      profileItem(copy("points"), String(state.profile.points))
    );
    summary.hidden = false;
  }

  function renderApplicationTypes() {
    const root = byId("application-type-options");
    root.replaceChildren();
    state.config.applicationTypes.forEach((entry) => {
      const access = state.config.applicationAccess?.[entry.id];
      const label = document.createElement("label");
      label.className = "segment-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "applicationType";
      input.value = entry.id;
      input.disabled = entry.open === false || access?.allowed === false;
      const box = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = entry.label;
      const description = document.createElement("small");
      description.textContent = input.disabled
        ? `${entry.description} ${access?.reason || entry.closedReason || ""}`.trim()
        : entry.description;
      box.append(title, description);
      label.append(input, box);
      input.addEventListener("change", () => selectApplicationType(entry.id));
      root.append(label);
    });
  }

  function fillSelect(select, entries, placeholder) {
    select.replaceChildren();
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = placeholder;
    select.append(empty);
    entries.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.id;
      option.textContent = entry.label;
      select.append(option);
    });
  }

  function renderExamTypes() {
    byId("exam-type-label").textContent = state.config.privateExam.questions.examType.label;
    byId("vehicle-model-label").textContent = state.config.privateExam.questions.vehicleModel.label;
    const select = byId("exam-type");
    select.replaceChildren();
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = copy("choose");
    select.append(empty);
    const eligible = new Set(state.profile.eligibleExamTypeIds || []);
    state.config.privateExam.examTypes.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.id;
      const enoughPoints = Number(state.profile.points) >= Number(entry.requiredPoints || 0);
      option.disabled = entry.enabled === false || !eligible.has(entry.id) || !enoughPoints;
      const reason = entry.enabled === false || !eligible.has(entry.id)
        ? copy("unavailable")
        : !enoughPoints ? copy("noPoints") : "";
      option.textContent = reason ? `${entry.label} — ${reason}` : entry.label;
      select.append(option);
    });
    select.onchange = renderVehicleModels;
    renderVehicleModels();
  }

  function renderVehicleModels() {
    const examType = byId("exam-type").value;
    const exam = state.config.privateExam.examTypes.find((entry) => entry.id === examType);
    const vehicleField = byId("vehicle-model-field");
    const vehicleSelect = byId("vehicle-model");
    const requiresVehicleModel = examRequiresVehicleModel(exam);
    const isDrivingLicence = exam?.id === "driving_licence";
    byId("vehicle-model-label").textContent = isDrivingLicence
      ? (state.config.privateExam.questions.drivingLicence?.label
        || (lang() === "ru" ? "Выберите водительские права" : "Select a driving qualification"))
      : state.config.privateExam.questions.vehicleModel.label;
    vehicleField.hidden = !requiresVehicleModel;
    vehicleSelect.required = requiresVehicleModel;
    vehicleSelect.disabled = !requiresVehicleModel;
    const models = state.config.privateExam.vehicleModels.filter((entry) => (
      entry.allowedExamTypes.includes("*") || entry.allowedExamTypes.includes(examType)
    ));
    vehicleSelect.replaceChildren();
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = copy("choose");
    vehicleSelect.append(empty);
    if (requiresVehicleModel) {
      models.forEach((entry) => {
        const option = document.createElement("option");
        option.value = entry.id;
        const requiredPoints = drivingLicenceCost(entry);
        option.disabled = isDrivingLicence && Number(state.profile.points) < requiredPoints;
        option.textContent = isDrivingLicence
          ? `${entry.label} — ${requiredPoints} ${copy("pointsSuffix")}${option.disabled ? ` (${copy("noPoints")})` : ""}`
          : entry.label;
        vehicleSelect.append(option);
      });
    }
    byId("points-notice").textContent = isDrivingLicence
      ? copy("rightsCalculated")
      : exam
        ? `${copy("pointsRequired")}${Number(exam.requiredPoints || 0)}`
      : "";
  }

  function renderTrainingQuestions() {
    const questions = state.config.training.questions;
    const root = byId("training-question-fields");
    root.replaceChildren();
    questions.forEach((question) => {
      if (question.type === "short_text") {
        const label = document.createElement("label");
        label.className = "field-group";
        const caption = document.createElement("span");
        caption.textContent = question.label;
        const input = document.createElement("textarea");
        input.rows = 5;
        input.maxLength = Number(question.maxLength || 1000);
        input.required = question.required !== false;
        input.dataset.questionId = question.id;
        input.dataset.questionType = question.type;
        label.append(caption, input);
        root.append(label);
        return;
      }

      if (question.type === "single_select") {
        const label = document.createElement("label");
        label.className = "field-group";
        const caption = document.createElement("span");
        caption.textContent = question.label;
        const select = document.createElement("select");
        select.required = question.required !== false;
        select.dataset.questionId = question.id;
        select.dataset.questionType = question.type;
        fillSelect(select, question.options, copy("choose"));
        label.append(caption, select);
        root.append(label);
        return;
      }

      if (question.type === "multi_select") {
        const fieldset = document.createElement("fieldset");
        fieldset.className = "choice-group";
        fieldset.dataset.questionId = question.id;
        fieldset.dataset.questionType = question.type;
        fieldset.dataset.required = question.required === false ? "false" : "true";
        const legend = document.createElement("legend");
        legend.textContent = question.label;
        const options = document.createElement("div");
        options.className = "checkbox-options";
        question.options.forEach((entry) => {
          const label = document.createElement("label");
          label.className = "checkbox-option";
          const input = document.createElement("input");
          input.type = "checkbox";
          input.value = entry.id;
          input.addEventListener("change", () => {
            const checked = [...options.querySelectorAll('input[type="checkbox"]:checked')];
            if (entry.id === question.exclusiveOptionId && input.checked) {
              checked.filter((item) => item !== input).forEach((item) => { item.checked = false; });
            } else if (input.checked && question.exclusiveOptionId) {
              const exclusive = options.querySelector(`input[value="${question.exclusiveOptionId}"]`);
              if (exclusive) exclusive.checked = false;
            }
          });
          const textNode = document.createElement("span");
          textNode.textContent = entry.label;
          label.append(input, textNode);
          options.append(label);
        });
        fieldset.append(legend, options);
        root.append(fieldset);
        return;
      }

      if (question.type === "consent") {
        const label = document.createElement("label");
        label.className = "consent-control";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.required = question.required !== false;
        input.dataset.questionId = question.id;
        input.dataset.questionType = question.type;
        const content = document.createElement("span");
        const title = document.createElement("strong");
        title.textContent = question.label;
        const description = document.createElement("small");
        description.textContent = question.description || "";
        content.append(title, description);
        label.append(input, content);
        root.append(label);
      }
    });
  }

  function collectTrainingAnswers() {
    const answers = {};
    for (const question of state.config.training.questions) {
      const selector = `[data-question-id="${question.id}"]`;
      const field = byId("training-question-fields").querySelector(selector);
      if (!field) return null;
      if (question.type === "short_text") {
        answers[question.id] = field.value.trim();
        if (question.required !== false && !answers[question.id]) return null;
      } else if (question.type === "single_select") {
        answers[question.id] = field.value;
        if (question.required !== false && !answers[question.id]) return null;
      } else if (question.type === "multi_select") {
        answers[question.id] = [...field.querySelectorAll('input[type="checkbox"]:checked')]
          .map((input) => input.value);
        if (question.required !== false && !answers[question.id].length) return null;
      } else if (question.type === "consent") {
        answers[question.id] = field.checked;
        if (question.required !== false && !answers[question.id]) return null;
      }
    }
    return answers;
  }

  function selectApplicationType(type) {
    state.applicationType = type;
    byId("private-exam-fields").hidden = type !== "private_exam";
    byId("training-fields").hidden = type !== "training";
    byId("submit-application").disabled = false;
    clearStatus();
    updateProgress("details");
    if (type === "private_exam") renderExamTypes();
    if (type === "training") renderTrainingQuestions();
  }

  async function lookupProfile() {
    const workerIdentifier = byId("worker-identifier").value.trim().toUpperCase();
    if (!/^TRP-RP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(workerIdentifier)) {
      showStatus(copy("invalidIdentifier"), "error");
      return;
    }
    if (!apiBase || apiBase.startsWith("PASTE_")) {
      showStatus(copy("apiMissing"), "error");
      return;
    }
    byId("lookup-profile").disabled = true;
    showStatus(copy("loading"));
    updateProgress("account");
    try {
      const [configResult, profileResult] = await Promise.all([
        fetch(
          endpoint({ action: "config", language: lang(), _: Date.now() }),
          { cache: "no-store" }
        ).then(readResponse),
        fetch(
          endpoint({ action: "profile", workerIdentifier, language: lang(), _: Date.now() }),
          { cache: "no-store" }
        ).then(readResponse)
      ]);
      state.config = configResult.config;
      state.profile = profileResult.profile;
      state.config.applicationAccess = state.profile.applicationAccess || state.config.applicationAccess;
      window.TrpApplicationAccess?.render(state.config.applicationAccess);
      renderProfile();
      renderApplicationTypes();
      byId("application-details").hidden = false;
      byId("submit-application").disabled = true;
      showStatus(copy("profileReady"), "success");
      updateProgress("details");
    } catch (error) {
      state.profile = null;
      byId("profile-summary").hidden = true;
      byId("application-details").hidden = true;
      byId("submit-application").disabled = true;
      showStatus(error.message || copy("loadFailed"), "error");
      updateProgress("account");
    } finally {
      byId("lookup-profile").disabled = false;
    }
  }

  async function submitApplication(event) {
    event.preventDefault();
    if (!state.profile || !state.config || !state.applicationType) {
      showStatus(copy("required"), "error");
      return;
    }
    const payload = {
      workerIdentifier: byId("worker-identifier").value.trim().toUpperCase(),
      language: lang(),
      applicationType: state.applicationType
    };
    if (state.applicationType === "private_exam") {
      payload.examType = byId("exam-type").value;
      const exam = state.config.privateExam.examTypes.find((entry) => entry.id === payload.examType);
      if (!payload.examType || !exam) {
        showStatus(copy("required"), "error");
        return;
      }
      if (examRequiresVehicleModel(exam)) {
        payload.vehicleModel = byId("vehicle-model").value;
        if (!payload.vehicleModel) {
          showStatus(copy("required"), "error");
          return;
        }
      }
    } else {
      payload.answers = collectTrainingAnswers();
      if (!payload.answers) {
        showStatus(copy("required"), "error");
        return;
      }
    }

    byId("submit-application").disabled = true;
    showStatus(copy("submitting"));
    try {
      const body = new URLSearchParams({ payload: JSON.stringify(payload) });
      const result = await fetch(apiBase, { method: "POST", body }).then(readResponse);
      showStatus(result.message || copy("submitted"), "success");
      [...form.elements].forEach((element) => { element.disabled = true; });
      updateProgress("review");
    } catch (error) {
      showStatus(error.message || copy("submitFailed"), "error");
      byId("submit-application").disabled = false;
      updateProgress("details");
    }
  }

  byId("lookup-profile").addEventListener("click", lookupProfile);
  const identifierInput = byId("worker-identifier");
  window.TrpInstallNavigation?.bindWorkerIdentifierStorage(identifierInput);
  const identifierToggle = byId("toggle-worker-identifier");
  const updateIdentifierVisibility = (visible) => {
    identifierInput.type = visible ? "text" : "password";
    identifierToggle.setAttribute("aria-pressed", String(visible));
    const label = lang() === "en"
      ? (visible ? "Hide identifier" : "Show identifier")
      : (visible ? "Скрыть идентификатор" : "Показать идентификатор");
    identifierToggle.setAttribute("aria-label", label);
    identifierToggle.title = label;
  };
  identifierToggle.addEventListener("click", () => {
    updateIdentifierVisibility(identifierInput.type === "password");
    identifierInput.focus();
  });
  updateIdentifierVisibility(false);
  byId("worker-identifier").addEventListener("input", (event) => {
    event.target.value = event.target.value.toUpperCase().replace(/\s+/g, "");
    state.profile = null;
    state.applicationType = null;
    byId("profile-summary").hidden = true;
    byId("application-details").hidden = true;
    byId("submit-application").disabled = true;
    clearStatus();
    updateProgress("account");
  });
  form.addEventListener("submit", submitApplication);
  updateProgress("account");
}
