'use strict';

(function () {

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

  var classToggle = function (className, object) {
    if (object.classList.contains(className)) {
      object.classList.remove(className);
    } else {
      object.classList.add(className);
    }
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
      description: randomItem(DESCRIPTION_SAMPLE),
    };
  };

  for (var i = 0; i < PIC_COUNT; i++) {
    pics.push(picGenerate(i + 1));
  }

  window.data = {
    pics,
    random,
    classToggle
  };
})();
