const articlesAPI = [
  //main
  "https://mocki.io/v1/025fa3d8-7096-433d-8766-8392ceab92b1",
  //economy
  "https://mocki.io/v1/d408a3b3-9504-4c43-bf12-6773efb74361",
  //entertainment
  "https://mocki.io/v1/7b94b922-6130-44a6-b0c0-179cf5f76af5",
  //sports
  "https://mocki.io/v1/e30aa30c-649c-49ce-9d75-a4e9c4caca51",
];

const errorMessage = document.createElement("p");
const tabArea = document.getElementById("js-ul");
const articleArea = document.createElement("div");

async function fetchRenderData() {
  const responseData = await Promise.all(articlesAPI.map(fetchData));
  console.log(responseData);
  if (responseData) {
    renderData(responseData);
  }
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
  }
}

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

openButton.addEventListener("click", () => {
  resetPrompt();
  nameBox.value = "";
  numberBox.value = "";
  modal.classList.remove("hidden");
  mask.classList.remove("hidden");
  openButton.classList.add("hidden");
  fetchButton.setAttribute("disabled", "true");
  nameBox.focus();
});

fetchButton.addEventListener("click", () => {
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
  resetValidation();
});

closeButton.addEventListener("click", () => {
  closeModal();
  resetValidation();
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

let isValidateName = false;
let isValidateNumber = false;

function validatePattern(inputBox, validPattern, errorMessage) {
  const isValue = checkInputValue(inputBox, validPattern, errorMessage);
  if (inputBox === nameBox) {
    isValidateName = isValue;
  } else if (inputBox === numberBox) {
    isValidateNumber = isValue;
  }
  if (isValue) {
    resetPrompt();
    checkEnableSubmit();
  }
}

function checkInputValue(inputBox, regExp, errorMessage) {
  const value = inputBox.value;
  const result = regExp.test(value);
  if (!result) {
    invalidInput(errorMessage);
  }
  return result;
}

function resetPrompt() {
  promptMessage.textContent = "入力後、取得ボタンを押してね";
  promptMessage.style.color = "black";
}

function resetValidation() {
  isValidateName = false;
  isValidateNumber = false;
}

function checkEnableSubmit() {
  if (isValidateName && isValidateNumber) {
    validInput();
  } else {
    invalidInput();
  }
}

function invalidInput(errorMessage) {
  promptMessage.textContent = errorMessage;
  promptMessage.style.color = "red";
  fetchButton.disabled = true;
}

function validInput() {
  promptMessage.textContent = "入力後、取得ボタンを押してね";
  promptMessage.style.color = "black";
  fetchButton.disabled = false;
}

nameBox.addEventListener("input", () =>
  validatePattern(nameBox, namePattern, "名前を入力ください")
);
numberBox.addEventListener("input", () =>
  validatePattern(numberBox, numberPattern, "半角数字を入力ください")
);
