'use strict';

// сохраняем координаты главной метки в объект
window.pinMainLocation = {
  x: window.global.pinMain.getBoundingClientRect().left + window.global.PINMAIN_WIDTH / 2,
  y: window.global.pinMain.getBoundingClientRect().top + window.global.PINMAIN_HEIGHT
};

(function () {
// ПЕРЕТАСКИВАНИЕ ГЛАВНОЙ МЕТКИ

// var pinMain = document.querySelector('.map__pin--main'); - главная марка определена выше
// максимально допустимые размеры карты
  var locationMap = {
    min: {
      x: 0,
      y: 130
    },
    max: {
      x: window.global.widthMap - window.global.PINMAIN_WIDTH,
      y: 630
    }
  };

  // функции определения позиции метки в пределах карты
  var getPosition = function (coordinate, shift, minValue, maxVaue) {
    if ((coordinate - shift) < minValue) {
      return minValue + 'px';
    } else if ((coordinate - shift) > maxVaue) {
      return maxVaue + 'px';
    }

    return (coordinate - shift) + 'px';
  };


  // обработаем событие начала перетаскивания нашей главной метки mousedown
  window.global.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // запомним начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // нажатие на главную метку — это активация страницы без перемещения
    // мутки, а если мы нажали и начали двигать курсор, то действие
    // активации страницы надо отменить
    var dragged = false;

    // При каждом движении мыши нам нужно обновлять смещение относительно первоначальной
    // точки, чтобы метка смещалась на необходимую величину.
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = { // разница смещения
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = { // записываем новые координаты
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pinMainLocation = startCoords;

      window.global.pinMain.style.left = getPosition(window.global.pinMain.offsetLeft, shift.x, locationMap.min.x, locationMap.max.x);
      window.global.pinMain.style.top = getPosition(window.global.pinMain.offsetTop, shift.y, locationMap.min.y, locationMap.max.y);
    };

    // При отпускании кнопки мыши нужно переставать слушать события движения мыши.
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // при отпускании мыши мы повесим обработчик на click,
      // который отменит действие по умолчанию, если перемещение
      // имело место
      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();

          window.global.pinMain.removeEventListener('click', onClickPreventDefault);
        };

        window.global.pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    // обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
