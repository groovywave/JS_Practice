let slides = [];
const url = "https://mocki.io/v1/010175de-0176-440a-9f90-d4a7ca8010cc";
let currentIndex = 0;
let dots = [];

function renderCircle() {
  const loadingCircleContainer = document.createElement("div");
  loadingCircleContainer.id = "js-loadingCircleContainer";
  loadingCircleContainer.className = "loading-circle-container";
  const loadingCircle = document.createElement("img");
  loadingCircle.src = "img/loading-circle.gif";
  loadingCircle.alt = "ローディング画像";
  document.body.appendChild(loadingCircleContainer).appendChild(loadingCircle);
}

function removeCircle() {
  document.getElementById("js-loadingCircleContainer").remove();
}

function renderStatus(response) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(errorMessage);
}

function displayInfo(error) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = error;
  document.body.appendChild(errorMessage);
}

function updateSlides() {
  document.getElementById("js-currentSlide").id = "";
  slides[currentIndex].id = "js-currentSlide";
  document
    .getElementsByClassName("current-slide")[0]
    .classList.remove("current-slide");
  slides[currentIndex].classList.add("current-slide");
}

function updateButtons() {
  document.getElementById("js-prev").disabled = false;
  document.getElementById("js-next").disabled = false;
  document
    .getElementsByClassName("disabled-button")[0]
    ?.classList.remove("disabled-button");
  if (currentIndex === 0) {
    document.getElementById("js-prev").disabled = true;
    document.getElementById("js-prev").classList.add("disabled-button");
  }
  if (currentIndex === slides.length - 1) {
    document.getElementById("js-next").disabled = true;
    document.getElementById("js-next").classList.add("disabled-button");
  }
}

function updateSlideNumber() {
  document.getElementById("js-slidesNumber").textContent = `${
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
const carousel = document.createElement("div");
carousel.className = "carousel";

function makePrevButton() {
  const prevButton = document.createElement("button");
  prevButton.id = "js-prev";
  prevButton.className = "prev";
  prevButton.style.zIndex = 100;
  const prevIcon = document.createElement("i");
  prevIcon.className = "fa-solid fa-backward";
  prevButton.addEventListener("click", slidesMovePrev);
  fragment.appendChild(prevButton).appendChild(prevIcon);
}

function makeNextButton() {
  const nextButton = document.createElement("button");
  nextButton.id = "js-next";
  nextButton.className = "next";
  nextButton.style.zIndex = 100;
  const nextIcon = document.createElement("i");
  nextIcon.className = "fa-solid fa-forward";
  nextButton.addEventListener("click", slidesMoveNext);
  fragment.appendChild(nextButton).appendChild(nextIcon);
}

function makeSlidesNumber() {
  const slidesNumber = document.createElement("p");
  slidesNumber.id = "js-slidesNumber";
  slidesNumber.textContent = `${currentIndex + 1}/${slides.length}`;
  carousel.appendChild(slidesNumber);
}

function makeDots() {
  const dotsContainer = document.createElement("div");
  dotsContainer.id = "dotsContainer";
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("button");
    dot.dataset.index = i;
    dots.push(dot);
    dotsContainer.appendChild(dot);
  }
  dotsContainer.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) return;
    currentIndex = parseInt(e.target.dataset.index, 10);
    updateDots();
    updateButtons();
    updateSlides();
    updateSlideNumber();
    resetSlideshowInterval();
  });

  dots[0].id = "js-currentDot";
  dots[0].classList.add("current-dot");
  carousel.appendChild(dotsContainer);
}

function updateDots() {
  document.getElementById("js-currentDot").id = "";
  dots[currentIndex].id = "js-currentDot";
  document
    .getElementsByClassName("current-dot")[0]
    .classList.remove("current-dot");
  dots[currentIndex].classList.add("current-dot");
}

function makeSlide(images) {
  const slidesContainer = document.createElement("div");
  slidesContainer.className = "slides-container";
  images.forEach((image) => {
    const slide = document.createElement("img");
    slide.className = "slide-img";
    slide.src = image.img;
    slide.alt = image.alt;
    fragment.appendChild(slide);
    slides.push(slide);
  });
  slides[currentIndex].id = "js-currentSlide";
  slides[currentIndex].classList.add("current-slide");
  makePrevButton();
  makeNextButton();
  document.body
    .appendChild(carousel)
    .appendChild(slidesContainer)
    .appendChild(fragment);
  makeSlidesNumber();
  updateButtons();
  makeDots();
}

async function fetchData(url) {
  renderCircle();
  try {
    const response = await new Promise((resolve) => {
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
      displayInfo("no data");
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
function advanceSlidesEvery3Sec() {
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
  advanceSlidesEvery3Sec();
}

async function init() {
  await fetchMakeSlide();
  advanceSlidesEvery3Sec();
}

init();
