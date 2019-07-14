'use strict';

(function () {
  // размеры главной метки
  var PINMAIN_WIDTH = 65;
  var PINMAIN_HEIGHT = 87;
  // ширина карты
  var widthMap = document.querySelector('.map').offsetWidth;
  // метка в центре карты
  var pinMain = document.querySelector('.map__pin--main');
  // сохраняем координаты главной метки в объект
  var pinMainLocation = {
    x: pinMain.getBoundingClientRect().left + PINMAIN_WIDTH / 2,
    y: pinMain.getBoundingClientRect().top + PINMAIN_HEIGHT
  };
  // максимально допустимые размеры карты
  var locationMap = {
    min: {
      x: 0,
      y: 130
    },
    max: {
      x: widthMap - PINMAIN_WIDTH,
      y: 630
    }
  };
  // функции определения позиции метки в пределах карты
  var getPosition = function (coordinate, shift, minValue, maxVaue) {
    if ((coordinate - shift) < minValue) {
      return minValue + 'px';
    }

    if ((coordinate - shift) > maxVaue) {
      return maxVaue + 'px';
    }

    return (coordinate - shift) + 'px';
  };
  // обработаем событие начала перетаскивания нашей главной метки mousedown
  var onPinMainMousedown = function (evt) {
    evt.preventDefault();
    // запомним начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // отслеживаем перемещение мыши
    document.addEventListener('moveEvt', onMouseMove);
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = { // разница смещения
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = { // записываем новые координаты
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      pinMainLocation = startCoords;
      pinMain.style.left = getPosition(pinMain.offsetLeft, shift.x, locationMap.min.x, locationMap.max.x);
      pinMain.style.top = getPosition(pinMain.offsetTop, shift.y, locationMap.min.y, locationMap.max.y);
    };
    // убираем слежение за событиями при отпускании мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setPinCoordinates();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    // обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  // перетаскиваем главную метку
  pinMain.addEventListener('mousedown', onPinMainMousedown);
  // экспортируем координаты для ввода адреса в форму
  window.coordsPinMain = {
    pinGlobal: pinMain,
    getCoords: function () {
      return Math.round(pinMainLocation.x) + ', ' + Math.round(pinMainLocation.y + pageXOffset);
    }
  };
})();
