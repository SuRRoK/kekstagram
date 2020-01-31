'use strict';
var MAX_TAG_COUNT = 5;

var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var fileSelect = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');

fileSelect.addEventListener('change', function () {
  // eslint-disable-next-line no-undef
  classToggle('hidden', imgUploadOverlay);
});

uploadCancel.addEventListener('click', function () {
  fileSelect.value = '';
  // eslint-disable-next-line no-undef
  classToggle('hidden', imgUploadOverlay);
});

var hashTagsInput = imgUploadOverlay.querySelector('.text__hashtags');
var uploadSubmit = imgUploadOverlay.querySelector('.img-upload__submit');

uploadSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();
  setCustomValidity();
});

function removeSpacesNew(string) {
  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  string = string.replace(/\s+/g, ' ');
  return string.replace(rtrim, '');
}

function startSymbol(symbol, words) {
  for (var i = 0; i < words.length; i++) {
    if (!words[i].startsWith(symbol)) {
      return true;
    }
  }
  return false;
}

function secondEntrySymbol(symbol, words) {
  for (var i = 0; i < words.length; i++) {
    if (words[i].includes(symbol, 1)) {
      return true;
    }
  }
  return false;
}

function wordLength(minLength, maxLength, words) {
  for (var i = 0; i < words.length; i++) {
    if (words[i].length < minLength || words[i].length > maxLength) {
      return true;
    }
  }
  return false;
}

function wordDuplicate(words) {
  // eslint-disable-next-line no-undef
  var wordsSet = new Set(words);
  return wordsSet.size !== words.length;
}

function setCustomValidity() {
  var hashTags = removeSpacesNew(hashTagsInput.value.toLowerCase()).split(' ');
  hashTagsInput.setCustomValidity('');
  if (hashTags.length > MAX_TAG_COUNT) {
    hashTagsInput.setCustomValidity('Максимальное количество хештегов ' + MAX_TAG_COUNT);
  } else if (startSymbol('#', hashTags)) {
    hashTagsInput.setCustomValidity('Все хештеги должны начинаться с #');
  } else if (secondEntrySymbol('#', hashTags)) {
    hashTagsInput.setCustomValidity('Все хештеги должны разделяться пробелом');
  } else if (wordLength(2, 20, hashTags)) {
    hashTagsInput.setCustomValidity('Длина тега может составлять 1 - 19 символов');
  } else if (wordDuplicate(hashTags)) {
    hashTagsInput.setCustomValidity('Теги не должны повторяться');
  }
}


var previewImg = imgUploadOverlay.querySelector('.img-upload__preview > img');
var originalImg = imgUploadOverlay.querySelector('.effects__preview--none');
var chromeImg = imgUploadOverlay.querySelector('.effects__preview--chrome');
var sepiaImg = imgUploadOverlay.querySelector('.effects__preview--sepia');
var marvinImg = imgUploadOverlay.querySelector('.effects__preview--marvin');
var phobosImg = imgUploadOverlay.querySelector('.effects__preview--phobos');
var heatImg = imgUploadOverlay.querySelector('.effects__preview--heat');

var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');

var filterSelect = function (effect, effectDeep) {
  switch (effect) {
    case 'chrome':
      return 'grayscale(' + effectDeep + '%)';
    case 'sepia':
      return 'sepia(' + effectDeep + '%)';
    case 'marvin':
      return 'invert(' + effectDeep + '%)';
    case 'phobos':
      effectDeep = effectDeep / 100 * 5;
      return 'blur(' + effectDeep + 'px)';
    case 'heat':
      effectDeep = effectDeep / 100 * 3;
      return 'brightness(' + effectDeep + ')';
    default:
      return '';
  }
};

var filterSetup = function (effDepth) {
  var currentEffect = previewImg.dataset.effect;
  previewImg.style.filter = filterSelect(currentEffect, effDepth);
};

effectLevelLine.addEventListener('mousedown', function (evt) {
  var clickX = evt.clientX;
  var effectLevelLineLeftPosition = effectLevelLine.getBoundingClientRect().left;
  var newPosition = (clickX - effectLevelLineLeftPosition);
  effectLevelPin.style.left = newPosition + 'px';
  effectLevelDepth.style.width = newPosition + 'px';
  var effDepth = Math.round(effectLevelDepth.getBoundingClientRect().width / effectLevelLine.getBoundingClientRect().width * 100);
  filterSetup(effDepth);
});

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startX = evt.clientX;
  var effectLevelLineWidth = effectLevelLine.getBoundingClientRect().width;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shiftX = startX - moveEvt.clientX;
    var newPosition = Math.round((effectLevelPin.offsetLeft - shiftX) / (effectLevelLineWidth) * 100);
    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > 100) {
      newPosition = 100;
    }
    startX = moveEvt.clientX;
    effectLevelPin.style.left = newPosition + '%';
    effectLevelDepth.style.width = newPosition + '%';
    filterSetup(newPosition);
  };
  var onMouseUp = function (moveUp) {
    moveUp.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

originalImg.addEventListener('click', function () {
  previewImg.removeAttribute('style');
  previewImg.removeAttribute('data-effect');
});

var allAttributesMax = function () {
  effectLevelPin.style.left = '100%';
  effectLevelDepth.style.width = '100%';
};

chromeImg.addEventListener('click', function () {
  allAttributesMax();
  previewImg.dataset.effect = 'chrome';
  previewImg.style.filter = 'grayscale(100%)';
});

sepiaImg.addEventListener('click', function () {
  allAttributesMax();
  previewImg.dataset.effect = 'sepia';
  previewImg.style.filter = 'sepia(100%)';
});

marvinImg.addEventListener('click', function () {
  allAttributesMax();
  previewImg.dataset.effect = 'marvin';
  previewImg.style.filter = 'invert(100%)';
});

phobosImg.addEventListener('click', function () {
  allAttributesMax();
  previewImg.dataset.effect = 'phobos';
  previewImg.style.filter = 'blur(5px)';
});

heatImg.addEventListener('click', function () {
  allAttributesMax();
  previewImg.dataset.effect = 'heat';
  previewImg.style.filter = 'brightness(3)';
});
