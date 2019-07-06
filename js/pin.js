'use strict';

(function () {

  window.pin = {

  // размеры меток
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,

    // создаём DOM-элементы, соответствующие меткам на карте,
    // и заполняем их данными из массива
    pinsList: document.querySelector('.map__pins'),
    pinTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),

    createPin: function (pin) {
      var pinElement = window.pinTemplate.cloneNode(true);
      pinElement.style = 'left: ' + (pin.location.x - window.PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - window.PIN_HEIGHT) + 'px;';
      pinElement.firstChild.src = pin.author.avatar;
      pinElement.alt = 'заголовок объявления';

      return pinElement;
    }
  };
})();
