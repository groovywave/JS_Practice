const slides = [];
const images = [];
const url = "https://mocki.io/v1/010175de-0176-440a-9f90-d4a7ca8010cc";
let currentIndex;

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

function updateButton(slides) {
  const activeSlide = slides.find(
    (slide) => getZIndex(slide) === slides.length - 1
  );
  activeSlide.parentNode.querySelector(".current").classList.remove("current");
  activeSlide.classList.add("current");
  activeSlide.parentNode.querySelector(".hidden")?.classList.remove("hidden");
  if (activeSlide === slides[0]) {
    document.getElementById("prev").classList.add("hidden");
  }
  if (activeSlide === slides[slides.length - 1]) {
    document.getElementById("next").classList.add("hidden");
  }
}

function slidesMovePrev() {
  for (const slide of slides) {
    const slideZIndex = getZIndex(slide);
    slide.style.zIndex = (slideZIndex + slides.length - 1) % slides.length;
  }
  updateButton(slides);
}

function slidesMoveNext() {
  for (const slide of slides) {
    const slideZIndex = getZIndex(slide);
    slide.style.zIndex = (slideZIndex + 1) % slides.length;
  }
  updateButton(slides);
}

function renderData(images) {
  const fragment = document.createDocumentFragment();
  const carousel = document.createElement("section");
  carousel.id = "carousel";
  const carouselContainer = document.createElement("div");
  carouselContainer.id = "carouselContainer";
  carouselContainer.className = "carousel-container";
  let i = 0;
  for (const image of images) {
    const slide = document.createElement("img");
    slide.className = "carousel-img";
    slide.src = image.img;
    slide.alt = image.alt;
    i = --i;
    slide.style.zIndex = images.length + i;
    fragment.appendChild(slide);
    slides.push(slide);
  }
  slides[0].classList.add("current");
  currentIndex = images.length - 1;

  const prevButton = document.createElement("button");
  prevButton.id = "prev";
  prevButton.style.zIndex = 100;
  const prevIcon = document.createElement("i");
  prevIcon.className = "fa-solid fa-backward";
  prevButton.addEventListener("click", slidesMovePrev);
  fragment.appendChild(prevButton).appendChild(prevIcon);

  const nextButton = document.createElement("button");
  nextButton.id = "next";
  nextButton.style.zIndex = 100;
  const nextIcon = document.createElement("i");
  nextIcon.className = "fa-solid fa-forward";
  nextButton.addEventListener("click", slidesMoveNext);
  fragment.appendChild(nextButton).appendChild(nextIcon);

  document.body
    .appendChild(carousel)
    .appendChild(carouselContainer)
    .appendChild(fragment);

  updateButton(slides);
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
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

async function fetchRenderData() {
  const responseData = await fetchData(url);
  if (responseData) {
    renderData(responseData);
  }
}

fetchRenderData();
