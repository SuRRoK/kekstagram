'use strict';

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

function removeSpaces(string) {
  string = string.replace(/\s+/g, ' ');
  if (string[0] === ' ') {
    var array = string.split('');
    array.splice(0, 1);
    var lastElem = array.length - 1;
    if (array[lastElem] === ' ') {
      array.splice(lastElem, 1);
    }
    string = array.join('');
  }

  return string;
}

function startSymbol(symbol, words) {
  for (var i = 0; i < words.length; i++) {
    if (!words[i].startsWith(symbol)) {
      return false;
    }
  }
  return true;
}


function setCustomValidity() {
  var hashTags = removeSpaces(hashTagsInput.value);
  hashTags = hashTags.split(' ');

  for (var i = 0; i < hashTags.length; i++) {
    startSymbol('#', hashTags[i]);
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
  console.log(effectLevelValue);
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
