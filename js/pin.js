'use strict';

(function () {
  // создаём DOM-элементы, соответствующие меткам на карте,
  // и заполняем их данными из массива
  var createPin = function (pin) {
    var pinElement = window.global.pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + (pin.location.x - window.global.PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - window.global.PIN_HEIGHT) + 'px;';
    pinElement.firstChild.src = pin.author.avatar;
    pinElement.alt = 'заголовок объявления';
    pinElement.title = pin.offer.title;

    return pinElement;
  };

  window.pin = {
    // отрисовка DOM-элементов в блок .map__pins с данными сервера
    addPinsData: function () {
      var successHandler = (function (pinsData) {
        for (var i = 0; i < pinsData.length; i++) {
          window.global.pinsList.appendChild(createPin(pinsData[i]));
        }
      });

      var errorHandler = function () {
        var errorTemplate = document.querySelector('#error').content.querySelector('.error');
        var errorElement = errorTemplate.cloneNode(true);

        window.global.blockMain.appendChild(errorElement);
      };

      window.load(successHandler, errorHandler);
    }
  };
})();
