const slides = [];
const url = "https://mocki.io/v1/010175de-0176-440a-9f90-d4a7ca8010cc";
let currentIndex = 0;

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

function getZIndex(slide) {
  return parseInt(slide.style.zIndex, 10);
}

function updateButton() {
    document.getElementById("prev").disabled = false;
    document.getElementById("next").disabled = false;
  if (slides[currentIndex] === slides[0]) {
    document.getElementById("prev").disabled = true;
  }
  if (slides[currentIndex] === slides[slides.length - 1]) {
    document.getElementById("next").disabled = true;
  }
}

function updateSlidesNumber() {
  document.getElementById("slidesNumber").textContent = `${currentIndex + 1}/${
    slides.length
  }`;
}

function slidesMovePrev() {
  for (const slide of slides) {
    const slideZIndex = getZIndex(slide);
    slide.style.zIndex = (slideZIndex + slides.length - 1) % slides.length;
  }
  --currentIndex;
  updateButton();
  updateSlidesNumber();
}

function slidesMoveNext() {
  for (const slide of slides) {
    const slideZIndex = getZIndex(slide);
    slide.style.zIndex = (slideZIndex + 1) % slides.length;
  }
  ++currentIndex;
  updateButton();
  updateSlidesNumber();
}

const fragment = document.createDocumentFragment();
const carousel = document.createElement("div");
carousel.id = "carousel";

function makePrevButton() {
  const prevButton = document.createElement("button");
  prevButton.id = "prev";
  prevButton.style.zIndex = 100;
  const prevIcon = document.createElement("i");
  prevIcon.className = "fa-solid fa-backward";
  prevButton.addEventListener("click", slidesMovePrev);
  fragment.appendChild(prevButton).appendChild(prevIcon);
}

function makeNextButton() {
  const nextButton = document.createElement("button");
  nextButton.id = "next";
  nextButton.style.zIndex = 100;
  const nextIcon = document.createElement("i");
  nextIcon.className = "fa-solid fa-forward";
  nextButton.addEventListener("click", slidesMoveNext);
  fragment.appendChild(nextButton).appendChild(nextIcon);
}

function makeSlidesNumber() {
  const slidesNumber = document.createElement("p");
  slidesNumber.id = "slidesNumber";
  slidesNumber.textContent = `${slides[0].index + 1}/${slides.length}`;
  carousel.appendChild(slidesNumber);
}

function makeSlide(images) {
  const slidesContainer = document.createElement("div");
  slidesContainer.id = "slidesContainer";
  slidesContainer.className = "js-slides-container";
  images.forEach((image, index) => {
    const slide = document.createElement("img");
    slide.className = "js-slide-img";
    slide.src = image.img;
    slide.alt = image.alt;
    slide.index = index;
    slide.style.zIndex = images.length - 1 - slide.index;
    fragment.appendChild(slide);
    slides.push(slide);
  });
  slides[currentIndex].classList.add("js-current");
  makePrevButton();
  makeNextButton();
  document.body
    .appendChild(carousel)
    .appendChild(slidesContainer)
    .appendChild(fragment);
  makeSlidesNumber();
  updateButton(slides);
}

async function fetchData(url) {
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
  }
}

async function fetchMakeSlide() {
  const responseData = await fetchData(url);
  if (responseData) {
    makeSlide(responseData);
  }
}

fetchMakeSlide();