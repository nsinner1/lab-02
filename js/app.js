'use strict';

const keywords = [];

function Arcade(object) {
  this.url = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
}

Arcade.prototype.render = function () {
  let $arcadeClone = $('.photo-template').clone();
  $arcadeClone.find('h2').text(this.title);
  $arcadeClone.find('img').attr('src', this.url);
  $arcadeClone.find('img').attr('alt', this.title);
  $arcadeClone.find('p').text(this.description);
  $arcadeClone.removeClass('photo-template');
  $arcadeClone.attr('class', this.keyword);
  $('main').append($arcadeClone);
};

function displayImages() {
  let $selected = $(this).val();
  if ($selected === 'default') {
    $('section').fadeIn();
    $('.photo-template').hide();
  } else {
    $('section').hide();
    $('.' + $selected).fadeIn();
  }
}

function appendToDropDown(keyword) {
  if (!keywords.includes(keyword)) {
    keywords.push(keyword);
  }
}

function appendToKeywordsArr() {
  keywords.sort();
  for (let i = 0; i < keywords.length; i++) {
    $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
  }
}

function getArcade() {
  $.ajax('./data/page-1.json')
    .then(data => {
      data.forEach((object, idx) => {
        let arcade = new Arcade(object);
        arcade.render();    
        appendToDropDown(object.keyword);
      })
      appendToKeywordsArr();
    });
}

$(document).ready(function() {
  $('select').on('change', displayImages);
  getArcade();  
});