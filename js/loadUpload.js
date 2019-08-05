'use strict';

(function () {
  var TIME_OUT = 10000;
  var CODE_SUCCESS = 200;
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);
  var buttonErrorElement = errorElement.querySelector('.error__button');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplate.cloneNode(true);
  var blockMain = document.querySelector('main');
  // Скрывает страницу сообщени
  var hide = function (element) {
    blockMain.removeChild(element);
  };
  // функции для бработки событий при ошибке
  var onErrorKeyDown = function (evt) {
    if (evt.keyCode === 27) {
      hide(errorElement);
      window.map.setDeactivatePage();
    }
  };
  var onErrorMessageClick = function () {
    hide(errorElement);
    window.map.setDeactivatePage();
  };
  var onButtonClick = function (evt) {
    evt.preventDefault();
    hide(errorElement);
    window.map.setDeactivatePage();
  };
  // функции для обработки событий при успешной отправке данных
  var onSuccessKeyDown = function (evt) {
    if (evt.keyCode === 27) {
      hide(successElement);
      window.map.setDeactivatePage();
    }
  };
  var onSuccessMessageClick = function () {
    hide(successElement);
    window.map.setDeactivatePage();
  };

  // Путь на сервер
  var URL = 'https://js.dump.academy/keksobooking';
  // Функция создания запроса к серверу
  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    // Событие окончания загрузки
    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
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
      // Элемент DOM-дерева для вывода сообщений об успешной отправке формы
      blockMain.appendChild(successElement);
    },
    removeMessage: function () {
      document.addEventListener('keydown', onErrorKeyDown);
      errorElement.addEventListener('click', onErrorMessageClick);
      buttonErrorElement.addEventListener('click', onButtonClick);
      document.addEventListener('keydown', onSuccessKeyDown);
      successElement.addEventListener('click', onSuccessMessageClick);
    }
  };
})();
