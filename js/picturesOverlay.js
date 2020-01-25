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
