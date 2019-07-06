'use strict';

(function () {

  window.map = {
  // ширина карты
    widthMap: document.querySelector('.map').offsetWidth,

    pinMain: document.querySelector('.map__pin--main'),
    inputAddress: document.querySelector('#address'),

    // создаём DOM-элементы, соответствующие меткам на карте,
    // и заполняем их данными из массива
    pinsList: document.querySelector('.map__pins'),
    pinTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),

    // отрисовка сгенерированных DOM-элементов в блок .map__pins
    addPinsData: function () {

      for (var i = 0; i < window.pinsData.length; i++) {
        window.pinsList.appendChild(window.pin.createPin(window.pin.pinsData[i]));
      }
    },

    // сохраняем координаты главной метки в объект
    pinMainLocation: {
      x: window.pinMain.getBoundingClientRect().left + window.PINMAIN_WIDTH / 2,
      y: window.pinMain.getBoundingClientRect().top + window.PINMAIN_HEIGHT
    }
  };

  // АКТИВИРУЕМ КАРТУ И ФОРМУ С ФИЛЬТРАМИ

  // находим и сохраняем объекты, которые понадобятся (с которыми будем работать)
  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var fieldsetForm = window.form.querySelectorAll('fieldset');
  var fieldsetFilters = filters.querySelectorAll('fieldset');
  var selectFilters = filters.querySelectorAll('select');

  // добавляем атрибут disabled к полям формы
  window.util.addAttribute(fieldsetForm, 'disabled', 'disabled');

  // добавляем атрибут disabled к полям фильтра
  window.util.addAttribute(fieldsetFilters, 'disabled', 'disabled');
  window.util.addAttribute(selectFilters, 'disabled', 'disabled');

  // функция активации страницы, в которой:
  // убираем класс 'map--faded' у катры
  // отрисовываем метки, которые будут описывать похожие объявления неподалёку
  // убираем класс 'ad-form--disabled' у формы
  // убираем класс 'ad-form--disabled' у фильтра
  // убираем аттрибут disabled у элементов формы и фильтра
  var setActivePage = function () {
    map.classList.remove('map--faded');
    window.addPinsData();
    window.form.classList.remove('ad-form--disabled');
    filters.classList.remove('ad-form--disabled');
    window.util.deleteAttribute(fieldsetForm, 'disabled', 'null');
    window.util.deleteAttribute(fieldsetFilters, 'disabled', 'null');
    window.util.deleteAttribute(selectFilters, 'disabled', 'null');
  };

  // записываем координаты главной метки в поле адреса формы
  var setPinCoordinates = function (pin) {
    window.map.inputAddress.value = pin.x + ', ' + pin.y;
  };

  // активируем страницу и вписываем адрес главной метки в форму
  window.map.pinMain.addEventListener('click', function () {
    setActivePage();
    setPinCoordinates(window.pinMainLocation);
  });

})();
