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
  // фрагмент документа с карточкой для вставки
  var cardFragment = document.createDocumentFragment();
  // нажатие на гланый маркер и активация страницы
  var setActivePage = function () {
    // убираем класс 'map--faded' у катры
    contanerMap.classList.remove('map--faded');
    // добавляем маркеры для вставки в документ
    pinsList.appendChild(pinsFragment);
    // активируем форму
    window.form.active();
  };

  // Клик по маркеру
  var onPinClick = function (evt) {
    window.card.renderAndOpen(evt.target, pinsList);
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
  // Добавляем карточку недвижимости на страницу и скрываем ее
  contanerMap.insertBefore(cardFragment.appendChild(window.card.renderAndOpen(window.coordsPinMain.pinGlobal, pinsList)), filtersContainer);
  // Клик на маркер ловим на контейнере
  pinsList.addEventListener('click', onPinClick);

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
