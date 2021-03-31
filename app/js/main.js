$(function(){

  $('.slider-top__inner').slick({
    dots: true,
    arrows: false
  });

  $('.slider-partners__list').slick({
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 5,
  });

  mixitup('.products__inner', {
    selectors: {
      target: '.products__item',
      control: '.filter__btn1'
    }
  });
  
  mixitup('.design', {
    selectors: {
      target: '.design__item',
      control: '.filter__btn2'
    }
  });
})