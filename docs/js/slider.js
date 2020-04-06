"use strict";

$(document).ready(function(){
  $('.reviews__slider').slick({
    accessibility: true,
    arrows: false,
    dots: true,
    mobileFirst: true,
    responsive: [{
      breakpoint: 1199,
      settings:{
        arrows: true
      }
    }]
  });
});

let price = document.querySelector('.price');
let table = price.querySelector('.price__table');
let tablePosition = 1;
let tableDotsList = price.querySelector('.slider__dots');
let tableDots = price.querySelectorAll('.slider__btn');

function moveTable(n) {
  if (n === 1) {
    table.style.transform = "translate(20px,0)";
  }

  if (n === 2) {
    table.style.transform = "translate(-260px,0)";
  }

  if (n === 3) {
    table.style.transform = "translate(-540px,0)";
  }

  tableDots.forEach((item) => item.classList.remove('slider__btn--active'));
  tableDots[tablePosition - 1].classList.add('slider__btn--active');
}

function currentPosition(n) {
  moveTable(tablePosition = n);
}

tableDotsList.addEventListener('click', function(evt) {
  for (let i = 0; i < tableDots.length + 1; i++) {
    if (evt.target.classList.contains('slider__btn') && evt.target == tableDots[i - 1]) {
      currentPosition(i);
    }
  }
})
