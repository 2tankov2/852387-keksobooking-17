'use strict';

(function () {
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
  // типы жилья
  var offerType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  // функция вставки строки для списка удобств
  var getStringFeatures = function (item) {
    return '<li class="popup__feature popup__feature--' + item + '"></li>';
  };
  // функция вставки фото
  var getStringPhotos = function (item) {
    return '<img src="' + item + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  };
  // формируем карточку
  var render = function (cardData) {
    titleCard.textContent = cardData.offer.title;
    cardAddress.textContent = cardData.offer.address;
    cardPrice.textContent = cardData.offer.price + '&#x20bd;/ночь';
    cardType.textContent = offerType[cardData.offer.type];
    cardCapasity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    cardFeatures.innerHTML = '';
    cardFeatures.insertAdjacentHTML('afterBegin', cardData.offer.features.map(getStringFeatures).join(' '));
    mapCard.appendChild(cardFeatures);
    cardDescription.textContent = cardData.offer.description;
    cardPhotos.innerHTML = '';
    cardPhotos.insertAdjacentHTML('afterBegin', cardData.offer.photos.map(getStringPhotos).join(' '));
    mapCard.appendChild(cardPhotos);
    cardAvatar.src = cardData.author.avatar;
    return mapCard;
  };
  window.card = {
    appendCard: function () {
      render(window.mapFilters.filteredData[0]);
      return mapCard;
    }
  };
})();
