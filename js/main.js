'use strict';

var getData = function (count) {
  var newArray = [];

  var types = ['palace', 'flat', 'house', 'bungalo'];

  var random = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  for (var i = 0; i <= count - 1; i++) {

    var item = {
      autor: {
        avatar: `img/avatars/user0${i++}.png`
      },
      offer: {
        type: types[random(0, types.length)]
      },
      location: {
        x: random(300, 900),
        y: random(130, 630)
      },
    };

    newArray[i] = item;

  } return newArray;
};

var declarationData = getData(8);

var pinsList = document.querySelector('.map__pins');
console.log(pinsList);

var pinTemplate = document.querySelector('#pin').content;
var newPinTemplate = pinTemplate.querySelector('.map__pin');


for (var i = 0; i < declarationData.length; i++) {
  var pinElement = newPinTemplate.cloneNode(true);
  pinElement.style = `left: ${declarationData.location.x}px; top: ${declarationData.location.y}px;`;
  pinElement.img.src = declarationData.autor.avatar;
  pinElement.alt = "заголовок объявления";

  pinsList.appendChild(pinElement);
};


