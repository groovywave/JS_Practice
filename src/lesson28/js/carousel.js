import { renderCircle, removeCircle } from './modules/renderRemoveCircle.js';
import { displayInfo } from '../js/modules/displayInfo.js';

let slides = [];
const url = 'https://mocki.io/v1/65b524d0-ad9f-46e4-baa0-c14e035975a9';
let currentIndex = 0;
let dots = [];

function renderStatus(response) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(errorMessage);
}

function updateSlides() {
  document.getElementById('js-currentSlide').id = '';
  slides[currentIndex].id = 'js-currentSlide';
  document
    .getElementsByClassName('current-slide')[0]
    .classList.remove('current-slide');
  slides[currentIndex].classList.add('current-slide');
}

function updateButtons() {
  document.getElementById('js-prev').disabled = false;
  document.getElementById('js-next').disabled = false;
  if (currentIndex === 0) {
    document.getElementById('js-prev').disabled = true;
  }
  if (currentIndex === slides.length - 1) {
    document.getElementById('js-next').disabled = true;
  }
}

function updateSlideNumber() {
  document.getElementById('js-slidesNumber').textContent = `${
    currentIndex + 1
  }/${slides.length}`;
}

function slidesMovePrev() {
  --currentIndex;
  updateSlides();
  updateButtons();
  updateSlideNumber();
  updateDots();
  resetSlideshowInterval();
}

function slidesMoveNext() {
  ++currentIndex;
  updateSlides();
  updateButtons();
  updateSlideNumber();
  updateDots();
  resetSlideshowInterval();
}

const fragment = document.createDocumentFragment();
const carousel = document.createElement('div');
carousel.className = 'my-8 flex flex-col justify-center align-middle';

function makePrevButton() {
  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.id = 'js-prev';
  prevButton.classList.add('prev');
  prevButton.style.zIndex = 100;
  const prevIcon = document.createElement('i');
  prevIcon.classList.add('fa-solid', 'fa-backward');
  prevButton.addEventListener('click', slidesMovePrev);
  fragment.appendChild(prevButton).appendChild(prevIcon);
}

function makeNextButton() {
  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.id = 'js-next';
  nextButton.classList.add('next');
  nextButton.style.zIndex = 100;
  const nextIcon = document.createElement('i');
  nextIcon.classList.add('fa-solid', 'fa-forward');
  nextButton.addEventListener('click', slidesMoveNext);
  fragment.appendChild(nextButton).appendChild(nextIcon);
}

function makeSlidesNumber() {
  const slidesNumber = document.createElement('p');
  slidesNumber.id = 'js-slidesNumber';
  slidesNumber.className = 'justify-center text-center';
  slidesNumber.textContent = `${currentIndex + 1}/${slides.length}`;
  carousel.appendChild(slidesNumber);
}

function makeDots() {
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots-container');
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('button');
    dot.dataset.index = i;
    dots.push(dot);
    dotsContainer.appendChild(dot);
  }
  dotsContainer.addEventListener('click', e => {
    if (e.target === e.currentTarget) return;
    currentIndex = parseInt(e.target.dataset.index, 10);
    updateDots();
    updateButtons();
    updateSlides();
    updateSlideNumber();
    resetSlideshowInterval();
  });

  dots[0].id = 'js-currentDot';
  dots[0].classList.add('current-dot');
  carousel.appendChild(dotsContainer);
}

function updateDots() {
  document.getElementById('js-currentDot').id = '';
  dots[currentIndex].id = 'js-currentDot';
  document
    .getElementsByClassName('current-dot')[0]
    .classList.remove('current-dot');
  dots[currentIndex].classList.add('current-dot');
}

function makeSlide(images) {
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'relative mx-auto my-4 h-52 w-80';
  images.forEach(image => {
    const slide = document.createElement('img');
    slide.classList.add('slide-img');
    slide.src = image.img;
    slide.alt = image.alt;
    fragment.appendChild(slide);
    slides.push(slide);
  });
  slides[currentIndex].id = 'js-currentSlide';
  slides[currentIndex].classList.add('current-slide');
  makePrevButton();
  makeNextButton();
  document
    .getElementById('js-carouselArea')
    .appendChild(carousel)
    .appendChild(slidesContainer)
    .appendChild(fragment);
  makeSlidesNumber();
  updateButtons();
  makeDots();
}

async function fetchData(url) {
  renderCircle(document.body);
  try {
    const response = await new Promise(resolve => {
      setTimeout(() => {
        resolve(fetch(url));
      }, 3000);
    });
    if (!response.ok) {
      renderStatus(response);
      console.error(`${response.status}:${response.statusText}`);
    }
    const jsonResponse = await response.json();
    const responseData = jsonResponse.data;
    if (!responseData.length) {
      displayInfo('no data');
    }
    return responseData;
  } catch (error) {
    displayInfo(error);
  } finally {
    removeCircle();
  }
}

async function fetchMakeSlide() {
  const responseData = await fetchData(url);
  if (responseData) {
    makeSlide(responseData);
  }
}

let intervalId;
function startAutoPlaySlides() {
  intervalId = setInterval(() => {
    currentIndex = ++currentIndex % slides.length;
    updateSlides();
    updateButtons();
    updateSlideNumber();
    updateDots();
  }, 3000);
}

function resetSlideshowInterval() {
  clearInterval(intervalId);
  startAutoPlaySlides();
}

async function init() {
  await fetchMakeSlide();
  startAutoPlaySlides();
}

init();
