'use strict';

(function () {
// ВАЛИДАЦИЯ ФОРМЫ
// находим и сохраняем объекты, которые понадобятся (с которыми будем работать)
  var titleInput = window.global.form.querySelector('#title');
  var priceInput = window.global.form.querySelector('#price');
  var typeHouseInput = window.global.form.querySelector('#type');
  var timeInInput = window.global.form.querySelector('#timein');
  var timeOutInput = window.global.form.querySelector('#timeout');

  // заголовок
  titleInput.setAttribute('required', 'required');
  titleInput.setAttribute('minlength', '30');
  titleInput.setAttribute('maxlength', '100');

  var createValidTitle = function () {
    if (titleInput.validity.tooShort) {
      return titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
    }

    if (titleInput.validity.tooLong) {
      return titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    }

    if (titleInput.validity.valueMissing) {
      return titleInput.setCustomValidity('Обязательное поле');
    }

    return titleInput.setCustomValidity('');
  };

  titleInput.addEventListener('invalid', createValidTitle);

  // валидация поля "цена за ночь"
  priceInput.setAttribute('required', 'required');
  priceInput.setAttribute('max', '1000000');
  priceInput.setAttribute('min', '0');

  var createValidPrice = function () {
    if (priceInput.validity.rangeUnderflow) { // min
      return priceInput.setCustomValidity('Установленная цена меньше минимального значения');
    }

    if (priceInput.validity.rangeOverflow) { // max
      return priceInput.setCustomValidity('Установленная цена превышает максимальное значения');
    }

    if (priceInput.validity.valueMissing) {
      return priceInput.setCustomValidity('Обязательное поле');
    }

    return titleInput.setCustomValidity('');
  };

  priceInput.addEventListener('invalid', createValidPrice);

  // валидация поля "тип жилья"
  var getTypeHouse = function (type) {
    switch (type) {
      case 'bungalo':
        return 0;
      case 'flat':
        return 1000;
      case 'house':
        return 5000;
      case 'palace':
        return 10000;
      default:
        return '';
    }
  };

  (function () {
    var value = getTypeHouse(typeHouseInput.value);

    priceInput.min = value;
    priceInput.placeholder = value;
  })();

  typeHouseInput.addEventListener('change', function () {
    var value = getTypeHouse(typeHouseInput.value);

    priceInput.min = value;
    priceInput.placeholder = value;
  });

  // валидация поля "адрес"
  window.global.inputAddress.setAttribute('readonly', 'readonly');

  // валидация поля "время заезда"
  var getTime = function (time) {
    switch (time) {
      case '12:00':
        return '12:00';
      case '13:00':
        return '13:00';
      case '14:00':
        return '14:00';
      default:
        return '';
    }
  };

  timeInInput.addEventListener('change', function () {
    var time = getTime(timeInInput.value);

    timeOutInput.value = time;
  });

  timeOutInput.addEventListener('change', function () {
    var time = getTime(timeOutInput.value);

    timeInInput.value = time;
  });

  // отправка данных формы на сервер
  var buttonForm = window.global.form.querySelector('.ad-form__submit');

  window.global.form.addEventListener('submit', function (evt) {

    var successHandler = function () {
      buttonForm.setAttribute('disabled', 'disabled');
    };

    var errorHandler = function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = document.createElement(errorTemplate.cloneNode(true));

      window.global.blockMain.appendChild(errorElement);
    };

    window.upload(new FormData(window.global.form), successHandler, errorHandler);
    evt.preventDefault();
  });
})();
