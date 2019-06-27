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

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

// валидация поля "цена за ночь"
priceInput.setAttribute('required', 'required');
priceInput.setAttribute('max', '1000000');
priceInput.setAttribute('min', '0');

priceInput.addEventListener('invalid', function () {
  if (priceInput.validity.rangeUnderflow) { // min
    priceInput.setCustomValidity('Установленная цена меньше минимального значения');
  } else if (priceInput.validity.rangeOverflow) { // max
    priceInput.setCustomValidity('Установленная цена превышает максимальное значения');
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }
});

// валидация поля "тип жилья"
var getTypeHouse = function (x, y) {
  switch (x.value) {
    case 'bungalo':
      y.min = 0;
      y.placeholder = 0;
      break;
    case 'flat':
      y.min = 1000;
      y.placeholder = 1000;
      break;
    case 'house':
      y.min = 5000;
      y.placeholder = 5000;
      break;
    case 'palace':
      y.min = 10000;
      y.placeholder = 10000;
      break;
  }
};

typeHouseInput.addEventListener('change', function () {
  getTypeHouse(typeHouseInput, priceInput);
});

// валидация поля "адрес"
inputAddress.setAttribute('readonly', 'readonly');

// валидация поля "время заезда"
var getTime = function (x, y) {
  switch (x.value) {
    case '12:00':
      y.value = '12:00';
      break;
    case '13:00':
      y.value = '13:00';
      break;
    case '14:00':
      y.value = '14:00';
      break;
  }
};

timeInInput.addEventListener('change', function () {
  getTime(timeInInput, timeOutInput);
});

timeOutInput.addEventListener('change', function () {
  getTime(timeOutInput, timeInInput);
});


// ПЕРЕТАСКИВАНИЕ ГЛАВНОЙ МЕТКИ (предварительные наброски функций - черновик)

// var pinMain = document.querySelector('.map__pin--main'); - определена выше
// обработаем событие начала перетаскивания нашей главной метки mousedown

// максимально допустимые размеры карты
var locationMap = {
  min: {
    x: PINMAIN_WIDTH,
    y: 130
  },
  max: {
    x: widthMap + PINMAIN_WIDTH / 2,
    y: 630
  }
};

/* location: {
  x: random(PIN_WIDTH / 2, widthMap - PIN_WIDTH / 2),
  y: random(130, 630)
} */

pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  // запомним начальные координаты
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  // При каждом движении мыши нам нужно обновлять смещение относительно первоначальной
  // точки, чтобы метка смещалась на необходимую величину.
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    if (moveEvt.clientX < locationMap.min.x) {
      moveEvt.clientX = locationMap.min.x;
    } if (moveEvt.clientX > locationMap.max.x) {
      moveEvt.clientX = locationMap.max.x;
    }

    if (moveEvt.clientY < locationMap.min.y) {
      moveEvt.clientY = locationMap.min.y;
    } if (moveEvt.clientY > locationMap.max.y) {
      moveEvt.clientY = locationMap.max.y;
    }

    var shift = { // разница смещения
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = { // записываем новые координаты
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMainLocation = startCoords;

    pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
  };
  // При отпускании кнопки мыши нужно переставать слушать события движения мыши.
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // обработчики события передвижения мыши и отпускания кнопки мыши
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
