function reviewsChangeSlide(evt, reviewsSlideNumber) {
  var reviewsSlider, reviewsSlideBtn, i, reviewsSlideContent, reviewsSlidePicked;

  reviewsSlider = document.querySelector('.reviews__slider');

  reviewsSlideBtn = reviewsSlider.querySelectorAll('.slider__controls-btn');
  for (i = 0; i < reviewsSlideBtn.length; i++) {
    reviewsSlideBtn[i].classList.remove('slider__controls-btn--active');
  };

  reviewsSlideContent = reviewsSlider.querySelectorAll('.reviews__slider-content');
  for (i = 0; i < reviewsSlideContent.length; i++) {
    reviewsSlideContent[i].classList.remove('reviews__slider-content--active');
  };

  reviewsSlidePicked = document.getElementById(reviewsSlideNumber);
  reviewsSlidePicked.classList.add('reviews__slider-content--active');
  evt.currentTarget.classList.add('slider__controls-btn--active');
};
