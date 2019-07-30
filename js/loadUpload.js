'use strict';

(function () {
  var TIME_OUT = 10000;
  var CODE_SUCSESS = 200;
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplate.cloneNode(true);
  var blockMain = document.querySelector('main');
  // Скрывает сообщение об успешной отправке данных
  var successMessageHide = function () {
    blockMain.removeChild(successElement);
  };
  // Обработчики событий при успешной отправке данных
  var onSuccessKeyDown = function (evt) {
    if (evt.keyCode === 27) {
      successMessageHide();
      window.form.resetForm();
    }
  };
  var onSuccessMessageClick = function () {
    successMessageHide();
    window.form.resetForm();
  };

  // Путь на сервер
  var URL = 'https://js.dump.academy/keksobooking';
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
  window.loadUpload = {
    load: function (onSuccess, onError) {
      var xhr = createRequest(onSuccess, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = createRequest(onSuccess, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },
    onErrorLoad: function () {
      // Элемент DOM-дерева для вывода сообщений об ошибках
      blockMain.appendChild(errorElement);
    },
    onSuccessMessage: function () {
      document.addEventListener('keydown', onSuccessKeyDown);
      successElement.addEventListener('click', onSuccessMessageClick);
      // Элемент DOM-дерева для вывода сообщений об успешной отправке формы
      blockMain.appendChild(successElement);
    }
  };
})();
