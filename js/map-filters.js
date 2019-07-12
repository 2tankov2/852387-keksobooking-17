'use strict';

(function () {
  // количество показываемых меток на карте
  var TAKE_NUMBER_PIN = 5;
  // рабочая копия массива полученных с сервера данных
  var dataCopy = [];
  // текущие значения фильтров
  var filterValue = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any'
  };
  // фильтры
  var filters = document.querySelector('.map__filters');
  var filterTypeHouse = filters.querySelector('#housing-type');
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
    }
    // тут добавим остальные функции по фильтрам
  ];
  // функция фильтрации
  var onFilterChange = function (evt) {
  // значение сработавшего фильтра в объекте текущих значений фильтров
    var filterName = evt.target.name.substring(8);
    filterValue[filterName] = evt.target.value;
    // копируем исходные данные для фильтрования
    window.mapFilters.filteredData = dataCopy.slice();
    // получаем массив данных после обработки фильтров
    filterFunctions.forEach(function (getFiltered) {
      window.mapFilters.filteredData = getFiltered(window.mapFilters.filteredData);
    });
    // выводим необходимое кол-во элементов
    if (window.mapFilters.filteredData.length > TAKE_NUMBER_PIN) {
      window.mapFilters.filteredData = window.mapFilters.filteredData.slice(0, TAKE_NUMBER_PIN);
    }
    // выводим метки после тайм-аута
    window.debounce(window.map.appendPins);
  };
  // обработчик смены типа жилья
  filterTypeHouse.addEventListener('change', onFilterChange);

  // функция принимающая массив данных с сервера и отфильтрованный массив данных
  window.mapFilters = {
    filteredData: [],
    transferData: function (data) {
      dataCopy = data.slice();
      this.filteredData = data.slice(0, TAKE_NUMBER_PIN);
    }
  };
})();
