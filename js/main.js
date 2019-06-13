'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var widthMap = document.querySelector('.map').offsetWidth;

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getData = function (count) {
  var newArray = [];

  var types = ['palace', 'flat', 'house', 'bungalo'];

  for (var i = 1; i <= count; i++) {
    var pinData = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: types[random(0, types.length)]
      },
      location: {
        x: random(PIN_WIDTH / 2, widthMap - PIN_WIDTH / 2),
        y: random(130, 630)
      },
    };
    newArray[i - 1] = pinData;
  }
  return newArray;
};

var pinsData = getData(8);

var pinsList = document.querySelector('.map__pins');


var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.firstChild.src = pin.author.avatar;
  pinElement.alt = 'заголовок объявления';
  return pinElement;
};

for (var i = 0; i < pinsData.length; i++) {
  pinsList.appendChild(createPin(pinsData[i]));
}

