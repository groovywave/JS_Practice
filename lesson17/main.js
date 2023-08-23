const slides = [];
const url = "https://mocki.io/v1/010175de-0176-440a-9f90-d4a7ca8010cc";

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
  const currentSlide = slides.find(
    (slide) => getZIndex(slide) === slides.length - 1
  );
  currentSlide.parentNode.querySelector(".js-current").classList.remove("js-current");
  currentSlide.classList.add("js-current");
  currentSlide.parentNode.querySelector(".js-hidden")?.classList.remove("js-hidden");
  if (currentSlide === slides[0]) {
    document.getElementById("prev").classList.add("js-hidden");
  }
  if (currentSlide === slides[slides.length - 1]) {
    document.getElementById("next").classList.add("js-hidden");
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
  carouselContainer.className = "js-carousel-container";
  let i = 0;
  for (const image of images) {
    const slide = document.createElement("img");
    slide.className = "js-carousel-img";
    slide.src = image.img;
    slide.alt = image.alt;
    --i;
    slide.style.zIndex = images.length + i;
    fragment.appendChild(slide);
    slides.push(slide);
  }
  slides[0].classList.add("js-current");

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

async function fetchRenderData() {
  const responseData = await fetchData(url);
  if (responseData) {
    renderData(responseData);
  }
}

fetchRenderData();
