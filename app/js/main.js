$(function () {

  // временно отключил ссылки
  $('a').on('click', function (event) {
    event.preventDefault();
  });
  

  $('.slider-top__inner').slick({
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: false
        }
      },
    ]
  });

  $('.slider-partners__list').slick({
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
    ]
  });

  mixitup('.products__inner', {
    selectors: {
      target: '.products__item',
      control: '.products__filter .filter__btn'
    }
  });

  mixitup('.design', {
    selectors: {
      target: '.design__item',
      control: '.design__filter .filter__btn'
    }
  });

  $('.user__btn--menu, .close').on('click', function (event) {
    event.preventDefault();
    $('.menu').toggleClass('menu--active');
    $('.close').toggleClass('close--active');
  });

  // липкая шапка
  window.addEventListener("scroll", function () {
    $(".header").toggleClass("header--fixed", window.scrollY > 0);
    $(".wrapper").toggleClass("wrapper--active", window.scrollY > 0);
  })
})


