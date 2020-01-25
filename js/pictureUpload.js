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


/* function removeSpaces(string) {
  string = string.replace(/\s+/g, ' ');
  if (string.startsWith(' ') || string.endsWith(' ')) {
    var array = string.split('');
    if (array[0] === ' ') {
      array.splice(0, 1);
    }
    var lastElem = array.length - 1;
    if (array[lastElem] === ' ') {
      array.splice(lastElem, 1);
    }
    string = array.join('');
  }
  return string;
} */

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

var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');

originalImg.addEventListener('click', function () {
  previewImg.style.filter = '';
  console.log(effectLevelValue, effectLevelPin);
});

chromeImg.addEventListener('click', function () {
  previewImg.style.filter = 'grayscale(100%)';
});

sepiaImg.addEventListener('click', function () {
  previewImg.style.filter = 'sepia(100%)';
});

marvinImg.addEventListener('click', function () {
  previewImg.style.filter = 'invert(100%)';
});

phobosImg.addEventListener('click', function () {
  previewImg.style.filter = 'blur(5px)';
});

heatImg.addEventListener('click', function () {
  previewImg.style.filter = 'brightness(3)';
});
