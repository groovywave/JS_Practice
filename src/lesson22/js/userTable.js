import { renderCircle } from "./modules/renderCircle.js";
import { removeCircle } from "./modules/removeCircle.js";
import { displayInfo } from "./modules/displayInfo.js";

const url = "https://mocki.io/v1/4689014e-270d-46d3-889f-72647a3d830a";

function renderStatus(response) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(errorMessage);
}

function makeHeaderRow(dataSet) {
  const fragment = document.createDocumentFragment();
  const headerData = Object.keys(dataSet[0]);
  const theadTag = document.createElement("thead");
  const row = document.createElement("tr");
  headerData.forEach((data) => {
    const thTag = document.createElement("th");
    thTag.textContent = data.toUpperCase();
    thTag.classList.add("js-th", "th");
    row.appendChild(thTag);
  });
  fragment.appendChild(theadTag).appendChild(row);
  return fragment;
}

function makeBodyRow(dataSet) {
  const fragment = document.createDocumentFragment();
  const tbodyTag = document.createElement("tbody");
  tbodyTag.id = "js-tbodyTag";
  dataSet.forEach((data) => {
    const row = document.createElement("tr");
    Object.keys(data).forEach((key) => {
      const tdTag = document.createElement("td");
      tdTag.textContent = data[key];
      tdTag.classList.add("td");
      row.appendChild(tdTag);
    });
    fragment.appendChild(tbodyTag).appendChild(row);
  });
  return fragment;
}

const stateSet = ["default", "ascending", "descending"];
const headerItemNames = ["ID", "AGE"];
let currentStateIndexes = [0, 0];
let currentStateSet = [
  stateSet[currentStateIndexes[headerItemNames.indexOf("ID")]],
  stateSet[currentStateIndexes[headerItemNames.indexOf("AGE")]],
];
function changeState(headerItemName) {
  const headerItemNameIndex = headerItemNames.indexOf(headerItemName);
  currentStateIndexes[headerItemNameIndex] =
    (currentStateIndexes[headerItemNameIndex] + 1) % stateSet.length;
  currentStateSet[headerItemNameIndex] =
    stateSet[currentStateIndexes[headerItemNameIndex]];
}

function sortData(headerItemName, defaultData) {
  const headerItemNameIndex = headerItemNames.indexOf(headerItemName);
  const currentState = currentStateSet[headerItemNameIndex];
  const copiedData = [...defaultData];
  switch (currentState) {
    case "default":
      return defaultData;
    case "ascending":
      return copiedData.sort((a, b) => {
        return (
          parseInt(a[headerItemName.toLowerCase()]) -
          parseInt(b[headerItemName.toLowerCase()])
        );
      });
    case "descending":
      return copiedData.sort((a, b) => {
        return (
          parseInt(b[headerItemName.toLowerCase()]) -
          parseInt(a[headerItemName.toLowerCase()])
        );
      });
    default:
      return defaultData;
  }
}

function updateBody(data) {
  document.getElementById("js-tbodyTag").remove();
  renderTable(makeBodyRow(data));
}

function updateButtons(buttonContainer, headerItemName) {
  const headerItemNameIndex = headerItemNames.indexOf(headerItemName);
  const currentState = currentStateSet[headerItemNameIndex];
  if (buttonContainer.querySelector(".current-button")) {
    buttonContainer
      .querySelector(".current-button")
      .classList.remove("current-button");
  }
  document
    .getElementById(`js-${headerItemName}${currentState}`)
    .classList.add("current-button");
}

function makeContainerWithButton(headerItemName) {
  const headerItemNameIndex = headerItemNames.indexOf(headerItemName);
  const currentState = currentStateSet[headerItemNameIndex];
  const buttonContainer = document.createElement("div");
  // buttonContainer.id = `js-${headerItemName}`;
  // buttonContainer.dataset.currentStateIndex = 0;
  buttonContainer.classList.add("button-container");
  stateSet.forEach((state) => {
    const sortButton = document.createElement("button");
    sortButton.classList.add("sort-button");
    sortButton.id = `js-${headerItemName}${state}`;
    sortButton.dataset.state = state;
    buttonContainer.appendChild(sortButton);
    if (currentState === state) {
      sortButton.classList.add("current");
    }
  });
  return buttonContainer;
}

function addClickEventOnButtonContainer(
  buttonContainer,
  headerItemName,
  defaultData
) {
  buttonContainer.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) return;
    changeState(headerItemName);
    updateBody(sortData(headerItemName, defaultData));
    updateButtons(buttonContainer, headerItemName);
  });
}

const tableContainer = document.createElement("div");
tableContainer.classList.add("table-container");
const table = document.createElement("table");
table.id = "js-table";
table.classList.add("table");

function renderTable(tableElement) {
  document
    .getElementById("js-contents-container")
    .appendChild(tableContainer)
    .appendChild(table)
    .appendChild(tableElement);
}

function addContainerWithButton(buttonContainer, headerItemName) {
  const searchedHeaderTag = Array.from(
    document.querySelectorAll(".js-th")
  ).find((thTag) => {
    return thTag.textContent === headerItemName;
  });
  searchedHeaderTag.appendChild(buttonContainer);
  searchedHeaderTag.classList.add("has-button");
}

async function fetchData(url) {
  renderCircle(document.body);
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
    if (!jsonResponse.length) {
      displayInfo("No data");
    }
    return jsonResponse;
  } catch (error) {
    displayInfo(error);
  } finally {
    removeCircle();
  }
}

function makeAddContainerWithButton(headerItemName, defaultData) {
  const buttonContainer = makeContainerWithButton(headerItemName);
  addContainerWithButton(buttonContainer, headerItemName);
  addClickEventOnButtonContainer(buttonContainer, headerItemName, defaultData);
  updateButtons(buttonContainer, headerItemName);
}

async function fetchMakeTable() {
  const responseData = await fetchData(url);
  if (responseData) {
    const defaultData = responseData.data;
    renderTable(makeHeaderRow(defaultData));
    renderTable(makeBodyRow(defaultData));
    makeAddContainerWithButton("ID", defaultData);
    makeAddContainerWithButton("AGE", defaultData);
  }
}

fetchMakeTable();
