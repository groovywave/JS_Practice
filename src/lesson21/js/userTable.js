import { renderCircle } from "./modules/renderCircle.js";
import { removeCircle } from "./modules/removeCircle.js";
import { displayInfo } from "./modules/displayInfo.js";

const url = "https://mocki.io/v1/4689014e-270d-46d3-889f-72647a3d830a";

function renderStatus(response) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(errorMessage);
}

let fragment = document.createDocumentFragment();

function makeHeaderRow(dataSet) {
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
    thTag.classList.add("js-th");
    row.appendChild(thTag);
  });
  fragment.appendChild(theadTag).appendChild(row);
  // return fragment;
}

function makeBodyRow(dataSet) {
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
  // return fragment;
}

let currentStateIndex = 0;
function sortById(unsortedData) {
  const copiedUnsortedData = [...unsortedData];
  const state = ["none", "asc", "desc"];
  currentStateIndex = (currentStateIndex + 1) % 3;
  const funcs = {
    none: function (data) {
      return data;
    },
    asc: function (data) {
      const sortedData = data.sort((a, b) => {
        // return data.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
      });
      console.log("in asc : ", sortedData);
      return sortedData;
    },
    desc: function (data) {
      const sortedData = data.sort((a, b) => {
        // return data.sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id);
      });
      return sortedData;
    },
  };
  document.getElementById("js-tbodyTag").remove();
  const currentState = state[currentStateIndex];
  const sortFunc = funcs[currentState];
  const sortedBodyData = sortFunc(copiedUnsortedData);
  // fragment = new DocumentFragment();
  // fragment = "";
  fragment = makeBodyRow(sortedBodyData);
  table.appendChild(fragment);
}

const buttonsContainer = document.createElement("div");
function makeSortButton() {
  const buttonsProperty = [
    {
      id: "js-defaultButton",
      state: "default",
      backgroundImage: "./img/both.svg",
    },
    {
      id: "js-ascendingButton",
      state: "ascending",
      backgroundImage: "./img/asc.svg",
    },
    {
      id: "js-descendingButton",
      state: "descending",
      backgroundImage: "./img/desc.svg",
    },
  ];
  const sortButtons = [];
  buttonsProperty.forEach((buttonProperty) => {
    const sortButton = document.createElement("button");
    sortButton.id = buttonProperty.id;
    sortButton.dataset.state = buttonProperty.state;
    sortButton.style.backgroundImage = buttonProperty.backgroundImage;
    sortButtons.push(sortButton);
  });
  sortButtons.forEach((sortButton) => {
    buttonsContainer.appendChild(sortButton);
  });
}

const tableContainer = document.createElement("div");
tableContainer.classList.add("table-container");
const table = document.createElement("table");
table.id = "js-table";
table.classList.add("table");

function renderTable() {
  document
    .getElementById("js-contents-container")
    .appendChild(tableContainer)
    .appendChild(table)
    .appendChild(fragment);
}

function addSortButton(headerItemName) {
  const searchedHeaderTag = Array.from(document.querySelectorAll(".js-th"))
    // .map((th) => {
    //   return th.textContent;
    // })
    .find((thTag) => {
      return thTag.textContent === headerItemName;
    });
  console.log(
    "🚀 ~ file: userTable.js:138 ~ addSortButton ~ searchedHeaderTag:",
    searchedHeaderTag
  );
  console.log(
    "🚀 ~ file: userTable.js:139 ~ addSortButton ~ buttonsContainer:",
    buttonsContainer
  );
  searchedHeaderTag.appendChild(buttonsContainer);
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

async function fetchMakeTable() {
  const responseData = await fetchData(url);
  if (responseData) {
    const rawData = responseData.data;
    makeHeaderRow(rawData);
    makeBodyRow(rawData);
    renderTable();
    makeSortButton();
    addSortButton("ID");
  }
}

fetchMakeTable();
