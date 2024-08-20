"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const content = document.querySelectorAll(".operations__content");
let currentActiveTab = document.querySelector(".operations__tab--1");
let currentActiveContent = document.querySelector(".operations__content--1");

const sections = document.querySelectorAll(".section");
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
const cookieDiv = document.createElement("div");

cookieDiv.classList.add("cookie-message");
cookieDiv.innerHTML =
  'We use cookies for improved functionality and analysis. <button class="btn cookie-btn" type="button">Got it!</button>';

header.insertAdjacentElement("afterEnd", cookieDiv);
const cookieBtn = document.querySelector(".cookie-btn");

cookieBtn.addEventListener("click", () => {
  cookieDiv.remove();
});

cookieDiv.style.backgroundColor = "#37383d";
cookieDiv.style.width = "100%";
cookieDiv.style.height =
  Number.parseFloat(getComputedStyle(cookieDiv).height) + 15 + "px";

// *********************************************
// PAGE NAVIGATION
// *********************************************

// document.querySelectorAll('.nav__link').forEach(function(item){
//   item.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = item.getAttribute('href');
//     const scroll_to = document.querySelector(id);

//     scroll_to.scrollIntoView({behavior:'smooth'});
//   })
// })

// OR

document.querySelector(".nav__links").addEventListener("click", function (e) {
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    const scroll_to = document.querySelector(id);

    scroll_to.scrollIntoView({ behavior: "smooth" });
  }
});

// TABBED TABLE

tabsContainer.addEventListener("click", function (e) {
  let target = e.target.closest(".operations__tab");
  // if (!e.target.classList.contains("btn")) target = e.target.parentElement;
  // else if (e.target.classList.contains("btn")) target = e.target;

  if (target) {
    currentActiveTab.classList.toggle("operations__tab--active");
    currentActiveTab = target;
    target.classList.toggle("operations__tab--active");
    const contentNo = target.getAttribute("data-tab");
    const activeContentClassName = `.operations__content--${contentNo}`;
    currentActiveContent.classList.toggle("operations__content--active");
    document
      .querySelector(activeContentClassName)
      .classList.toggle("operations__content--active");

    currentActiveContent = document.querySelector(activeContentClassName);
  }
});

// MENU FADE ANIMATION

const nav = document.querySelector(".nav");

const handleHover = function (e) {
  console.log(this);
  if (e.target.classList.contains("nav__link")) {
    const logo = document.querySelector(".nav__logo");
    const siblings = document.querySelectorAll(".nav__link");

    console.log(siblings);
    // here we have to use arrow function so this will
    // refer to parent this other wise it is undefined

    siblings.forEach((el) => {
      if (e.target != el) {
        el.style.opacity = this;
        console.log(this);
      }
    });

    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function(e){
//   handleHover(e, 0.5);
// })

// nav.addEventListener('mouseout', function(e){
//   handleHover(e, 1);
// })

// OR USING BIND METHOD

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// sticky nav animation

// bad way because we will be calling the scroll method
// very every time when we scroll so it is bad practice

// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY);
//   const heightHeader = header.getBoundingClientRect().height;
//   const navHeight = nav.getBoundingClientRect().height;
//   if(window.scrollY >= heightHeader-navHeight){
//     nav.classList.add('sticky');
//   }else {
//     nav.classList.remove('sticky');
//   }
// });

// USING INTERSECTION API for sticky nav
const obsCallback = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting == false) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const heightNav = nav.getBoundingClientRect().height;

const obsOption = {
  root: null,
  // second intersecting section will be viewport
  threshold: 0,
  // or 10 % it is an array
  rootMargin: `-${heightNav}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOption);
observer.observe(header);

// SECTION ANIMATION

const obs2Callback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const observer2 = new IntersectionObserver(obs2Callback, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (section) {
  // some users off their js from browser so
  // we have to use to js to hide the sections
  section.classList.add("section--hidden");
  observer2.observe(section);
});

// LAZY IMAGES

const lazyImgs = document.querySelectorAll("img[data-src]");

const callbackImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.setAttribute("src", `${entry.target.getAttribute("data-src")}`);

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const lazyImgObserver = new IntersectionObserver(callbackImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

lazyImgs.forEach(function (lazyImg) {
  lazyImgObserver.observe(lazyImg);
});

// SLIDER COMPONENT
let curSlide = 0;
const slides = document.querySelectorAll(".slide");

slides.forEach(function (slide, key) {
  slide.style.transform = `translate(${key * 100}%)`;
});

const goToSlide = function () {
  let i = curSlide;
  slides.forEach(function (slide) {
    slide.style.transform = `translate(${i * 100}%)`;
    i++;
  });
  focus(-1 * curSlide);
};

const goPreSlide = function () {
  curSlide++;
  if (curSlide == 1) {
    curSlide = -1 * (slides.length - 1);
  }
  goToSlide();
};

const goNextSlide = function () {
  curSlide--;
  if (curSlide == -1 * slides.length) {
    curSlide = 0;
  }
  goToSlide();
};

const sliderBtnLeft = document.querySelector(".slider__btn--left");
sliderBtnLeft.addEventListener("click", goPreSlide);

const sliderBtnRight = document.querySelector(".slider__btn--right");
sliderBtnRight.addEventListener("click", goNextSlide);

// KEYBOARD KEYS FOR LEFT AND RIGHT SCROLL
document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowLeft") {
    goPreSlide();
  } else if (e.key == "ArrowRight") {
    goNextSlide();
  }
});

// USING DOTS TO NAVIGATE THROUGH SLIDER
const dotsContainer = document.querySelector(".dots");
slides.forEach(function (_, i) {
  dotsContainer.insertAdjacentHTML(
    "beforeend",
    `<button class="dots__dot" data-slide="${i}"></button>`
  );
});

dotsContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("dots__dot")) return;
  // curSlide = -1*Number(e.target.getAttribute("data-slide"));
  const { slide } = e.target.dataset;
  curSlide = -1 * Number(slide);
  goToSlide();
});

const focus = function (dotNumber) {
  const dots = document.querySelectorAll(".dots__dot");
  dots.forEach(function (_, key) {
    dots[key].classList.remove("dots__dot--active");
  });
  dots[dotNumber].classList.add("dots__dot--active");
};
focus(0);
