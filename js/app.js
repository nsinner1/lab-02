'use strict'


const newInfo = [];
const keywordID = [];

function NewInfo2(url, title, description, keyword, horn) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horn = horn;
  newInfo.push(this);
}

NewInfo2.prototype.render = function () {
  let $newInfo2Clone = $('.photo-template').clone();
  $('main').append($newInfo2Clone);
  $newInfo2Clone.find('h2').text(this.title);
  $newInfo2Clone.find('img').attr('src',this.url);
  $newInfo2Clone.find('p').text(this.description);
  $newInfo2Clone.removeClass('photo-template');
  $newInfo2Clone.attr('class', this.keyword);
};

$(document).ready(function() {
  $.ajax('data/page-1.json')
    .then(data => {
      data.forEach((obj, idx) => {
        let newInfo2 = new NewInfo2(obj.image_url, obj.title, obj.description, obj.keyword, obj.horn);
        newInfo2.render();
        dropDown();
      });
    });
});

function dropDown() {
  newInfo.forEach(animal => {
    if (!keywordID.includes(animal.keyword)) {
      keywordID.push(animal.keyword);
    }
  });
}



