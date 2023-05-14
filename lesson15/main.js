const ul = document.getElementById("js-ul");
const fetchButton = document.getElementById("js-fetch-button");
const errorMessage = document.createElement("p");
const openButton = document.getElementById("js-open-button");
const closeButton = document.getElementById("js-close-button");
const backButton = document.getElementById("js-back-button");
const modal = document.getElementById("js-modal");
const mask = document.getElementById("js-mask");
const promptMessage = document.getElementById("js-prompt-message");
const nameLabel = document.getElementById("js-nameLabel");
const numberLabel = document.getElementById("js-number-label");
const nameBox = document.getElementById("js-name-box");
const numberBox = document.getElementById("js-number-box");
const personName =
  /^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Z]+([ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Z\s]*)?$/;

// const personName =
// /^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Z]+([ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Z\s]*)?([ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Z]*)?$/;
const halfWidthDigits = /^-?\d+(\.?\d*)([eE][+-]?\d+)?$/;
const url = "https://mocki.io/v1/1c058349-634e-462a-ad37-14f135e59b99";
// const url = ""; //Not JSON
// const url = "https://mocki.io/v1/55dc6233-a8fe-44ca-8906-3de313545ce8"; //No data
// const url = "https://mocki.io/v1/1c058349-634e-"; //Failed to fetch

function renderStatus(response) {
  errorMessage.id = "render-status";
  errorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(errorMessage);
}

function displayInfo(error) {
  errorMessage.id = "display-info";
  errorMessage.textContent = error;
  document.body.appendChild(errorMessage);
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
    backButton.classList.remove("hidden");
  }
}

async function fetchRenderData(inputName, inputNumber) {
  const responseData = await fetchData(url);
  if (responseData) {
    renderData(responseData);
    console.log(inputName, inputNumber); //show inputted number
  }
}

openButton.addEventListener("click", () => {
  promptMessage.textContent = "入力後ボタンを押してください";
  promptMessage.style.color = "black";
  nameBox.value = "";
  numberBox.value = "";
  setTimeout(() => {
    nameBox.focus();
  }, 0);
  modal.classList.remove("hidden");
  mask.classList.remove("hidden");
  openButton.classList.add("hidden");
  fetchButton.setAttribute("disabled", "true");
});

fetchButton.addEventListener("click", () => {
  if (fetchButton.hasAttribute("disabled")) {
    return;
  }
  const inputName = nameBox.value;
  const inputNumber = numberBox.value;
  fetchRenderData(inputName, inputNumber);
  modal.classList.add("hidden");
  mask.classList.add("hidden");
});

function closeModal() {
  modal.classList.add("hidden");
  mask.classList.add("hidden");
  openButton.classList.remove("hidden");
}

mask.addEventListener("click", () => {
  closeModal();
});

closeButton.addEventListener("click", () => {
  closeModal();
});

backButton.addEventListener("click", () => {
  backButton.classList.add("hidden");
  openButton.classList.remove("hidden");
  if (errorMessage) {
    errorMessage.remove();
  }
  while (ul.firstChild) {
    ul.firstChild.remove();
  }
});

function checkInput() {
  if (checkInputName() && checkInputNumber()) {
    validInput();
  }
}

function checkInputName() {
  const inputName = nameBox.value;
  if (inputName === "") {
    return false;
  } else if (!inputName.match(personName)) {
    invalidInputName();
  } else {
    return true;
  }
}

function checkInputNumber() {
  const inputNumber = numberBox.value;
  if (inputNumber === "") {
    return false;
  } else if (!inputNumber.match(halfWidthDigits)) {
    invalidInputNumber();
  } else {
    return true;
  }
}

function invalidInputName() {
  nameLabel.textContent = "数字や記号を入力しないでください";
  // promptMessage.textContent = "数字や記号を入力しないでください";
  promptMessage.style.color = "red";
  fetchButton.disabled = true;
}

function invalidInputNumber() {
  promptMessage.textContent = "半角数値を入力ください";
  promptMessage.style.color = "red";
  fetchButton.disabled = true;
}

function validInput() {
  promptMessage.textContent = "入力後ボタンを押してください";
  promptMessage.style.color = "black";
  fetchButton.disabled = false;
}
nameBox.addEventListener("input", checkInput);
numberBox.addEventListener("input", checkInput);
checkInput();
