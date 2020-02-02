'use strict';

(function () {

  var picturesSection = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var picturesHTMLGenerate = function (picsArray) {
    var picturesHTML = document.createDocumentFragment();
    for (var i = 0; i < picsArray.length; i++) {
      picturesHTML.appendChild(pictureHTMLGenerate(picsArray[i], pictureTemplate, i));
    }
    return picturesHTML;
  };

  var pictureHTMLGenerate = function (el, template, picNum) {
    var pictureHTML = template.cloneNode(true);
    pictureHTML.querySelector('.picture__img').src = el.url;
    pictureHTML.querySelector('.picture__img').dataset.picNum = picNum;
    pictureHTML.querySelector('.picture__img').alt = el.description;
    pictureHTML.querySelector('.picture__likes').textContent = el.likes;
    pictureHTML.querySelector('.picture__comments').textContent = el.comments.length;
    return pictureHTML;
  };

  picturesSection.appendChild(picturesHTMLGenerate(window.data.pics));

  picturesSection.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'IMG' && target.classList.contains('picture__img')) {
      window.pictureModal.bigPictureGenerate(parseInt(target.dataset.picNum, 10));
    }
  });

})();
