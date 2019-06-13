'use strict';

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getData = function (count) {
  var newArray = [];

  var types = ['palace', 'flat', 'house', 'bungalo'];

  for (var i = 1; i <= count - 1; i++) {
    var pinData = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: types[random(0, types.length)]
      },
      location: {
        x: random(300, 900),
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

var createPin = function () {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pinsData[i].location.x + 'px; top: ' + pinsData[i].location.y + 'px;';
  pinElement.firstChild.src = pinsData[i].author.avatar;
  pinElement.alt = 'заголовок объявления';
};

for (var i = 0; i < pinsData.length; i++) {
  pinsList.appendChild(createPin(pinsData[i]));
}
