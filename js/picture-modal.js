'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var pics = window.data.pics;
  var bigPictureGenerate = function (picNum) {
    window.data.classToggle('hidden', bigPicture);
    bigPicture.querySelector('img').src = pics[picNum].url;
    bigPicture.querySelector('.likes-count').textContent = pics[picNum].likes;
    bigPicture.querySelector('.comments-count').textContent = pics[picNum].comments.length;
    bigPicture.querySelector('.social__caption').textContent = pics[picNum].description;
    commentsBlockGenerator(picNum);
  };

  var commentsBlockGenerator = function (picNum) {
    var commentsList = bigPicture.querySelector('.social__comments');

    var avatarPics = commentsList.querySelectorAll('.social__picture');
    var avatarText = commentsList.querySelectorAll('.social__text');

    for (var i = 0; i < pics[picNum].comments.length; i++) {
      avatarPics[i].src = 'img/avatar-' + window.data.random(1, 6) + '.svg';
      avatarText[i].textContent = pics[picNum].comments[i];
    }

    var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
    var socialLoadMore = bigPicture.querySelector('.social__comments-loader');

    window.data.classToggle('visually-hidden', socialCommentsCount);
    window.data.classToggle('visually-hidden', socialLoadMore);
  };

  var closeButton = document.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', function () {
    window.data.classToggle('hidden', bigPicture);
  });

  window.pictureModal = {
    bigPictureGenerate,
  };
})();
