'use strict';

window.global = {
  // размеры меток
  PIN_WIDTH: 50,
  PIN_HEIGHT: 70,

  // размеры главной метки
  PINMAIN_WIDTH: 65,
  PINMAIN_HEIGHT: 87,

  // ширина карты
  widthMap: document.querySelector('.map').offsetWidth,

  pinsList: document.querySelector('.map__pins'),
  pinTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),

  pinMain: document.querySelector('.map__pin--main'),
  map: document.querySelector('.map'),
  form: document.querySelector('.ad-form'),
  inputAddress: document.querySelector('#address')
};

