'use strict';

(function () {
  var INTERVAL = 500;
  var lastTimeout;
  window.debounce = function (callBack) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callBack, INTERVAL);
  };
})();
