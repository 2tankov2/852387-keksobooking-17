'use strict';

(function () {
  // главная часть - карта
  var contanerMap = document.querySelector('.map');
  // список маркеров на карте
  var pinsList = contanerMap.querySelector('.map__pins');
  // блок с фильтрами
  var filtersContainer = contanerMap.querySelector('.map__filters-container');
  // фрагмент документа с маркерами для вставки
  var pinsFragment = document.createDocumentFragment();
  // нажатие на гланый маркер и активация страницы
  var setActivePage = function () {
    // убираем класс 'map--faded' у катры
    contanerMap.classList.remove('map--faded');
    // добавляем маркеры для вставки в документ
    pinsList.appendChild(pinsFragment);
    // добавляем карточку для первого пина
    pinsList.insertBefore(window.card.appendCard(), filtersContainer);
    // активируем форму
    window.form.active();
  };
  // загрузка данных
  var onSuccessLoad = function (data) {
    window.mapFilters.transferData(data);
    // window.loadUpload.removeError();
    window.mapFilters.filteredData.forEach(window.pin.render, pinsFragment);
    // доступ пользователю
    window.coordsPinMain.pinGlobal.addEventListener('mouseup', setActivePage);
  };

  // начальное состояние формы
  window.form.initState();
  // загружаем данные с сервера
  window.loadUpload.load(onSuccessLoad, window.loadUpload.onErrorLoad);

  window.map = {
    // функия добавления маркеров на страницу
    appendPins: function () {
      // функция очистки карты от меток
      var childs = pinsList.querySelectorAll('.map__pin');
      [].forEach.call(childs, function (element) {
        if (!element.classList.contains('map__pin--main')) {
          pinsList.removeChild(element);
        }
      });
      // заполняем фрагмент отфильтрованными метками
      window.mapFilters.filteredData.forEach(window.pin.render, pinsFragment);
      // добавляем метки на карту
      pinsList.appendChild(pinsFragment);
    }
  };
})();
