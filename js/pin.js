'use strict';

(function () {
  // размеры меток
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  // метка на карте - шаблон
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // координаты учитывая смещение из-за размера меток
  var pinCoordX = function (x) {
    return (x - PIN_WIDTH / 2) + 'px';
  };
  var pinCoordY = function (y) {
    return (y - PIN_HEIGHT) + 'px';
  };
  // функция формирования метки
  window.pin = {
    render: function (pinData, i) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImgElement = pinElement.querySelector('img');

      pinElement.style.left = pinCoordX(pinData.location.x);
      pinElement.style.top = pinCoordY(pinData.location.y);
      pinElement.alt = 'заголовок объявления';
      pinImgElement.src = pinData.author.avatar;
      pinImgElement.title = pinData.offer.title;
      pinElement.dataset.numPin = i;
      this.appendChild(pinElement);
      return this;
    }
  };
})();
