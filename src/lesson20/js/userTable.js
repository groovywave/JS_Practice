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

function makeRow(theadOrTbody, thOrTd, dataSet) {
  const theadOrTbodyTag = document.createElement(theadOrTbody);
  dataSet.forEach((data) => {
    const row = document.createElement("tr");
    Object.keys(data).forEach((key) => {
      const thOrTdTag = document.createElement(thOrTd);
      thOrTdTag.textContent = data[key];
      thOrTdTag.classList.add(thOrTd);
      row.appendChild(thOrTdTag);
    });
    fragment.appendChild(theadOrTbodyTag).appendChild(row);
  });
  return fragment;
}

function makeTable(dataSet) {
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");
  const table = document.createElement("table");
  table.classList.add("table");
  let obj = {};
  for (let key of Object.keys(dataSet.data[0])) {
    obj[key] = key.toUpperCase();
  }
  let header = [];
  header.push(obj);
  makeRow("thead", "th", header);
  makeRow("tbody", "td", dataSet.data);
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
