window.TRP_SITE_ANNOUNCEMENTS = [
  // UTC window for any announcement:
  // startsAtUtc: "",
  // endsAtUtc: "",
  // Friendly format: "2026-03-26 18:30"
  // Empty startsAtUtc -> publish immediately.
  // Empty endsAtUtc -> do not hide automatically.
  {
    id: "beta-testing-notice",
    enabled: true,
    type: "warning",
    paths: "all",
    collapsible: true,
    startCollapsed: false,
    startsAtUtc: "",
    endsAtUtc: "2026-04-09 23:00",
    title: {
      ru: "Бета-тестирование сайта",
      en: "Website beta testing",
    },
    body: {
      ru: "<p>Сайт находится на стадии бета-тестирования. Публикация ресурса запланирована не позднее 10.04.2026.</p><p>По всем вопросам, замечаниям и предложениям просьба обращаться к <strong>novogrey</strong>.</p>",
      en: "<p>The website is currently in beta testing. Publication of the resource is scheduled no later than April 10, 2026.</p><p>For all questions, feedback, and suggestions, please contact <strong>novogrey</strong>.</p>",
    },
  },
  {
    id: "navigation-testing-task",
    enabled: true,
    type: "info",
    paths: "all",
    collapsible: true,
    startCollapsed: false,
    startsAtUtc: "",
    endsAtUtc: "2026-03-29 23:59",
    title: {
      ru: "Проверка функциональности редакторов",
      en: "Editor functionality review",
    },
    body: {
      ru: "<p>Уважаемые тестировщики, необходимо провести проверку функциональности редакторов и генераторов, размещённых на сайте.</p><p>В рамках проверки требуется:</p><ul><li>открыть каждый редактор и убедиться, что страница загружается корректно без критических ошибок интерфейса;</li><li>проверить работу основных элементов управления: полей ввода, переключателей, кнопок генерации, копирования, загрузки и очистки, если они предусмотрены на странице;</li><li>убедиться, что результат работы редактора формируется корректно и отображается в ожидаемом формате;</li><li>проверить, что навигация, смена темы и переключение языка не нарушают работу редактора.</li></ul><p>Обо всех выявленных ошибках, некорректных состояниях и визуальных сбоях необходимо сообщать в установленном порядке. При отсутствии замечаний также требуется направить подтверждение об успешном завершении проверки.</p>",
      en: "<p>Dear testers, please complete a review of the functionality of the editors and generators published on the website.</p><p>The review should include the following:</p><ul><li>open each editor and confirm that the page loads correctly without critical interface errors;</li><li>check the main controls, including input fields, switches, generate, copy, load, and clear actions where available;</li><li>verify that the editor output is generated correctly and displayed in the expected format;</li><li>confirm that navigation, theme switching, and language switching do not interfere with the editor workflow.</li></ul><p>All identified defects, incorrect states, and visual issues must be reported through the established process. If no issues are found, please also submit a confirmation that the review has been completed successfully.</p>",
    },
  },
  {
    id: "english-navigation-visual-review",
    enabled: true,
    type: "info",
    paths: "all",
    collapsible: true,
    startCollapsed: false,
    startsAtUtc: "2026-03-30 00:00",
    endsAtUtc: "2026-04-05 23:59",
    title: {
      ru: "Визуальная проверка английских переводов",
      en: "Visual review of English translations",
    },
    body: {
      ru: "<p>Необходимо провести отдельную визуальную проверку английских переводов элементов навигационного меню на всех страницах сайта.</p><p>В рамках проверки требуется:</p><ul><li>переключить сайт на английский язык и открыть все страницы с основным навигационным меню;</li><li>убедиться, что названия разделов, выпадающих списков и вложенных пунктов меню совпадают между страницами и не отличаются по формулировкам;</li><li>проверить, что длина английских названий не ломает структуру меню и не вызывает визуальных смещений;</li><li>зафиксировать все случаи несовпадения переводов, обрезки текста или визуальных дефектов.</li></ul><p>По итогам проверки необходимо направить отчёт о найденных несоответствиях либо подтверждение, что английские переводы в навигационном меню отображаются единообразно на всех страницах.</p>",
      en: "<p>A separate visual review of the English translations used in the navigation menu must be completed across all website pages.</p><p>The review should include the following:</p><ul><li>switch the website to English and open all pages that use the main navigation menu;</li><li>confirm that section names, dropdown items, and nested menu labels are consistent across pages and do not vary in wording;</li><li>verify that the English labels do not break the menu layout or cause visual misalignment;</li><li>record all cases of inconsistent wording, truncated text, or visual defects.</li></ul><p>After the review, please submit either a report describing all detected inconsistencies or a confirmation that the English navigation translations are displayed consistently on all pages.</p>",
    },
  },
  {
    id: "confidentiality-violation-warning",
    enabled: true,
    type: "danger",
    paths: "all",
    collapsible: true,
    startCollapsed: false,
    startsAtUtc: "",
    endsAtUtc: "2026-04-09 23:00",
    title: {
      ru: "Важное уведомление",
      en: "Important notice",
    },
    body: {
      ru: "<p>Любое несанкционированное распространение информации, передача ссылок, публикация скриншотов или кража скриптов расценивается как грубое нарушение внутренних правил.</p><p>Данные действия повлекут за собой перманентную блокировку без дополнительных предупреждений.</p>",
      en: "<p>Any unauthorized disclosure of information, distribution of links, publication of screenshots, or theft of scripts is considered a serious violation of internal rules.</p><p>Such actions will result in a permanent ban without additional warnings.</p>",
    },
  },
];
