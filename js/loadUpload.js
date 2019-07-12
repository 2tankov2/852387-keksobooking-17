'use strict';

(function () {
  var TIME_OUT = 10000;
  var CODE_SUCSESS = 200;
  // Путь на сервер
  var URL = 'https://js.dump.academy/keksobooking';
  // Элемент DOM-дерева для вывода сообщений об ошибках
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);
  var blockMain = document.querySelector('.main');
  // Функция создания запроса к серверу
  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    // Событие окончания загрузки
    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCSESS) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    // Обработка ошибки во время загрузки
    xhr.addEventListener('error', function () {
      onError();
    });
    // Обработка слишком долгого ожидания загрузки
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.timeout = TIME_OUT;

    return xhr;
  };
  // Функции обмена данными с сервером, экспортируемые из модуля
  window.loadUpLoad = {
    load: function (onSuccess, onErrorLoad) {
      var xhr = createRequest(onSuccess, onErrorLoad);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = createRequest(onSuccess, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },
    // Ошибка загрузки данных - выводим сообщение для пользователя
    onError: function () {
      blockMain.appendChild(errorElement);
    },
    // Убираем ошибку
    removeError: function () {
      blockMain.removeChild(errorElement);
    }
  };
})();
