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
  theadTag.id = "js-thead";
  theadTag.classList.add("thead-tag");
  const row = document.createElement("tr");
  row.id = "js-theadRow";
  row.classList.add("row");
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

const state = ["default", "ascending", "descending"];
let currentIdIndex = 0;
let currentAgeIndex = 0;
let currentIdState = state[currentIdIndex];
let currentAgeState = state[currentAgeIndex];
// function makeCurrentIndex() {
//   let currentIndex = 0;
//   return currentIndex;
// }
function changeState() {
  currentStateIndex = (currentStateIndex + 1) % state.length;
  currentState = state[currentStateIndex];
}

function sortData(defaultData) {
  const copiedData = [...defaultData];
  switch (currentState) {
    case "default":
      return defaultData;
    case "ascending":
      return copiedData.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
      });
    case "descending":
      return copiedData.sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id);
      });
    default:
      return defaultData;
  }
}

function updateBody(data) {
  document.getElementById("js-tbodyTag").remove();
  renderTable(makeBodyRow(data));
}

function updateButtons() {
  if (document.getElementsByClassName("current-button")[0]) {
    document
      .getElementsByClassName("current-button")[0]
      .classList.remove("current-button");
  }
  document
    .getElementById(`js-${currentState}Button`)
    .classList.add("current-button");
}

// function makeButtonContainer(buttonContainer) {
//   const buttonContainer = document.createElement("div");
//   buttonContainer.classList.add("buttons-container");
// }

function makeContainerWithButton() {
  const buttonContainer = document.createElement("div");
  const buttonProperty = [
    {
      // id: "js-defaultButton",
      state: "default",
    },
    {
      // id: "js-ascendingButton",
      state: "ascending",
    },
    {
      // id: "js-descendingButton",
      state: "descending",
    },
  ];
  buttonProperty.forEach((buttonProperty) => {
    const sortButton = document.createElement("button");
    // sortButton.id = buttonProperty.id;
    sortButton.classList.add("sort-button");
    sortButton.dataset.state = buttonProperty.state;
    buttonContainer.appendChild(sortButton);
  });
  return buttonContainer;
}

function addClickEventOnButtonContainer(buttonContainer, defaultData) {
  buttonContainer.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) return;
    changeState();
    updateBody(sortData(defaultData));
    updateButtons();
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

function addSortButton(buttonContainer, headerItemName) {
  // function addSortButton(headerItemName) {
  // const buttonContainer = makeSortButton();
  // addClickEventOnButtonContainer(buttonContainer, defaultData);
  const searchedHeaderTag = Array.from(
    document.querySelectorAll(".js-th")
  ).find((thTag) => {
    return thTag.textContent === headerItemName;
  });
  searchedHeaderTag.appendChild(buttonContainer);
  // searchedHeaderTag.appendChild(buttonsContainer);
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

function makeAddContainerWithButton(headerName, defaultData) {
  const buttonContainer = makeContainerWithButton();
  // addSortButton(buttonContainer, headerName);
  addSortButton(buttonContainer, headerName);
  addClickEventOnButtonContainer(buttonContainer, defaultData);
  updateButtons(buttonContainer);
}

// const idSortButtonContainer = document.createElement("div");
// const ageSortButtonContainer = document.createElement("div");

async function fetchMakeTable() {
  const responseData = await fetchData(url);
  if (responseData) {
    const defaultData = responseData.data;
    renderTable(makeHeaderRow(defaultData));
    renderTable(makeBodyRow(defaultData));
    // idSortButtonContainer.classList.add("buttons-container");
    // ageSortButtonContainer.classList.add("buttons-container");
    // makeButtonContainer(idSortButtonContainer);
    // const ageSortButtonContainer = makeButtonContainer();
    // addSortButton("ID", defaultData);
    // addSortButton("AGE", defaultData);
    // makeAddSortButton(idSortButtonContainer, "ID", defaultData);
    // makeAddSortButton(ageSortButtonContainer, "AGE", defaultData);
    // makeAddSortButton(ageSortButtonContainer, "AGE", defaultData);
    const idSortButtonContainer = makeAddContainerWithButton();
  }
}

fetchMakeTable();
