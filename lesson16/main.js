const articlesAPI = [
  //main
  "https://mocki.io/v1/025fa3d8-7096-433d-8766-8392ceab92b1",
  //economy
  "https://mocki.io/v1/d408a3b3-9504-4c43-bf12-6773efb74361",
  //entertainment
  "https://mocki.io/v1/7b94b922-6130-44a6-b0c0-179cf5f76af5",
  //sports
  "https://mocki.io/v1/e30aa30c-649c-49ce-9d75-a4e9c4caca51",
];

const errorMessage = document.createElement("p");
const tabArea = document.getElementById("js-ul");
const articleArea = document.createElement("div");

function renderStatus(response) {
  errorMessage.id = "render-status";
  errorMessage.textContent = `${response.status}:${response.statusText}`;
  document.body.appendChild(errorMessage);
}

function displayInfo(error) {
  errorMessage.id = "display-info";
  errorMessage.textContent = error;
  document.body.appendChild(errorMessage);
}

function renderCircle() {
  const loadingCircle = document.createElement("img");
  loadingCircle.src = "img/loading-circle.gif";
  loadingCircle.alt = "ローディング画像";
  loadingCircle.id = "loading-circle";
  ul.appendChild(loadingCircle);
}

function removeCircle() {
  document.getElementById("loading-circle").remove();
}

function renderData(menus) {
  const fragment = document.createDocumentFragment();
  for (const menu of menus) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    a.href = menu.to;
    a.textContent = menu.text;
    img.src = menu.img;
    img.alt = menu.alt;
    fragment
      .appendChild(li)
      .appendChild(a)
      .insertAdjacentElement("afterbegin", img);
  }
  ul.appendChild(fragment);
}

async function fetchData(url) {
  renderCircle();
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    if (!response.ok) {
      renderStatus(response);
      console.error(`${response.status}:${response.statusText}`);
    }
    if (!responseData.length) {
      displayInfo("no data");
    }
    return responseData;
  } catch (error) {
    displayInfo(error);
  } finally {
    removeCircle();
    backButton.classList.remove("hidden");
  }
}

async function fetchRenderData(inputNumber) {
  const responseData = await fetchData(url);
  if (responseData) {
    renderData(responseData);
    console.log(inputNumber); //show inputted number
  }
}

const fragmentTabs = document.createDocumentFragment();
const fragmentTitles = document.createDocumentFragment();
const fragmentGenres = document.createDocumentFragment();

function renderData(responseData) {
  for (const data of responseData) {
    //Tabsの生成
    const tabTitle = document.createElement("li");
    const tabAnchor = document.createElement("a");
    tabAnchor.href = "#";
    tabAnchor.textContent = data.category;
    tabAnchor.setAttribute("data-id", data.id);
    tabAnchor.classList.add("tab");
    if (data.select) {
      tabAnchor.classList.add("active");
    }
    fragmentTabs.appendChild(tabTitle).appendChild(tabAnchor);

    //記事タイトルの作成
    const articleList = data.article;
    for (const article of articleList) {
      const title = document.createElement("li");
      const titleAnchor = document.createElement("a");
      titleAnchor.href = "#";
      titleAnchor.textContent = article.title;
      console.log(article.date);
      const articleDate = new Date(article.date);
      if (withinThreeDays(articleDate)) {
        const newIcon = document.createElement("img");
        newIcon.src = "./img/new.png";
        newIcon.classList.add("new");
        titleAnchor.appendChild(newIcon);
      }
      fragmentTitles.appendChild(title).appendChild(titleAnchor);
    }

    //imageの作成
    const img = document.createElement("img");
    img.src = data.image;
    img.width = "100";
    img.height = "100";

    // const genre = document.createElement("section");
    const genreContainer = document.createElement("div");
    genreContainer.classList.add("genre-container");
    const titleArea = document.createElement("div");
    const imageArea = document.createElement("div");
    titleArea.classList.add("content", "title-area");
    imageArea.classList.add("content", "image-area");
    genreContainer.id = data.id;
    genreContainer.appendChild(titleArea).appendChild(fragmentTitles);
    genreContainer.appendChild(imageArea).appendChild(img);
    //初期表示の設定
    if (data.select) {
      genreContainer.classList.add("active");
    }
    fragmentGenres.appendChild(genreContainer);
  }
  tabArea.appendChild(fragmentTabs);
  articleArea.appendChild(fragmentGenres);
  console.log(articleArea);
  tabArea.insertAdjacentElement("afterend", articleArea);
  const tabs = Array.from(document.getElementsByClassName("tab"));
  const contents = Array.from(
    document.getElementsByClassName("genre-container")
  );
  addClickEvent(tabs, contents);
}


