'use strict';

(function () {

  window.pin = {

  // создаём DOM-элементы, соответствующие меткам на карте,
  // и заполняем их данными из массива
    createPin: function (pin) {
      var pinElement = window.global.pinTemplate.cloneNode(true);
      pinElement.style = 'left: ' + (pin.location.x - window.global.PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - window.global.PIN_HEIGHT) + 'px;';
      pinElement.firstChild.src = pin.author.avatar;
      pinElement.alt = 'заголовок объявления';

      return pinElement;
    }
  };
})();
