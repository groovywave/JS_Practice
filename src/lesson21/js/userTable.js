import { renderCircle } from "./modules/renderCircle.js";
import { removeCircle } from "./modules/removeCircle.js";
import { displayInfo } from "./modules/displayInfo.js";

const url = "https://mocki.io/v1/4689014e-270d-46d3-889f-72647a3d830a";

function renderStatus(response) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(errorMessage);
}

const fragment = document.createDocumentFragment();

function makeHeaderRow(dataSet) {
  // const fragment = document.createDocumentFragment();
  const theadTag = document.createElement("thead");
  theadTag.classList.add("thead-tag");
  const row = document.createElement("tr");
  row.classList.add("row");
  dataSet.forEach((data) => {
    const thTag = document.createElement("th");
    thTag.textContent = data.toUpperCase();
    thTag.classList.add("th");
    // const spanTag = document.createElement("span"); // 新しく追加
    // spanTag.textContent = data.toUpperCase();
    // thTag.appendChild(spanTag); // テキストをspanで囲む
    row.appendChild(thTag);
  });
  fragment.appendChild(theadTag).appendChild(row);
  return fragment;
}

function makeBodyRow(dataSet) {
  const tbodyTag = document.createElement("tbody");
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

function sortById(unSortedData) {
  const stateIndex = ["none", "asc", "desc"];
  let currentStateIndex = stateIndex[0];
  document.getElementById("js-sortButton").addEventListener("click", () => {
    currentStateIndex = (currentStateIndex + 1) % 3;
    const funcs = {
      none: function () {
        return unSortedData;
      },
      asc: function () {
        unSortedData.sort((a, b) => {
          return a - b;
        });
      },
      desc: function () {
        unSortedData.sort((a, b) => {
          return b - a;
        });
      },
    };
    document.getElementById("table").innerHTML = "";
    const sortedData = funcs[stateIndex[currentStateIndex]]();
    makeBodyRow(sortedData);
  });
}

function makeSortButton(unSortedData) {
  const cellsContainer = document.createElement("div");
  cellsContainer.classList.add("cells-container");
  const headerTagForId = document.querySelector("thead th:first-child");
  const textOfHeaderTagForId = headerTagForId.textContent;
  headerTagForId.textContent = "";
  const sortButton = document.createElement("img");
  sortButton.src = "./img/both.svg";
  sortButton.id = "js-sortButton";
  sortButton.classList.add("sort-button");
  cellsContainer.textContent = textOfHeaderTagForId;
  cellsContainer.appendChild(sortButton);
  headerTagForId.appendChild(cellsContainer);
  sortButton.addEventListener("click", sortById(unSortedData));
}

const tableContainer = document.createElement("div");
tableContainer.classList.add("table-container");
const table = document.createElement("table");
table.classList.add("table");
function makeTable(dataSet) {
  const headerData = Object.keys(dataSet.data[0]);
  makeHeaderRow(headerData);
  makeBodyRow(dataSet.data);
  document
    .getElementById("js-contents-container")
    .appendChild(tableContainer)
    .appendChild(table)
    .appendChild(fragment);
  makeSortButton(dataSet.data);
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
    makeTable(responseData);
  }
}

fetchMakeTable();
