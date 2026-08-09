(function (root, factory) {
  const catalog = factory();
  if (typeof module === 'object' && module.exports) module.exports = catalog;
  if (root) {
    root.TrpVehicleCatalog = catalog;
    root.TRP_VEHICLE_LIVERIES = catalog.liveries;
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const slots = Array.from({ length: 15 }, (_, index) => `Slot_${index + 1}`);
  const models = Object.freeze([
    'ZiU-682 (ZiU-9)',
    'ZiU-6205 (ZiU-10)',
    'ZiU-682 (ZiU-9) EMU',
    'ZiU-682 (ZiU-9) Service vehicle',
    '(TrP Classic port) Tatra T6B5 (T3M)',
    '(TrP Classic port) Tatra T6B5 (T3M) EMU',
    'Boat',
    'VAZ-2109 Sputnik',
    '(NonRP) Tow Scooter',
    '(NonRP) Tow ScooterHeavy',
    '(EmptyBase) Monorail'
  ]);
  const liveries = Object.freeze({
    'ZiU-682 (ZiU-9)': Object.freeze([
      'AdLivery1', 'AdLivery3', 'AdLivery4', 'Athens', 'Bogota', 'Budapest', 'Cheboksary',
      'Chisinau', 'Green', 'Kharkiv', 'Minsk1', 'Minsk2', 'Moscow', 'Moscow oblast',
      'Mykolaiv', 'Odessa', 'OldStyle1', 'OldStyle2', 'Orange', 'Red and beige',
      'Saint Petersburg', 'White', 'White and blue', 'White and green', 'Yellow',
      'Zhytomyr1', 'Zhytomyr2', 'Zhytomyr3', 'Zhytomyr4', ...slots
    ]),
    'ZiU-6205 (ZiU-10)': Object.freeze([
      'AdLivery4', 'Athens', 'Bogota', 'Budapest', 'Cheboksary', 'Chisinau', 'Green',
      'Kharkiv', 'Minsk1', 'Minsk2', 'Moscow', 'Moscow oblast', 'Mykolaiv', 'Odessa',
      'OldStyle1', 'OldStyle2', 'Orange', 'Red and beige', 'Saint Petersburg', 'White',
      'White and blue', 'White and green', 'Yellow', 'Zhytomyr1', 'Zhytomyr2',
      'Zhytomyr3', 'Zhytomyr4', ...slots
    ]),
    'ZiU-682 (ZiU-9) EMU': Object.freeze([
      'AdLivery1', 'AdLivery3', 'AdLivery4', 'Athens', 'Bogota', 'Budapest', 'Cheboksary',
      'Chisinau', 'Green', 'Kazan', 'Kharkiv', 'Minsk1', 'Minsk2', 'Moscow',
      'Moscow oblast', 'Mykolaiv', 'Odessa', 'OldStyle1', 'OldStyle2', 'Orange',
      'Red and beige', 'Saint Petersburg', 'White', 'White and blue', 'White and green',
      'Yellow', 'Zhytomyr1', 'Zhytomyr2', 'Zhytomyr3', 'Zhytomyr4', ...slots
    ]),
    'ZiU-682 (ZiU-9) Service vehicle': Object.freeze([
      'Service1', 'Service2', 'Service3', ...slots
    ])
  });

  function editorModel(model) {
    const value = String(model || '').toLocaleLowerCase('ru-RU').replace(/ё/g, 'е');
    if (/service|техническ|техпомощ/.test(value)) return 'ZiU-682 (ZiU-9) Service vehicle';
    if (/emu|сме/.test(value)) return 'ZiU-682 (ZiU-9) EMU';
    if (/6205|ziu-?10|зиу-?10/.test(value)) return 'ZiU-6205 (ZiU-10)';
    if (/682|ziu-?9|зиу-?9/.test(value)) return 'ZiU-682 (ZiU-9)';
    return '';
  }

  function getLiveries(model) {
    const key = Object.prototype.hasOwnProperty.call(liveries, model) ? model : editorModel(model);
    return key ? [...(liveries[key] || [])] : [];
  }

  function getModels() {
    return [...models];
  }

  return Object.freeze({ models, liveries, editorModel, getLiveries, getModels });
}));
