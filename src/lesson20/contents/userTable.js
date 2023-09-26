import { renderCircle } from "../modules/renderCircle.js";
import { removeCircle } from "../modules/removeCircle.js";
import { displayInfo } from "../modules/displayInfo.js";

const url = "https://mocki.io/v1/3a070eb1-17a3-439e-b1a3-a15649c81c00";

function renderStatus(response) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(errorMessage);
}

const fragment = document.createDocumentFragment();

function makeRow(theadOrTbody, thOrTd, dataSet) {
  const theadOrTbodyTag = document.createElement(theadOrTbody);

  for (const { id, name, gender, age } of dataSet) {
    const row = document.createElement("tr");
    [id, name, gender, age].forEach((data) => {
      const thOrTdTag = document.createElement(thOrTd);
      thOrTdTag.textContent = data;
      thOrTdTag.classList.add(thOrTd);
      row.appendChild(thOrTdTag);
    });
    fragment.appendChild(theadOrTbodyTag).appendChild(row);
  }
  return fragment;
}

function makeTable(dataSet) {
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");
  const table = document.createElement("table");
  table.classList.add("table");

  const headerData = [
    { ID: "", id: "ID", name: "NAME", gender: "GENDER", age: "AGE" },
  ];
  makeRow("thead", "th", headerData);
  makeRow("tbody", "td", dataSet);

  document
    .getElementById("js-div")
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
    const responseData = jsonResponse.data;
    if (!responseData.length) {
      displayInfo("no data");
    }
    return responseData;
    D;
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

async function init() {
  await fetchMakeTable();
}

init();
