'use strict';

// ОТРИСОВКА МЕТОК ПОХОЖИХ ОБЪЯВЛЕНИЙ
// размеры меток
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// ширина карты
var widthMap = document.querySelector('.map').offsetWidth;

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// создайём массив, состоящий из 8 сгенерированных JS объектов,
// которые будут описывать похожие объявления неподалёку
var getData = function (count) {
  var newArray = [];

  var types = ['palace', 'flat', 'house', 'bungalo'];

  for (var i = 1; i <= count; i++) {
    var pinData = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: types[random(0, types.length)]
      },
      location: {
        x: random(PIN_WIDTH / 2, widthMap - PIN_WIDTH / 2),
        y: random(130, 630)
      },
    };
    newArray[i - 1] = pinData;
  }

  return newArray;
};

var pinsData = getData(8);

// создаём DOM-элементы, соответствующие меткам на карте,
// и заполняем их данными из массива
var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.firstChild.src = pin.author.avatar;
  pinElement.alt = 'заголовок объявления';

  return pinElement;
};

// отрисовка сгенерированных DOM-элементов в блок .map__pins
var addPinsData = function () {

  for (var i = 0; i < pinsData.length; i++) {
    pinsList.appendChild(createPin(pinsData[i]));
  }
};

// АКТИВИРУЕМ КАРТУ И ФОРМУ С ФИЛЬТРАМИ
// размеры главной метки
var PINMAIN_WIDTH = 65;
var PINMAIN_HEIGHT = 87;

// находим и сохраняем объекты, которые понадобятся (с которыми будем работать)
var pinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var filters = document.querySelector('.map__filters');
var fieldsetForm = form.querySelectorAll('fieldset');
var fieldsetFilters = filters.querySelectorAll('fieldset');
var selectFilters = filters.querySelectorAll('select');
var inputAddress = document.querySelector('#address');

// функция добавления аттрибута
var addAttribute = function (elements, atr, value) {

  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute(atr, value);
  }
};

// функция удаления аттрибута
var deleteAttribute = function (elements, atr, value) {

  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute(atr, value);
  }
};

// добавляем атрибут disabled к полям формы
addAttribute(fieldsetForm, 'disabled', 'disabled');

// добавляем атрибут disabled к полям фильтра
addAttribute(fieldsetFilters, 'disabled', 'disabled');
addAttribute(selectFilters, 'disabled', 'disabled');

// сохраняем координаты главной метки в объект
var pinMainLocation = {
  x: pinMain.getBoundingClientRect().left + PINMAIN_WIDTH / 2,
  y: pinMain.getBoundingClientRect().top + PINMAIN_HEIGHT
};

// функция активации страницы, в которой:
// убираем класс 'map--faded' у катры
// отрисовываем метки, которые будут описывать похожие объявления неподалёку
// убираем класс 'ad-form--disabled' у формы
// убираем класс 'ad-form--disabled' у фильтра
// убираем аттрибут disabled у элементов формы и фильтра
var setActivePage = function () {
  map.classList.remove('map--faded');
  addPinsData();
  form.classList.remove('ad-form--disabled');
  filters.classList.remove('ad-form--disabled');
  deleteAttribute(fieldsetForm, 'disabled', 'null');
  deleteAttribute(fieldsetFilters, 'disabled', 'null');
  deleteAttribute(selectFilters, 'disabled', 'null');
};

// записываем координаты главной метки в поле адреса формы
var setPinCoordinates = function (pin) {
  inputAddress.value = pin.x + ', ' + pin.y;
};

// активируем страницу и вписываем адрес главной метки в форму
pinMain.addEventListener('click', function () {
  setActivePage();
  setPinCoordinates(pinMainLocation);
});

// ВАЛИДАЦИЯ ФОРМЫ
// находим и сохраняем объекты, которые понадобятся (с которыми будем работать)
var titleInput = form.querySelector('#title');
var priceInput = form.querySelector('#price');
var typeHouseInput = form.querySelector('#type');
var timeInInput = form.querySelector('#timein');
var timeOutInput = form.querySelector('#timeout');

// валидация поля "заголовка объявления"
titleInput.setAttribute('required', 'required');
titleInput.setAttribute('minlength', '30');
titleInput.setAttribute('maxlength', '100');

var createValidTitle = function () {
  if (titleInput.validity.tooShort) {
    return titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
  } else if (titleInput.validity.tooLong) {
    return titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
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
  } else if (priceInput.validity.rangeOverflow) { // max
    return priceInput.setCustomValidity('Установленная цена превышает максимальное значения');
  } else if (priceInput.validity.valueMissing) {
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

typeHouseInput.addEventListener('change', function () {
  var value = getTypeHouse(typeHouseInput.value);

  priceInput.min = value;
  priceInput.placeholder = value;
});

// валидация поля "адрес"
inputAddress.setAttribute('readonly', 'readonly');

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


// ПЕРЕТАСКИВАНИЕ ГЛАВНОЙ МЕТКИ

// var pinMain = document.querySelector('.map__pin--main'); - главная марка определена выше
// максимально допустимые размеры карты
var locationMap = {
  min: {
    x: 0,
    y: 130
  },
  max: {
    x: widthMap - PINMAIN_WIDTH,
    y: 630
  }
};

// функции определения позиции метки в пределах карты
var getPosition = function (coordinate, shift, minValue, maxVaue) {
  if ((coordinate - shift) < minValue) {
    return minValue + 'px';
  } else if ((coordinate - shift) > maxVaue) {
    return maxVaue + 'px';
  }

  return (coordinate - shift) + 'px';
};

(function () {
// обработаем событие начала перетаскивания нашей главной метки mousedown
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // запомним начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // нажатие на главную метку — это активация страницы без перемещения
    // мутки, а если мы нажали и начали двигать курсор, то действие
    // активации страницы надо отменить
    var dragged = false;

    // При каждом движении мыши нам нужно обновлять смещение относительно первоначальной
    // точки, чтобы метка смещалась на необходимую величину.
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = { // разница смещения
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = { // записываем новые координаты
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMainLocation = startCoords;

      pinMain.style.left = getPosition(pinMain.offsetLeft, shift.x, locationMap.min.x, locationMap.max.x);
      pinMain.style.top = getPosition(pinMain.offsetTop, shift.y, locationMap.min.y, locationMap.max.y);
    };

    // При отпускании кнопки мыши нужно переставать слушать события движения мыши.
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // при отпускании мыши мы повесим обработчик на click,
      // который отменит действие по умолчанию, если перемещение
      // имело место
      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();

          pinMain.removeEventListener('click', onClickPreventDefault);
        };

        pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    // обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
