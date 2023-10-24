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
  theadTag.classList.add("thead-tag");
  const row = document.createElement("tr");
  row.classList.add("row");
  headerData.forEach((data) => {
    const thTag = document.createElement("th");
    thTag.textContent = data.toUpperCase();
    thTag.classList.add("th");
    row.appendChild(thTag);
  });
  fragment.appendChild(theadTag).appendChild(row);
  // return fragment;
}

function makeBodyRow(bodyData) {
  const tbodyTag = document.createElement("tbody");
  tbodyTag.id = "js-tbodyTag";
  bodyData.forEach((data) => {
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
  console.log(
    "🚀 ~ file: userTable.js:50 ~ sortById ~ copiedUnsortedData:",
    copiedUnsortedData
  );
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
  console.log(
    "🚀 ~ file: userTable.js:70 ~ sortById ~ currentState:",
    currentState
  );
  const sortFunc = funcs[currentState];
  const sortedBodyData = sortFunc(copiedUnsortedData);

  console.log(
    "🚀 ~ file: userTable.js:70 ~ sortById ~ funcs[currentState]:",
    funcs[currentState]
  );
  console.log(
    "🚀 ~ file: userTable.js:70 ~ sortById ~ sortedBodyData:",
    sortedBodyData
  );
  fragment = new DocumentFragment();
  // fragment = "";

  console.log(
    "🚀 ~, file: userTable.js:96 ~ sortById ~ table:",
    fragment.children,
    fragment.childNodes[0]
  );
  fragment = makeBodyRow(sortedBodyData);
  console.log(
    "🚀 ~ file: userTable.js:94 ~ sortById ~ fragment:",
    fragment.children,
    fragment.childNodes[0]
  );
  console.log("🚀 ~ file: userTable.js:96 ~ sortById ~ table:", table);
  table.appendChild(fragment);
  console.log("🚀 ~ file: userTable.js:96 ~ sortById ~ table:", table);
}

function makeSortButton(unsortedData) {
  const cellsContainer = document.createElement("div");
  cellsContainer.classList.add("cells-container");
  const headerForId = document.querySelector("thead th:first-child");
  const textInHeaderForId = headerForId.textContent;
  headerForId.textContent = "";
  const sortButton = document.createElement("img");
  sortButton.src = "./img/both.svg";
  sortButton.id = "js-sortButton";
  sortButton.classList.add("sort-button");
  cellsContainer.textContent = textInHeaderForId;
  cellsContainer.appendChild(sortButton);
  headerForId.appendChild(cellsContainer);
  sortButton.addEventListener("click", () => sortById(unsortedData));
}

const tableContainer = document.createElement("div");
tableContainer.classList.add("table-container");
const table = document.createElement("table");
table.id = "js-table";
table.classList.add("table");

function renderTable() {
  // const headerData = Object.keys(dataSet.data[0]);
  // makeHeaderRow(headerData);
  // makeBodyRow(dataSet.data);
  document
    .getElementById("js-contents-container")
    .appendChild(tableContainer)
    .appendChild(table)
    .appendChild(fragment);

  console.log(
    "🚀 ~ file: userTable.js:134 ~ renderTable ~ fragment:",
    fragment.children,
    fragment.childNodes[0]
  );
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
    console.log(
      "🚀 ~ file: userTable.js:148 ~ fetchMakeTable ~ rawData:",
      rawData
    );
    makeHeaderRow(rawData);
    makeBodyRow(rawData);
    renderTable(rawData);
    makeSortButton(rawData);
  }
}

fetchMakeTable();
