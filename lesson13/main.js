const ul = document.getElementById("js-ul");
const button = document.getElementById("js-button");
const p = document.createElement("p");
const open = document.getElementById("js-open");
const back = document.getElementById("js-back");
const modal = document.getElementById("js-modal");
const mask = document.getElementById("js-mask");

const url = "https://mocki.io/v1/1c058349-634e-462a-ad37-14f135e59b99";
// const url = ""; //Not JSON
// const url = "https://mocki.io/v1/55dc6233-a8fe-44ca-8906-3de313545ce8"; //No data
// const url = "https://mocki.io/v1/1c058349-634e-"; //Failed to fetch

function renderStatus(response) {
  p.id = "render-status";
  p.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(p);
}

function displayInfo(error) {
  p.id = "display-info";
  p.textContent = error;
  document.body.appendChild(p);
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
    li.id = "js-li";
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
    console.log(response);
    const responseData = await response.json();
    console.log(responseData);
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
    back.classList.remove("hidden");
  }
}

async function fetchRenderData() {
  const responseData = await fetchData(url);
  if (responseData) {
    renderData(responseData);
  }
}

open.addEventListener('click', () => {
  modal.classList.remove("hidden");
  mask.classList.remove("hidden");
});

button.addEventListener("click", () => {
  fetchRenderData();
  modal.classList.add("hidden");
  mask.classList.add("hidden");
  open.classList.add("hidden");
});

mask.addEventListener('click', () => {
  modal.classList.add("hidden");
  mask.classList.add("hidden");
});

back.addEventListener('click', () => {
  back.classList.add("hidden");
  open.classList.remove("hidden");
  const p = document.querySelector("#render-status, #display-info");
  if (p) {
    p.remove();
  }
  const fragment = getElementById("fragment");
  if (fragment) {
    fragment.remove();
    // fragment.parentNode.removeChild(fragment);
  } 
});
