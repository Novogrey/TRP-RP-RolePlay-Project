(function () {
  'use strict';

  if (typeof translations === 'undefined') return;

  const entries = {
    'Изменения от 14.07.2026': 'Changes from 14.07.2026',
    'В навигационное меню добавлена ссылка «Добавить бота», которая открывает страницу установки TRP RP Systems.': 'An “Add bot” link that opens the TRP RP Systems installation page has been added to the navigation menu.',
    'Добавлена установка приложения на сервер Discord и в аккаунт пользователя с возвратом на информационную страницу после подтверждения.': 'The app can now be installed to a Discord server or user account, with a return to the information page after confirmation.',
    'На странице установки опубликованы сведения о доступных командах и анимированная демонстрация редакторов.': 'The installation page now includes information about the available commands and an animated editor demonstration.',
    'Навигационное меню и нижняя часть страницы установки приведены к общему оформлению главной страницы.': 'The installation page navigation and footer now match the main page.',
    'Из раздела «Прочее» удалены ссылки для голосования за Core и TRP RP.': 'The Core and TRP RP voting links have been removed from the Other menu.'
  };

  for (const [russian, english] of Object.entries(entries)) {
    translations.ru[russian] = russian;
    translations.en[russian] = english;
  }
}());
