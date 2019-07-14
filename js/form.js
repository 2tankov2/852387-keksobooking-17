'use strict';

(function () {
  var HOUSE_TYPE = ['flat', 'bungalo', 'house', 'palace'];
  var TIME_CHECKS = ['12:00', '13:00', '14:00'];
  var MIN_PRICES = [1000, 0, 5000, 10000];
  // находим и сохраняем объекты, которые понадобятся (с которыми будем работать)
  var form = document.querySelector('.ad-form');
  var fieldsetForm = form.querySelectorAll('fieldset');
  var titleHousing = form.querySelector('#title');
  var priceHousing = form.querySelector('#price');
  var typeHousing = form.querySelector('#type');
  var timeInHousing = form.querySelector('#timein');
  var timeOutHousing = form.querySelector('#timeout');
  var addressHousing = form.querySelector('#address');

  // функция сброса полей в начальное состояние
  var resetForm = function () {
    // window.loadUpload.removeError();
    titleHousing.value = '';
    titleHousing.placeholder = 'Милая, но очень уютная квартирка в центре Токио';
    window.form.setPinCoordinates();
    // валидация поля "адрес"
    addressHousing.setAttribute('readonly', 'readonly');
    typeHousing.value = 'flat';
    priceHousing.value = '5000';
    timeInHousing.value = '12:00';
    timeOutHousing.value = '12:00';
  };

  // синхронизация полей тип_жилья - цена, время_заезда - время_выезда
  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWhithMin = function (element, value) {
    element.min = value;
    element.placeholder = value;
  };
  // заголовок
  titleHousing.setAttribute('required', 'required');
  titleHousing.setAttribute('minlength', '30');
  titleHousing.setAttribute('maxlength', '100');

  var createValidTitle = function () {
    if (titleHousing.validity.tooShort) {
      return titleHousing.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
    }

    if (titleHousing.validity.tooLong) {
      return titleHousing.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    }

    if (titleHousing.validity.valueMissing) {
      return titleHousing.setCustomValidity('Обязательное поле');
    }

    return titleHousing.setCustomValidity('');
  };
  // автосинхронизация "типа жилья" и "цены за ночь"
  var onTypeChange = function () {
    window.util.synchronFields(typeHousing, priceHousing, HOUSE_TYPE, MIN_PRICES, syncValueWhithMin);
  };
  // автосинхронизация "время заезда" и "время выезда"
  var onTimeInChange = function () {
    window.util.synchronFields(timeInHousing, timeOutHousing, TIME_CHECKS, TIME_CHECKS, syncValues);
  };
  var onTimeOutChange = function () {
    window.util.synchronFields(timeOutHousing, timeInHousing, TIME_CHECKS, TIME_CHECKS, syncValues);
  };
  // валидация поля "цена за ночь"
  priceHousing.setAttribute('required', 'required');
  priceHousing.setAttribute('max', '1000000');
  priceHousing.setAttribute('min', '0');

  var createValidPrice = function () {
    if (priceHousing.validity.rangeUnderflow) { // min
      return priceHousing.setCustomValidity('Установленная цена меньше минимального значения');
    }

    if (priceHousing.validity.rangeOverflow) { // max
      return priceHousing.setCustomValidity('Установленная цена превышает максимальное значения');
    }

    if (priceHousing.validity.valueMissing) {
      return priceHousing.setCustomValidity('Обязательное поле');
    }

    return priceHousing.setCustomValidity('');
  };

  // отправка данных формы на сервер
  var onFormSubmit = function (evt) {
    window.loadUpload.upload(new FormData(form), resetForm, window.loadUpload.onErrorLoad);
    evt.preventDefault();
  };
  // обработчик правильности заполнения заголовка
  titleHousing.addEventListener('invalid', createValidTitle);
  // обработчик правильности заполнения стоимости за ночь
  priceHousing.addEventListener('invalid', createValidPrice);
  // обработчик изменения типа жилья
  typeHousing.addEventListener('change', onTypeChange);
  // обработчик изменения времени вЪезда
  timeInHousing.addEventListener('change', onTimeInChange);
  // обработчик изменения времени выезда
  timeOutHousing.addEventListener('change', onTimeOutChange);
  // обработчик отправки формы на сервер
  form.addEventListener('submit', onFormSubmit);

  window.form = {
  // записываем координаты главной метки в поле адреса формы
    setPinCoordinates: function () {
      addressHousing.value = window.coordsPinMain.getCoords();
    },
    // активация формы
    active: function () {
      form.classList.remove('ad-form--disabled');
      [].forEach.call(fieldsetForm, function (element) {
        element.removeAttribute('disabled', 'disabled');
        addressHousing.setAttribute('readonly', 'readonly');
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
