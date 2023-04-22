const ul = document.getElementById("js-ul");
const fetchButton = document.getElementById("js-fetch-button");
const fetchErrorMessage = document.createElement("p");
const openButton = document.getElementById("js-open-button");
const closeButton = document.getElementById("js-close-button");
const backButton = document.getElementById("js-back-button");
const modal = document.getElementById("js-modal");
const mask = document.getElementById("js-mask");

const url = "https://mocki.io/v1/1c058349-634e-462a-ad37-14f135e59b99";
// const url = ""; //Not JSON
// const url = "https://mocki.io/v1/55dc6233-a8fe-44ca-8906-3de313545ce8"; //No data
// const url = "https://mocki.io/v1/1c058349-634e-"; //Failed to fetch

function renderStatus(response) {
  fetchErrorMessage.id = "render-status";
  fetchErrorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(p);
}

function displayInfo(error) {
  fetchErrorMessage.id = "display-info";
  fetchErrorMessage.textContent = error;
  document.body.appendChild(fetchErrorMessage);
}

function renderCircle() {
  const loadingCircle = document.createElement("img");
  loadingCircle.src = "img/loading-circle.gif";
  loadingCircle.alt = "ローディング画像";
  loadingCircle.id = "loading-circle";
  ul.appendChild(loadingCircle);
}

function removeCircle() {
  document.getElementById("loading-circle").remove();
}

function renderData(menus) {
  const fragment = document.createDocumentFragment();
  fragment.id = "fragment";
  for (const menu of menus) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    a.href = menu.to;
    a.textContent = menu.text;
    img.src = menu.img;
    img.alt = menu.alt;
    fragment
      .appendChild(li)
      .appendChild(a)
      .insertAdjacentElement("afterbegin", img);
  }
  ul.appendChild(fragment);
}

async function fetchData(url) {
  renderCircle();
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    if (!response.ok) {
      renderStatus(response);
      console.error(`${response.status}:${response.statusText}`);
    }
    if (!responseData.length) {
      displayInfo("no data");
    }
    return responseData;
  } catch (error) {
    displayInfo(error);
  } finally {
    removeCircle();
    backButton.classList.remove("frame-out");
  }
}

async function fetchRenderData() {
  const responseData = await fetchData(url);
  if (responseData) {
    renderData(responseData);
  }
}

openButton.addEventListener("click", () => {
  modal.classList.remove("frame-out");
  mask.classList.remove("hidden");
  openButton.classList.add("disappear");
  openButton.setAttribute("aria-hidden", "true");
});

fetchButton.addEventListener("click", () => {
  fetchRenderData();
  modal.classList.add("frame-out");
  mask.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  mask.setAttribute("aria-hidden", "true");
});

mask.addEventListener("click", () => {
  modal.classList.add("frame-out");
  mask.classList.add("hidden");
  openButton.classList.remove("disappear");
  modal.setAttribute("aria-hidden", "true");
  mask.setAttribute("aria-hidden", "true");
});

closeButton.addEventListener("click", () => {
  mask.click();
});

backButton.addEventListener("click", () => {
  // document.body.removeChild(ul);
  backButton.classList.add("frame-out");
  openButton.classList.remove("disappear");
  backButton.setAttribute("aria-hidden", "true");
  if (fetchErrorMessage) {
    fetchErrorMessage.remove();
  }
  while (ul.firstChild) {
    ul.firstChild.remove();
  }
});
