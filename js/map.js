'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var fieldsetForm = window.global.form.querySelectorAll('fieldset');
  var fieldsetFilters = filters.querySelectorAll('fieldset');
  var selectFilters = filters.querySelectorAll('select');

  // добавляем атрибут disabled к полям формы
  window.util.addAttribute(fieldsetForm, 'disabled', 'disabled');

  // добавляем атрибут disabled к полям фильтра
  window.util.addAttribute(fieldsetFilters, 'disabled', 'disabled');
  window.util.addAttribute(selectFilters, 'disabled', 'disabled');

  window.map = {
    // функция активации страницы, в которой:
    // убираем класс 'map--faded' у катры
    // отрисовываем метки, которые будут описывать похожие объявления неподалёку
    // убираем класс 'ad-form--disabled' у формы
    // убираем класс 'ad-form--disabled' у фильтра
    // убираем аттрибут disabled у элементов формы и фильтра
    setActivePage: function () {
      window.global.map.classList.remove('map--faded');
      window.pin.addPinsData();
      window.global.form.classList.remove('ad-form--disabled');
      filters.classList.remove('ad-form--disabled');
      window.util.deleteAttribute(fieldsetForm, 'disabled', 'null');
      window.util.deleteAttribute(fieldsetFilters, 'disabled', 'null');
      window.util.deleteAttribute(selectFilters, 'disabled', 'null');
    },

    // записываем координаты главной метки в поле адреса формы
    setPinCoordinates: function (pin) {
      window.global.inputAddress.value = pin.x + ', ' + pin.y;
    }
  };

  // активируем страницу и вписываем адрес главной метки в форму
  window.global.pinMain.addEventListener('click', function () {
    window.map.setActivePage();
    window.map.setPinCoordinates(window.pinMainLocation);
  });
})();
