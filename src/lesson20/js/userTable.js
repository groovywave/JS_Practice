import { renderCircle } from "./modules/renderCircle.js";
import { removeCircle } from "./modules/removeCircle.js";
import { displayInfo } from "./modules/displayInfo.js";

const url = "https://mocki.io/v1/55433c48-118c-4b6d-bd79-6db5e34ceed9";

function renderStatus(response) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(errorMessage);
}

const fragment = document.createDocumentFragment();

function makeRow(theadOrTbody, thOrTd, dataSet) {
  const theadOrTbodyTag = document.createElement(theadOrTbody);

  for (const { ID, name, gender, age } of dataSet) {
    const row = document.createElement("tr");
    [ID, name, gender, age].forEach((data) => {
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

  let headerData = [];
  headerData.push(dataSet[0]);

  const slicedDataSet = dataSet.slice(1);
  makeRow("thead", "th", headerData);
  makeRow("tbody", "td", slicedDataSet);

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
    const responseData = jsonResponse.data;
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

async function fetchMakeTable() {
  const responseData = await fetchData(url);
  if (responseData) {
    makeTable(responseData);
  }
}

fetchMakeTable();
