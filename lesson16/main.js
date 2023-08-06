const articlesAPI = {
  main: "https://mocki.io/v1/d9f490ff-11bf-4488-b5a5-17234f6e1bcc",
  economy: "https://mocki.io/v1/0bd9421b-8df2-4129-b410-851490f7c9cb",
  entertainment: "https://mocki.io/v1/fe8f0b85-5d1a-4d63-a94a-816b586fc786",
  sports: "https://mocki.io/v1/6a8f82a2-0b80-49e6-baa3-3d5ad600b01c",
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

function renderArticlesAndTabMenus(allArticles) {
  for (const aGenreArticles of allArticles) {
    createTab(aGenreArticles);
    createArticles(aGenreArticles);
    const thumbnail = createThumbnail(aGenreArticles);
    combineArticlesThumbnail(aGenreArticles, thumbnail);
    createComments(aGenreArticles);
  }
  tabArea.appendChild(fragmentTabs);
  articleArea.appendChild(fragmentGenres);
  commentArea.appendChild(fragmentComments);
  tabArea.insertAdjacentElement("afterend", articleArea);
  addClickEventChangeGenre();
  articleArea.insertAdjacentElement("afterend", commentArea);
  addClickEventShowComment();
}

function createTab({ category, id, select }) {
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

function createArticles({ article }) {
  const articles = article;
  for (const article of articles) {
    const articleContainer = document.createElement("div");
    articleContainer.classList.add("article-container");
    const title = createTitle(article);
    const newIconContainer = createNewIconContainer(article);
    const commentIconContainer = createCommentIconContainer(article);
    articleContainer.appendChild(title);
    articleContainer.appendChild(newIconContainer);
    articleContainer.appendChild(commentIconContainer);
    fragmentTitles.appendChild(articleContainer);
  }
}

function createTitle(article) {
  const title = document.createElement("li");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = "#";
  titleAnchor.textContent = article.title;
  title.appendChild(titleAnchor);
  return title;
}

function createNewIconContainer({ date }) {
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

function createCommentIconContainer({ id, comment }) {
  const commentIconContainer = document.createElement("div");
  commentIconContainer.classList.add("comment-icon-container");
  if (comment.length > 0) {
    const commentIcon = document.createElement("img");
    commentIcon.classList.add("comment-icon");
    commentIcon.src = "./img/comment.png";
    commentIcon.width = "14";
    commentIcon.height = "14";
    commentIcon.dataset.id = id;
    commentIconContainer.appendChild(commentIcon);

    const numOfComments = document.createElement("div");
    numOfComments.classList.add("comment-num");
    numOfComments.textContent = comment.length;
    numOfComments.alt = "コメント数";
    commentIconContainer.appendChild(numOfComments);
  }
  return commentIconContainer;
}

function createComments({ article }) {
  article.forEach(({ comment, id }) => {
    const anArticleCommentsContainer = document.createElement("div");
    anArticleCommentsContainer.id = id;
    anArticleCommentsContainer.classList.add("comment-container");
    // anArticleCommentsContainer.style.display = "none";
    comment.forEach((comment) => {
      const aComment = createComment(comment);
      anArticleCommentsContainer.appendChild(aComment);
    });
    fragmentComments.appendChild(anArticleCommentsContainer);
  });
}

function createComment({ name, icon, detail }) {
  const aCommentContainer = document.createElement("div");
  aCommentContainer.classList.add("a-comment-container");
  const anIconNameContainer = document.createElement("div");
  anIconNameContainer.classList.add("icon-name-container");
  const aTextContainer = document.createElement("div");
  const commentName = document.createElement("p");
  const commentIcon = document.createElement("img");
  const commentText = document.createElement("p");
  commentName.textContent = name;
  commentIcon.src = icon;
  commentText.textContent = detail;
  anIconNameContainer.appendChild(commentIcon);
  anIconNameContainer.appendChild(commentName);
  aTextContainer.appendChild(commentText);
  aCommentContainer.appendChild(anIconNameContainer);
  aCommentContainer.appendChild(aTextContainer);
  return aCommentContainer;
}

function createThumbnail({ image }) {
  const img = document.createElement("img");
  img.classList.add("article-image");
  img.src = image;
  img.width = "100";
  img.height = "100";
  fragmentImages.appendChild(img);
  return img;
}

function combineArticlesThumbnail({ id, select }, img) {
  const genreContainer = document.createElement("div");
  genreContainer.classList.add("genre-container");
  const titleArea = document.createElement("div");
  const imageArea = document.createElement("div");
  titleArea.classList.add("content", "title-area");
  imageArea.classList.add("content", "image-area");
  genreContainer.id = id;
  genreContainer.appendChild(titleArea).appendChild(fragmentTitles);
  genreContainer.appendChild(imageArea).appendChild(img);

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

function addClickEventChangeGenre() {
  tabArea.addEventListener("click", (e) => {
    const targetElement = e.target;
    if (targetElement === e.currentTarget) return;
    tabArea.querySelector(".active").classList.remove("active");
    targetElement.classList.add("active");
    articleArea.querySelector(".active").classList.remove("active");
    document.getElementById(targetElement.dataset.id).classList.add("active");
    if (commentArea.querySelector(".active")) {
      commentArea.querySelector(".active").classList.remove("active");
    }
  });
}

function addClickEventShowComment() {
  articleArea.addEventListener("click", (e) => {
    const targetElement = e.target;
    if (!targetElement.classList.contains("comment-icon")) return;
    const targetId = targetElement.dataset.id;
    if (commentArea.querySelector(".active")) {
      commentArea.querySelector(".active").classList.remove("active");
    }
    if (document.getElementById(targetElement.dataset.id)) {
      document.getElementById(targetElement.dataset.id).classList.add("active");
    }
  });
}

async function fetchRenderData() {
  const availableDataSet = await fetchDataSet(articlesAPI);
  renderArticlesAndTabMenus(availableDataSet);
}

fetchRenderData();
