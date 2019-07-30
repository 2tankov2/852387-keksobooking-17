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
  var roomNumberHousing = form.querySelector('#room_number');
  var capacityHousing = form.querySelector('#capacity');
  // Объект соответствия количества комнат количеству возможных гостей
  var CapacityOfRoom = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
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

  // Функции включения-выключения вариантов количества гостей
  var activateCapacityOption = function (element) {
    element.classList.remove('hidden');
  };
  var deactivateCapacityOption = function (element) {
    element.classList.add('hidden');
  };
  // Изменение количества гостей в зависимости от изменения количества комнат
  var onRoomNumberChange = function () {
    var guests = CapacityOfRoom[roomNumberHousing.value];
    [].forEach.call(capacityHousing.options, function (element) {
      if (guests.includes(element.value)) {
        activateCapacityOption(element);
      } else {
        deactivateCapacityOption(element);
      }
    });
    capacityHousing.value = guests[0];
  };
  // Изменение количества комнат, если первоначально изменение было в количестве гостей
  var onCapacityChange = function () {
    var capacityValue = capacityHousing.value;
    if (!CapacityOfRoom[roomNumberHousing.value].includes(capacityValue)) {
      for (var key in CapacityOfRoom) {
        if (CapacityOfRoom[key].includes(capacityValue)) {
          roomNumberHousing.value = key;
          onRoomNumberChange();
          return;
        }
      }
    }
  };

  // отправка данных формы на сервер
  var onFormSubmit = function (evt) {
    window.loadUpload.upload(new FormData(form), window.loadUpload.onSuccessMessage, window.loadUpload.onErrorLoad);
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
  // Событие изменения количества комнат
  roomNumberHousing.addEventListener('change', onRoomNumberChange);
  // Событие изменения количества гостей
  capacityHousing.addEventListener('change', onCapacityChange);
  // обработчик отправки формы на сервер
  form.addEventListener('submit', onFormSubmit);

  window.form = {
    // функция сброса полей в начальное состояние
    resetForm: function () {
    // window.loadUpload.removeError();
      titleHousing.value = '';
      titleHousing.placeholder = 'Милая, но очень уютная квартирка в центре Токио';
      window.form.setPinCoordinates();
      // валидация поля "адрес"
      addressHousing.setAttribute('readonly', 'readonly');
      typeHousing.value = 'flat';
      priceHousing.placeholder = '1000';
      priceHousing.value = '';
      timeInHousing.value = '12:00';
      timeOutHousing.value = '12:00';
      roomNumberHousing.value = '1';
      capacityHousing.value = '1';
    },
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
      window.form.resetForm();
    }
  };
})();
