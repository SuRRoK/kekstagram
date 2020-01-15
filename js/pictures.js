'use strict';

var COMMENTS_SAMPLE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var DESCRIPTION_SAMPLE = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!',
];

var PIC_COUNT = 25;
var COMMENTS_COUNT = 2;
var pics = [];

var random = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var randomItem = function (array) {
  return array[random(0, array.length - 1)];
};

var commentsGenerate = function (maxCount) {
  var count = random(1, maxCount);
  var comments = [];
  for (var i = 0; i < count; i++) {
    comments.push(randomItem(COMMENTS_SAMPLE));
  }
  return comments;
};

var picGenerate = function (el) {
  return {
    url: 'photos/' + el + '.jpg',
    likes: random(15, 200),
    comments: commentsGenerate(COMMENTS_COUNT),
    description: randomItem(DESCRIPTION_SAMPLE)
  };
};

for (var i = 0; i < PIC_COUNT; i++) {
  pics.push(picGenerate(i + 1));
}

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesSection = document.querySelector('.pictures');

var pictureHTMLGenerate = function (el, template) {
  var pictureHTML = template.cloneNode(true);
  pictureHTML.querySelector('.picture__img').src = el.url;
  pictureHTML.querySelector('.picture__img').alt = el.description;
  pictureHTML.querySelector('.picture__likes').textContent = el.likes;
  pictureHTML.querySelector('.picture__comments').textContent = el.comments.length;
  return pictureHTML;
};

var picturesHTMLGenerate = function (picsArray) {
  var picturesHTML = document.createDocumentFragment();
  for (i = 0; i < pics.length; i++) {
    picturesHTML.appendChild(pictureHTMLGenerate(picsArray[i], pictureTemplate));
  }
  return picturesHTML;
};

picturesSection.appendChild(picturesHTMLGenerate(pics));

var classToggle = function (className, object) {
  if (object.classList.contains(className)) {
    object.classList.remove(className);
  } else {
    object.classList.add(className);
  }
};

var bigPicture = document.querySelector('.big-picture');

classToggle('hidden', bigPicture);

bigPicture.querySelector('img').src = pics[0].url;
bigPicture.querySelector('.likes-count').textContent = pics[0].likes;
bigPicture.querySelector('.comments-count').textContent = pics[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = pics[0].description;

var commentsList = bigPicture.querySelector('.social__comments');

var avatarPics = commentsList.querySelectorAll('.social__picture');
var avatarText = commentsList.querySelectorAll('.social__text');

for (i = 0; i < pics[0].comments.length; i++) {
  avatarPics[i].src = 'img/avatar-' + random(1, 6) + '.svg';
  avatarText[i].textContent = pics[0].comments[i];
}

var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
var socialLoadMore = bigPicture.querySelector('.social__comments-loader');

classToggle('visually-hidden', socialCommentsCount);
classToggle('visually-hidden', socialLoadMore);
