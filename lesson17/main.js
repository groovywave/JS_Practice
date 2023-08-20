const slides = [];
const images = [];
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

function slidesMovePrev() {}
function slidesMoveNext() {}

function renderData(images) {
  const fragment = document.createDocumentFragment();
  const carousel = document.createElement("section");
  carousel.id = "carousel";
  const carouselContainer = document.createElement("div");
  carouselContainer.id = "carouselContainer";
  carouselContainer.className = "carousel-container";
  let i = 0;
  for (const image of images) {
    const img = document.createElement("img");
    img.className = "carousel-img";
    img.src = image.img;
    img.alt = image.alt;
    i = --i;
    img.style.zIndex = images.length + i;
    fragment.appendChild(img);
  }

  const prevButton = document.createElement("button");
  prevButton.id = "prev";
  prevButton.style.zIndex = 100;
  const prevIcon = document.createElement("i")
  prevIcon.className="fa-solid fa-backward"
  prevButton.addEventListener("click", slidesMovePrev());
  fragment.appendChild(prevButton).appendChild(prevIcon);
  
  const nextButton = document.createElement("button");
  nextButton.id = "next";
  nextButton.style.zIndex = 100;
  const nextIcon = document.createElement("i")
  nextIcon.className="fa-solid fa-forward"
  prevButton.addEventListener("click", slidesMoveNext());
  fragment.appendChild(nextButton).appendChild(nextIcon);
  
  document.body
    .appendChild(carousel)
    .appendChild(carouselContainer)
    .appendChild(fragment);
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
