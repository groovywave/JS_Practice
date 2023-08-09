const articlesAPI = {
  main: "https://mocki.io/v1/075c2cc1-6b20-47f1-9b3c-a6dd184eef6b",
  economy: "https://mocki.io/v1/713bb820-066a-40b4-a36d-8eaa1646adb3",
  entertainment: "https://mocki.io/v1/c496fb00-f8ef-4eaf-b080-15a09a1215e7",
  sports: "https://mocki.io/v1/21407eaa-d5c9-455a-ab20-924f6b9759a4",
};

async function fetchDataSet(urlProps) {
  renderCircle();
  const urls = Object.values(urlProps);
  if (!Object.keys(urls).length) {
    displayInfo("no data");
    removeCircle();
    return;
  }
  const promisedDataSet = urls.map((url) => fetchData(url));
  const rowDataSet = await Promise.allSettled(promisedDataSet);
  removeCircle();
  return rowDataSet
    .filter((data) => data.status === "fulfilled")
    .map((data) => data.value);
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    if (!response.ok) {
      displayInfo(response);
      console.error(`${response.status}:${response.statusText}`);
    } else {
      return responseData;
    }
  } catch (error) {
    console.error(error);
    displayInfo("Something went wrong. We can't fetch the data.");
  }
}

const tabArea = document.getElementById("js-ul");

function renderCircle() {
  const loadingCircle = document.createElement("img");
  loadingCircle.src = "img/loading-circle.gif";
  loadingCircle.alt = "ローディング画像";
  loadingCircle.id = "loading-circle";
  tabArea.appendChild(loadingCircle);
}

function displayInfo(response) {
  const errorMessage = document.createElement("p");
  errorMessage.id = "display-info";
  if (response.status) {
    errorMessage.textContent = `${response.status}:${response.statusText}`;
  } else {
    errorMessage.textContent = response;
  }
  document.body.appendChild(errorMessage);
}

const fragmentTabs = document.createDocumentFragment();
const fragmentGenres = document.createDocumentFragment();
const fragmentTitles = document.createDocumentFragment();
const fragmentImages = document.createDocumentFragment();
const fragmentComments = document.createDocumentFragment();

const articleArea = document.createElement("div");
const commentArea = document.createElement("div");

function renderArticlesAndTabMenus(allGenresOfArticles) {
  for (const { id, category, select, image, articles } of allGenresOfArticles) {
    createTab(category, id, select);
    createArticles(articles);
    const thumbnail = createThumbnail(image);
    combineArticlesThumbnail(id, select, thumbnail);
    for (const { id, comments } of articles) {
      if (comments.length > 0) {
        createComments(id, comments);
      }
    }
  }
  tabArea.appendChild(fragmentTabs);
  articleArea.appendChild(fragmentGenres);
  commentArea.appendChild(fragmentComments);
  tabArea.insertAdjacentElement("afterend", articleArea);
  articleArea.insertAdjacentElement("afterend", commentArea);

  addClickEventChangeElement(tabArea, true, articleArea);
  addClickEventHideComment();
}

function createTab(category, id, select) {
  const tabTitle = document.createElement("li");
  const tabAnchor = document.createElement("a");
  tabAnchor.href = "#";
  tabAnchor.textContent = category;
  tabAnchor.setAttribute("data-id", id);
  tabAnchor.classList.add("tab");
  if (select) {
    tabAnchor.classList.add("active");
  }
  fragmentTabs.appendChild(tabTitle).appendChild(tabAnchor);
}

function createArticles(articles) {
  for (const { id, date, title, comments } of articles) {
    const articleContainer = document.createElement("div");
    articleContainer.classList.add("article-container");
    articleContainer.dataset.id = id;
    const articleTitle = createTitle(title);
    const newIconContainer = createNewIconContainer(date);
    articleContainer.appendChild(articleTitle);
    articleContainer.appendChild(newIconContainer);
    if (comments.length > 0) {
      const commentIconContainer = createCommentIconContainer(id, comments);
      articleContainer.appendChild(commentIconContainer);
    }
    fragmentTitles.appendChild(articleContainer);
  }
}

function createTitle(title) {
  const articleTitle = document.createElement("li");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = "#";
  titleAnchor.textContent = title;
  articleTitle.appendChild(titleAnchor);
  return articleTitle;
}

