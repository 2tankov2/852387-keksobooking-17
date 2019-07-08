'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess();
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
