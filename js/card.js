'use strict';

(function () {
  // Код для клавиатуры
  var KEY_ESC = 27;
  // данные карточки объекта недвижимости
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var mapCard = card.cloneNode(true);
  var titleCard = mapCard.querySelector('.popup__title');
  var cardAddress = mapCard.querySelector('.popup__text--address');
  var cardPrice = mapCard.querySelector('.popup__text--price');
  var cardType = mapCard.querySelector('.popup__type');
  var cardCapasity = mapCard.querySelector('.popup__text--capacity');
  var cardTime = mapCard.querySelector('.popup__text--time');
  var cardFeatures = mapCard.querySelector('.popup__features');
  var cardDescription = mapCard.querySelector('.popup__description');
  var cardPhotos = mapCard.querySelector('.popup__photos');
  var cardAvatar = mapCard.querySelector('.popup__avatar');
  var mapCardClose = mapCard.querySelector('.popup__close');
  // Текущий маркер
  var currentPin = false;
  // типы жилья
  var offerType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  // функция вставки строки для списка удобств
  var getFeatures = function (featureArray, element) {
    var childElement = element.querySelectorAll('li');
    for (var i = 0; i < childElement.length; i++) {
      element.removeChild(childElement[i]);
    }
    for (var j = 0; j < featureArray.length; j++) {
      var className = 'popup__feature';
      var newElement = document.createElement('li');
      newElement.classList.add(className);
      var feature = 'popup__feature--' + featureArray[j];
      newElement.classList.add(feature);
      element.appendChild(newElement);
    }
  };
  // функция вставки фото
  var renderPhotos = function (photodArray, element) {
    var childElement = element.querySelectorAll('img');
    if (childElement.length > 0) {
      for (var j = 0; j < childElement.length - 1; j++) {
        element.removeChild(childElement[j]);
      }
    }
    var photo = element.querySelector('.popup__photo');
    if (photodArray.length === 0) {
      photo.classList.add('hidden');
    } else {
      photo.classList.remove('hidden');
      for (var i = 0; i < photodArray.length; i++) {
        if (i === 0) {
          element.querySelector('img').setAttribute('src', photodArray[i]);
        } else {
          var newElement = element.querySelector('img').cloneNode(true);
          newElement.src = photodArray[i];
          element.appendChild(newElement);
        }
      }
    }
  };

  // формируем карточку
  var render = function (cardData) {
    titleCard.textContent = cardData.offer.title;
    cardAddress.textContent = cardData.offer.address;
    cardPrice.textContent = cardData.offer.price + ' ₽/ночь';
    cardType.textContent = offerType[cardData.offer.type];
    cardCapasity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    getFeatures(cardData.offer.features, cardFeatures);
    cardDescription.textContent = cardData.offer.description;
    renderPhotos(cardData.offer.photos, cardPhotos);
    cardAvatar.src = cardData.author.avatar;
    return mapCard;
  };
  // Сброс активного маркера
  var pinDeactivate = function () {
    if (currentPin !== false) {
      currentPin.classList.remove('map__pin--active');
    }
  };
  // Реакция на нажатие ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KEY_ESC) {
      closePopup();
    }
  };
  // Закрыть карточку мышкой
  var onCardCloseClick = function () {
    closePopup();
  };
  // Закрыть карточку
  var closePopup = function () {
    mapCard.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };
  // Закрытие карточки по нажатию мышки
  mapCardClose.addEventListener('click', onCardCloseClick);
  // Закрытие карточки с клавиатуры
  document.addEventListener('keydown', onPopupEscPress);
  // Открыть карточку
  var openPopup = function () {
    mapCard.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };
  window.card = {
    renderAndOpen: function (clickedElement, pins) {
      while (clickedElement !== pins) {
        if (clickedElement.tagName === 'BUTTON') {
          pinDeactivate();
          clickedElement.classList.add('map__pin--active');
          currentPin = clickedElement;
          if (!clickedElement.classList.contains('map__pin--main')) {
            render(window.mapFilters.filteredData[clickedElement.dataset.numPin]);
            openPopup();
          } else {
            mapCard.classList.add('hidden');
          }
        }
        clickedElement = clickedElement.parentNode;
      }
      return mapCard;
    }
  };
})();
