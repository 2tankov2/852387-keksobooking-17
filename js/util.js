'use strict';

(function () {
  window.util = {
    random: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    // функция добавления аттрибута
    addAttribute: function (elements, atr, value) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute(atr, value);
      }
    },

    // функция удаления аттрибута
    deleteAttribute: function (elements, atr, value) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute(atr, value);
      }
    }
  };
})();
