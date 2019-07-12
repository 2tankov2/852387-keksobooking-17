'use strict';

(function () {
  var HOUSE_TYPE = ['flat', 'bungalo', 'house', 'palace'];
  var TIME_CHECKS = ['12:00', '13:00', '14:00'];
  var MIN_PRICES = [1000, 0, 5000, 10000];
  // находим и сохраняем объекты, которые понадобятся (с которыми будем работать)
  var form = document.querySelector('.ad-form');
  var fieldsetForm = form.querySelectorAll('fieldset');
  var titleHouse = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  var typeHouseInput = form.querySelector('#type');
  var timeInInput = form.querySelector('#timein');
  var timeOutInput = form.querySelector('#timeout');
  var inputAddress = form.querySelector('#address');

  // функция сброса полей в начальное состояние
  var resetForm = function () {
    window.loadUpload.removeError();
    titleHouse.value = '';
    titleHouse.placeholder = 'Милая, но очень уютная квартирка в центре Токио';
    window.form.setPinCoordinates();
    // валидация поля "адрес"
    window.global.inputAddress.setAttribute('readonly', 'readonly');
    typeHouseInput.value = 'flat';
    priceInput.value = '5000';
    timeInInput.value = '12:00';
    timeOutInput = '12:00';
  };

  // синхронизация полей тип_жилья - цена, время_заезда - время_выезда
  var syncValue = function (element, value) {
    element.value = value;
  };
  var syncValueWhithMin = function (element, value) {
    element.min = value;
  };
  // заголовок
  var createValidTitle = function () {
    if (titleHouse.validity.tooShort) {
      return titleHouse.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
    }

    if (titleHouse.validity.tooLong) {
      return titleHouse.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    }

    if (titleHouse.validity.valueMissing) {
      return titleHouse.setCustomValidity('Обязательное поле');
    }

    return titleHouse.setCustomValidity('');
  };
  // автосинхронизация "типа жилья" и "цены за ночь"
  var onTypeChange = function () {
    window.util.synchronFields(typeHouseInput, priceInput, HOUSE_TYPE, MIN_PRICES, syncValueWhithMin);
  };
  // автосинхронизация "время заезда" и "время выезда"
  var onTimeInChange = function () {
    window.util.synchronFields(timeInInput, timeOutInput, TIME_CHECKS, TIME_CHECKS, syncValue);
  };
  var onTimeOutChange = function () {
    window.util.synchronFields(timeOutInput, timeInInput, TIME_CHECKS, TIME_CHECKS, syncValue);
  };
  // валидация поля "цена за ночь"
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

    return priceInput.setCustomValidity('');
  };
  // отправка данных формы на сервер
  var onFormSubmit = function (evt) {
    window.loadUpload.save(new FormData(form), resetForm, window.loadUpload.onError);
    evt.preventDefault();
  };
  // обработчик правильности заполнения заголовка
  titleHouse.addEventListener('invalid', createValidTitle);
  // обработчик правильности заполнения стоимости за ночь
  priceInput.addEventListener('invalid', createValidPrice);
  // обработчик изменения типа жилья
  typeHouseInput.addEventListener('change', onTypeChange);
  // обработчик изменения времени вЪезда
  timeInInput.addEventListener('change', onTimeInChange);
  // обработчик изменения времени выезда
  timeOutInput.addEventListener('change', onTimeOutChange);
  // обработчик отправки формы на сервер
  form.addEventListener('submit', onFormSubmit);

  window.form = {
  // записываем координаты главной метки в поле адреса формы
    setPinCoordinates: function () {
      inputAddress.value = window.coordsPinMain.getCoords();
    },
    // активация формы
    active: function () {
      form.classList.remove('ad-form--disabled');
      [].forEach.call(fieldsetForm, function (element) {
        element.removeAttrebute('disabled', 'disabled');
      });
      window.form.setPinCoordinates();
    },
    // начальное состояние страницы
    initState: function () {
      [].forEach.call(fieldsetForm, function (element) {
        element.setAttribute('disabled', 'disabled');
      });
    }
  };
})();
