// import { format, differenceInCalendarDays } from "date-fns";
// const tabMenuList = document.getElementById("js-tab-menu__list");
const tabArea = getElementById("js-ul");
const menuItems = document.querySelectorAll(".menu li a");
const contents = document.querySelectorAll(".content");

menuItems.forEach((clickedItem) => {
  clickedItem.addEventListener("click", (e) => {
    console.log(e);
    e.preventDefault();
    //a タグの規定の動作（リンク先にページを遷移する）を無効化
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    clickedItem.classList.add("active");

    contents.forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(clickedItem.dataset.id).classList.add("active");
    //clickedItem.dataset.id で取得した a タグの data-id を document.getElementById() の引数に ID の名前として渡すことによって、その data-id と同名の ID をもつ section タグを取得し、それに active クラスを付与しているので、a タグではなく section タグに active クラスがつきます。
  });
});

// const ul = document.getElementById("js-ul");
// const fetchButton = document.getElementById("js-fetch-button");
// const errorMessage = document.createElement("p");
// const openButton = document.getElementById("js-open-button");
// const closeButton = document.getElementById("js-close-button");
// const backButton = document.getElementById("js-back-button");
// const modal = document.getElementById("js-modal");
// const mask = document.getElementById("js-mask");
// const promptMessage = document.getElementById("js-prompt-message");
// const nameBox = document.getElementById("js-name-box");
// const numberBox = document.getElementById("js-number-box");
// const namePattern =
//   /^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Zａ-ｚＡ-Ｚ]+[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Zａ-ｚＡ-Ｚ\s]*$/;
// //https://arc-tech.hatenablog.com/entry/2021/01/20/105620
// const numberPattern = /^-?\d+(\.?\d*)([eE][+-]?\d+)?$/;
// const url = "https://mocki.io/v1/1c058349-634e-462a-ad37-14f135e59b99";

// function renderStatus(response) {
//   errorMessage.id = "render-status";
//   errorMessage.textContent = `${response.status}:${response.statusText}`;
//   document.body.appendChild(errorMessage);
// }

// function displayInfo(error) {
//   errorMessage.id = "display-info";
//   errorMessage.textContent = error;
//   document.body.appendChild(errorMessage);
// }

// function renderCircle() {
//   const loadingCircle = document.createElement("img");
//   loadingCircle.src = "img/loading-circle.gif";
//   loadingCircle.alt = "ローディング画像";
//   loadingCircle.id = "loading-circle";
//   ul.appendChild(loadingCircle);
// }

// function removeCircle() {
//   document.getElementById("loading-circle").remove();
// }

// function renderData(menus) {
//   const fragment = document.createDocumentFragment();
//   for (const menu of menus) {
//     const li = document.createElement("li");
//     const a = document.createElement("a");
//     const img = document.createElement("img");
//     a.href = menu.to;
//     a.textContent = menu.text;
//     img.src = menu.img;
//     img.alt = menu.alt;
//     fragment
//       .appendChild(li)
//       .appendChild(a)
//       .insertAdjacentElement("afterbegin", img);
//   }
//   ul.appendChild(fragment);
// }

// async function fetchData(url) {
//   renderCircle();
//   try {
//     const response = await fetch(url);
//     const responseData = await response.json();
//     if (!response.ok) {
//       renderStatus(response);
//       console.error(`${response.status}:${response.statusText}`);
//     }
//     if (!responseData.length) {
//       displayInfo("no data");
//     }
//     return responseData;
//   } catch (error) {
//     displayInfo(error);
//   } finally {
//     removeCircle();
//     backButton.classList.remove("hidden");
//   }
// }

// async function fetchRenderData(inputNumber) {
//   const responseData = await fetchData(url);
//   if (responseData) {
//     renderData(responseData);
//     console.log(inputNumber); //show inputted number
//   }
// }

// openButton.addEventListener("click", () => {
//   resetPrompt();
//   nameBox.value = "";
//   numberBox.value = "";
//   modal.classList.remove("hidden");
//   mask.classList.remove("hidden");
//   openButton.classList.add("hidden");
//   fetchButton.setAttribute("disabled", "true");
//   nameBox.focus();
// });

// fetchButton.addEventListener("click", () => {
//   const inputName = nameBox.value;
//   const inputNumber = numberBox.value;
//   fetchRenderData(inputName, inputNumber);
//   modal.classList.add("hidden");
//   mask.classList.add("hidden");
// });

// function closeModal() {
//   modal.classList.add("hidden");
//   mask.classList.add("hidden");
//   openButton.classList.remove("hidden");
// }

// mask.addEventListener("click", () => {
//   closeModal();
//   resetValidation();
// });

// closeButton.addEventListener("click", () => {
//   closeModal();
//   resetValidation();
// });

// backButton.addEventListener("click", () => {
//   backButton.classList.add("hidden");
//   openButton.classList.remove("hidden");
//   if (errorMessage) {
//     errorMessage.remove();
//   }
//   while (ul.firstChild) {
//     ul.firstChild.remove();
//   }
// });

// let isValidateName = false;
// let isValidateNumber = false;

// function validatePattern(inputBox, validPattern, errorMessage) {
//   const isValue = checkInputValue(inputBox, validPattern, errorMessage);
//   if (inputBox === nameBox) {
//     isValidateName = isValue;
//   } else if (inputBox === numberBox) {
//     isValidateNumber = isValue;
//   }
//   if (isValue) {
//     resetPrompt();
//     checkEnableSubmit();
//   }
// }

// function checkInputValue(inputBox, regExp, errorMessage) {
//   const value = inputBox.value;
//   const result = regExp.test(value);
//   if (!result) {
//     invalidInput(errorMessage);
//   }
//   return result;
// }

// function resetPrompt() {
//   promptMessage.textContent = "入力後、取得ボタンを押してね";
//   promptMessage.style.color = "black";
// }

// function resetValidation() {
//   isValidateName = false;
//   isValidateNumber = false;
// }

// function checkEnableSubmit() {
//   if (isValidateName && isValidateNumber) {
//     validInput();
//   } else {
//     invalidInput();
//   }
// }

// function invalidInput(errorMessage) {
//   promptMessage.textContent = errorMessage;
//   promptMessage.style.color = "red";
//   fetchButton.disabled = true;
// }

// function validInput() {
//   promptMessage.textContent = "入力後、取得ボタンを押してね";
//   promptMessage.style.color = "black";
//   fetchButton.disabled = false;
// }

// nameBox.addEventListener("input", () =>
//   validatePattern(nameBox, namePattern, "名前を入力ください")
// );
// numberBox.addEventListener("input", () =>
//   validatePattern(numberBox, numberPattern, "半角数字を入力ください")
// );
