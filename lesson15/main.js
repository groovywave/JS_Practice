const ul = document.getElementById("js-ul");
const fetchButton = document.getElementById("js-fetch-button");
const errorMessage = document.createElement("p");
const openButton = document.getElementById("js-open-button");
const closeButton = document.getElementById("js-close-button");
const backButton = document.getElementById("js-back-button");
const modal = document.getElementById("js-modal");
const mask = document.getElementById("js-mask");
const promptMessage = document.getElementById("js-prompt-message");
const nameLabel = document.getElementById("js-name-label");
const numberLabel = document.getElementById("js-number-label");
const nameBox = document.getElementById("js-name-box");
const numberBox = document.getElementById("js-number-box");
const namePattern =
  /^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Zａ-ｚＡ-Ｚ]+[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Zａ-ｚＡ-Ｚ\s]*$/;
// /^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Zａ-ｚＡ-Ｚ]+([ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Zａ-ｚＡ-Ｚ\s]*)?([ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Zａ-ｚＡ-Ｚ]*)?$/;
const numberPattern = /^-?\d+(\.?\d*)([eE][+-]?\d+)?$/;
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
  nameLabel.textContent = "名前";
  nameLabel.style.color = "black";
  numberLabel.textContent = "数字";
  numberLabel.style.color = "black";
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

// const isCheckThisValue = false;
// const isCheckNumber = false;

function validateInputData(inputBox, validPattern, errorMessage) {
  const isCheckThisValue = checkInputValue(inputBox, validPattern);
  console.log("isCheckThisValue:", isCheckThisValue);
  if (!isCheckThisValue) {
    invalidInput(errorMessage);
  } else {
    resetPrompt();
    let isCheckTheOtherValue;
    if (inputBox === nameBox) {
      isCheckTheOtherValue = checkInputValue(numberBox, numberPattern);
    } else if (inputBox === numberBox) {
      isCheckTheOtherValue = checkInputValue(nameBox, namePattern);
    }
    enableSubmit(isCheckThisValue, isCheckTheOtherValue);
    console.log(isCheckThisValue, isCheckTheOtherValue);
  }
}

function checkInputValue(inputBox, regExp) {
  const value = inputBox.value;
  if (value === '""') {
    resetPrompt();
  } else if (!value.match(regExp)) {
    return false;
  } else {
    return true;
  }
}

function resetPrompt() {
  promptMessage.textContent = "入力後ボタンを押してください";
  promptMessage.style.color = "black";
}

function enableSubmit(isValueOne, isValueTheOther) {
  console.log(isValueOne, isValueTheOther);
  if (isValueOne && isValueTheOther) {
    validInput();
  }
}

function invalidInput(errorMessage) {
  console.log(errorMessage);
  promptMessage.textContent = errorMessage;
  promptMessage.style.color = "red";
  fetchButton.disabled = true;
}

function validInput() {
  promptMessage.textContent = "入力後ボタンを押してください";
  promptMessage.style.color = "black";
  fetchButton.disabled = false;
}

nameBox.addEventListener("keyup", () =>
  validateInputData(nameBox, namePattern, "名前を入力ください")
);
numberBox.addEventListener("keyup", () =>
  validateInputData(numberBox, numberPattern, "半角数字を入力ください")
);
