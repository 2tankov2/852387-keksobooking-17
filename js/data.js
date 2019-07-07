'use strict';

// создаём массив, состоящий из 8 сгенерированных JS объектов,
// которые будут описывать похожие объявления неподалёку
(function () {
  var getData = function (count) {
    var newArray = [];
    var types = ['palace', 'flat', 'house', 'bungalo'];

    for (var i = 1; i <= count; i++) {
      var pinData = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          type: types[window.util.random(0, types.length)]
        },
        location: {
          x: window.util.random(window.global.PIN_WIDTH / 2, window.global.widthMap - window.global.PIN_WIDTH / 2),
          y: window.util.random(130, 630)
        },
      };
      newArray[i - 1] = pinData;
    }

    return newArray;
  };

  window.pinsData = getData(8);
})();
