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
  const theadTag = document.createElement("thead");
  const row = document.createElement("tr");
  dataSet.forEach((data) => {
      const thTag = document.createElement("th");
      thTag.textContent = data.toUpperCase();
      thTag.classList.add("th");
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

function makeTable(dataSet) {
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");
  const table = document.createElement("table");
  table.classList.add("table");
  makeHeaderRow(Object.keys(dataSet.data[0]));
  makeBodyRow(dataSet.data);
  document
    .getElementById("js-contents-container")
    .appendChild(tableContainer)
    .appendChild(table)
    .appendChild(fragment);
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
