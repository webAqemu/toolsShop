$(document).ready(function () {
  $(".slider").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  let posX;
  let width;

  $(".slide").on("click", function () {
    // вычисляем ширину элемента, его позицию и его id
    width = +this.style.width.slice(0, 3);
    let id = this.getAttribute("data-slick-index");
    let track = document.querySelector(".slick-track");
    let trackWidth = Math.abs(window.getComputedStyle(track).getPropertyValue("transform").split(",")[4]);
    posX = +this.getBoundingClientRect().x + trackWidth - 45;

    // добавляем стили и классы
    this.style.left = posX + "px";
    $(this).toggleClass("locked");

    if (document.querySelector(".next")) {
      const locked = this;
      this.remove();
      console.log(locked);
      const next = document.querySelector(".next");
      console.log(next);
      next.insertAdjacentElement("beforeBegin", locked);
      next.classList.remove("next");
    } else {
      document.querySelector(".locked").nextSibling.classList.add("next");
    }
  });
  // каждый раз при клике мы меняем классы при этом у класса next есть отступ благодаря
  // которому слайды не налазят друг на друга осталось сделать так чтобы классы передовались
  // нормально а так же при повторном нажатии слайдер менял свое место положение

  let flagNext = true;
  let flagPrev = true;
  $(".slick-next").on("click", function () {
    // проверяем при нажатии на кнопку есть ли элемент locked
    // если да то добавляем класс след элементу

    if (document.querySelector(".locked") && flagNext) {
      posX = posX + width + 30;
      document.querySelector(".locked").style.left = posX + "px";
      document.querySelector(".next").nextSibling.classList.add("next");
      document.querySelector(".next").classList.remove("next");
    }

    if (this.classList.contains("slick-disabled")) {
      flagNext = false;
    } else {
      flagNext = true;
    }
  });

  $(".slick-prev").on("click", function () {
    if (document.querySelector(".locked") && flagPrev) {
      posX = posX - width - 30;
      document.querySelector(".locked").style.left = posX + "px";
      if (document.querySelector(".next").previousSibling.classList.contains("locked")) {
        document.querySelector(".next").classList.add("marked");
        document.querySelector(".next").previousSibling.previousSibling.classList.add("next");
        document.querySelector(".marked").classList.remove("next", "marked");
      } else {
        document.querySelector(".next").classList.add("marked");
        document.querySelector(".next").previousSibling.classList.add("next");
        document.querySelector(".marked").classList.remove("next", "marked");
      }
    }

    if (this.classList.contains("slick-disabled")) {
      flagPrev = false;
    } else {
      flagPrev = true;
    }
  });
});