function createNewIconContainer(date) {
  const newIconContainer = document.createElement("div");
  const articleDate = new Date(date);
  if (withinThreeDays(articleDate)) {
    const newIcon = document.createElement("img");
    newIcon.src = "./img/new.png";
    newIcon.alt = "新着";
    newIcon.classList.add("new");
    newIconContainer.appendChild(newIcon);
  }
  return newIconContainer;
}

function createCommentIconContainer(id, comments) {
  const commentIconContainer = document.createElement("div");
  commentIconContainer.classList.add("comment-icon-container");
  const commentIcon = document.createElement("img");
  commentIcon.classList.add("comment-icon");
  commentIcon.src = "./img/comment.png";
  commentIcon.width = "14";
  commentIcon.height = "14";
  commentIcon.dataset.id = id;
  commentIconContainer.appendChild(commentIcon);

  const numOfComments = document.createElement("div");
  numOfComments.classList.add("comment-num");
  numOfComments.textContent = comments.length;
  numOfComments.alt = "コメント数";
  numOfComments.dataset.id = id;
  commentIconContainer.appendChild(numOfComments);

  addClickEventChangeElement(commentIconContainer, false, commentArea);

  return commentIconContainer;
}

function createComments(id, comments) {
  const ArticleCommentsContainer = document.createElement("div");
  ArticleCommentsContainer.id = id;
  ArticleCommentsContainer.classList.add("comment-container");
  comments.forEach((comment) => {
    const Comment = createComment(comment);
    ArticleCommentsContainer.appendChild(Comment);
  });
  fragmentComments.appendChild(ArticleCommentsContainer);
}

function createComment({ name, icon, detail }) {
  const CommentContainer = document.createElement("div");
  CommentContainer.classList.add("a-comment-container");
  const iconNameContainer = document.createElement("div");
  iconNameContainer.classList.add("icon-name-container");
  const commentName = document.createElement("p");
  const commentIcon = document.createElement("img");
  const commentText = document.createElement("p");
  commentName.textContent = name;
  commentIcon.src = icon;
  commentText.textContent = detail;
  iconNameContainer.appendChild(commentIcon);
  iconNameContainer.appendChild(commentName);
  CommentContainer.appendChild(iconNameContainer);
  CommentContainer.appendChild(commentText);
  return CommentContainer;
}

function createThumbnail(image) {
  const img = document.createElement("img");
  img.classList.add("article-image");
  img.src = image;
  img.width = "100";
  img.height = "100";
  fragmentImages.appendChild(img);
  return img;
}

function combineArticlesThumbnail(id, select, img) {
  const genreContainer = document.createElement("div");
  genreContainer.classList.add("genre-container");
  const titleArea = document.createElement("div");
  const imageArea = document.createElement("div");
  titleArea.classList.add("content", "title-area");
  imageArea.classList.add("content", "image-area");
  genreContainer.id = id;
  genreContainer.appendChild(titleArea).appendChild(fragmentTitles);
  genreContainer.appendChild(imageArea).appendChild(img);
  // addClickEventShowComment();

  //初期表示の設定
  if (select) {
    genreContainer.classList.add("active");
  }
  fragmentGenres.appendChild(genreContainer);
}

function removeCircle() {
  document.getElementById("loading-circle").remove();
}

function withinThreeDays(day) {
  const today = new Date();
  const msInThreeDays = 30 * 24 * 60 * 60 * 1000;
  const diff = today.getTime() - day.getTime();
  return diff < msInThreeDays;
}

function addClickEventChangeElement(
  parentElem,
  isChangeClickedElem,
  parentOfRelationElem
) {
  parentElem.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) return;
    if (isChangeClickedElem) {
      parentElem.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");
    }
    if (parentOfRelationElem.querySelector(".active")) {
      parentOfRelationElem.querySelector(".active").classList.remove("active");
    }
    if (document.getElementById(e.target.dataset.id)) {
      document.getElementById(e.target.dataset.id).classList.add("active");
    }
  });
}

function addClickEventHideComment() {
  tabArea.addEventListener("click", () => {
    if (commentArea.querySelector(".active")) {
      commentArea.querySelector(".active").classList.remove("active");
    }
  });
}

async function fetchRenderData() {
  const availableDataSet = await fetchDataSet(articlesAPI);
  renderArticlesAndTabMenus(availableDataSet);
}

fetchRenderData();
