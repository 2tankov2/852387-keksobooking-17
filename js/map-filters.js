'use strict';

(function () {
  // количество показываемых меток на карте
  var TAKE_NUMBER_PIN = 5;
  // пределы цены
  var PRICE_MIN = 10000;
  var PRICE_MAX = 50000;
  // рабочая копия массива полученных с сервера данных
  var dataCopy = [];
  // текущие значения фильтров
  var filterValue = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any'
  };
  // Отмеченные пользователем удобства
  var checkedFeatures = [];
  // фильтры
  var filters = document.querySelector('.map__filters');
  var filterTypeHouse = filters.querySelector('#housing-type');
  var filterPrice = filters.querySelector('#housing-price');
  var filterRooms = filters.querySelector('#housing-rooms');
  var filterGuests = filters.querySelector('#housing-guests');
  var filterFeatures = filters.querySelector('#housing-features');
  // массив с функциями фильтров
  var filterFunctions = [
    // фильтер по типу жилья
    function (arr) {
      if (filterValue.type !== 'any') {
        arr = arr.filter(function (element) {
          return element.offer.type === filterValue.type;
        });
      }
      return arr;
    },
    // Фильтр по стоимости
    function (arr) {
      switch (filterValue.price) {
        case 'any':
          break;
        case 'low':
          arr = arr.filter(function (element) {
            return element.offer.price <= PRICE_MIN;
          });
          break;
        case 'high':
          arr = arr.filter(function (element) {
            return element.offer.price >= PRICE_MAX;
          });
          break;
        case 'middle':
          arr = arr.filter(function (element) {
            return (element.offer.price > PRICE_MIN) && (element.offer.price < PRICE_MAX);
          });
      }
      return arr;
    },
    // Фильтр по количеству комнат
    function (arr) {
      if (filterValue.rooms !== 'any') {
        arr = arr.filter(function (element) {
          return element.offer.rooms === parseInt(filterValue.rooms, 10);
        });
      }
      return arr;
    },
    // Фильтр по количеству гостей
    function (arr) {
      if (filterValue.guests !== 'any') {
        arr = arr.filter(function (element) {
          return element.offer.guests === parseInt(filterValue.guests, 10);
        });
      }
      return arr;
    },
    // Фильтр по удобствам
    function (arr) {
      return arr.filter(function (element) {
        return checkedFeatures.every(function (currentFeature) {
          return element.offer.features.includes(currentFeature);
        });
      });
    }
  ];
  // функция фильтрации
  var onFilterChange = function (evt) {
  // значение сработавшего фильтра в объекте текущих значений фильтров
    var filterName = evt.target.name.substring(8);
    filterValue[filterName] = evt.target.value;
    // копируем исходные данные для фильтрования
    window.mapFilters.filteredData = dataCopy.slice();
    // Получаем список отмеченных чекбоксов
    var checkedElements = filterFeatures.querySelectorAll('input[type="checkbox"]:checked');
    // Преобразуем список в массив строк
    checkedFeatures = [].map.call(checkedElements, function (element) {
      return element.value;
    });
    // получаем массив данных после обработки фильтров
    filterFunctions.forEach(function (getFiltered) {
      window.mapFilters.filteredData = getFiltered(window.mapFilters.filteredData);
    });
    // выводим необходимое кол-во элементов
    if (window.mapFilters.filteredData.length > TAKE_NUMBER_PIN) {
      window.mapFilters.filteredData = window.mapFilters.filteredData.slice(0, TAKE_NUMBER_PIN);
    }
    window.card.removeCard();
    // выводим метки после тайм-аута
    window.debounce(window.map.appendPins);
  };
  // Обработчики событий изменения фильтров
  filterTypeHouse.addEventListener('change', onFilterChange);
  filterPrice.addEventListener('change', onFilterChange);
  filterRooms.addEventListener('change', onFilterChange);
  filterGuests.addEventListener('change', onFilterChange);
  filterFeatures.addEventListener('change', onFilterChange);
  // функция принимающая массив данных с сервера и отфильтрованный массив данных
  window.mapFilters = {
    filteredData: [],
    transferData: function (data) {
      dataCopy = data.slice();
      this.filteredData = data.slice(0, TAKE_NUMBER_PIN);
    },
    resetFeatures: function () {
      var filtersCheckFeatures = document.querySelectorAll('#housing-features input[type="checkbox"]:checked');
      filterTypeHouse.value = 'any';
      filterPrice.value = 'any';
      filterRooms.value = 'any';
      filterGuests.value = 'any';
      filtersCheckFeatures.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
  };
})();
