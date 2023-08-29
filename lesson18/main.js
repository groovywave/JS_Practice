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
}

function updateButtons() {
  document.getElementById("js-prev").disabled = false;
  document.getElementById("js-next").disabled = false;
  if (currentIndex === 0) {
    document.getElementById("js-prev").disabled = true;
  }
  if (currentIndex === slides.length - 1) {
    document.getElementById("js-next").disabled = true;
  }
}

function updateSlidesNumber() {
  document.getElementById("js-slidesNumber").textContent = `${
    currentIndex + 1
  }/${slides.length}`;
}

function slidesMovePrev() {
  --currentIndex;
  updateSlides();
  updateButtons();
  updateSlidesNumber();
  updateDots();
}

function slidesMoveNext() {
  ++currentIndex;
  updateSlides();
  updateButtons();
  updateSlidesNumber();
  updateDots();
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
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      currentIndex = i;
      updateDots();
      updateButtons();
      updateSlides();
      updateSlidesNumber();
    });
    dots.push(button);
    dotsContainer.appendChild(button);
  }

  dots[0].id = "js-currentDot";
  carousel.appendChild(dotsContainer);
}

function updateDots() {
  document.getElementById("js-currentDot").id = "";
  dots[currentIndex].id = "js-currentDot";
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

fetchMakeSlide();
