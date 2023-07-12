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

async function fetchRenderData() {
  const responseData = await Promise.all(articlesAPI.map(fetchData));
  if (responseData) {
    renderData(responseData);
  }
}

async function fetchData(url) {
  renderCircle();
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    if (!response.ok) {
      renderStatus(response);
      console.error(`${response.status}:${response.statusText}`);
    } else if (!Object.keys(responseData).length) {
      displayInfo("no data");
    } else {
      return responseData;
    }
  } catch (error) {
    displayInfo(error);
  } finally {
    removeCircle();
  }
}

function renderCircle() {
  const loadingCircle = document.createElement("img");
  loadingCircle.src = "img/loading-circle.gif";
  loadingCircle.alt = "ローディング画像";
  loadingCircle.id = "loading-circle";
  tabArea.appendChild(loadingCircle);
}

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

const fragmentTabs = document.createDocumentFragment();
const fragmentGenres = document.createDocumentFragment();
const fragmentTitles = document.createDocumentFragment();
const fragmentImages = document.createDocumentFragment();

function renderData(responseData) {
  for (const data of responseData) {
    createTab(data);
    createArticles(data);
    const img = createImage(data);
    combineArticleImage(data, img);
  }
  tabArea.appendChild(fragmentTabs);
  articleArea.appendChild(fragmentGenres);
  tabArea.insertAdjacentElement("afterend", articleArea);
  const tabs = Array.from(document.getElementsByClassName("tab"));
  const contents = Array.from(
    document.getElementsByClassName("genre-container")
  );
  // addClickEvent(tabs, contents);
}

function createTab(data) {
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
}

function createArticles(data) {
  const articleList = data.article;
  for (const article of articleList) {
    const articleContainer = document.createElement("div");
    articleContainer.classList.add("article-container");

    const title = document.createElement("li");
    const titleAnchor = document.createElement("a");
    titleAnchor.href = "#";
    titleAnchor.textContent = article.title;
    title.appendChild(titleAnchor);

    const newIconContainer = document.createElement("div");

    const articleDate = new Date(article.date);
    if (withinThreeDays(articleDate)) {
      const newIcon = document.createElement("img");
      newIcon.src = "./img/new.png";
      newIcon.classList.add("new");
      newIconContainer.appendChild(newIcon);
      // articleContainer.appendChild(newIcon);
    }

    const commentIconContainer = document.createElement("div");
    commentIconContainer.classList.add("comment-container");
    if (article.comment) {
      const commentIcon = document.createElement("img");
      commentIcon.classList.add("comment-icon");
      commentIcon.src = "./img/comment.png";
      commentIcon.width = "14";
      commentIcon.height = "14";
      commentIconContainer.appendChild(commentIcon);
      // articleContainer.appendChild(commentIcon);

      const numOfComments = document.createElement("div");
      numOfComments.classList.add("comment-num");
      const numOfCommentProps = Object.keys(article.comment).length;
      numOfComments.textContent = numOfCommentProps;
      numOfComments.width = "4px";
      numOfComments.height = "4px";
      commentIconContainer.appendChild(numOfComments);
    }
    // articleContainer.appendChild(titleAnchor);
    // articleContainer.appendChild(newIconContainer);
    // articleContainer.appendChild(commentIconContainer);
    // title.appendChild(articleContainer);

    // fragmentTitles.appendChild(title);
    articleContainer.appendChild(title);
    articleContainer.appendChild(newIconContainer);
    articleContainer.appendChild(commentIconContainer);

    // fragmentTitles.appendChild(title).appendChild(articleContainer);
    fragmentTitles.appendChild(articleContainer);
  }
}

function createImage(data) {
  const img = document.createElement("img");
  img.classList.add("article-image");
  img.src = data.image;
  img.width = "100";
  img.height = "100";
  fragmentImages.appendChild(img);
  return img;
}

function combineArticleImage(data, img) {
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
function removeCircle() {
  document.getElementById("loading-circle").remove();
}

function withinThreeDays(day) {
  const today = new Date();
  const msInThreeDays = 20 * 24 * 60 * 60 * 1000;
  const diff = today.getTime() - day.getTime();
  return diff < msInThreeDays;
}

tabArea.addEventListener("click", (e) => {
  const targetElement = e.target;
  console.log(targetElement);
  if (targetElement.tagName.toLowerCase() === "a") {
    const tabs = Array.from(document.getElementsByClassName("tab"));
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    targetElement.classList.add("active");
  }
  const contents = Array.from(
    document.getElementsByClassName("genre-container")
  );
  contents.forEach((item) => {
    item.classList.remove("active");
  });
  document.getElementById(targetElement.dataset.id).classList.add("active");
  e.preventDefault();
});

fetchRenderData();
