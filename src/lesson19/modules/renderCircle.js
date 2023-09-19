export function renderCircle(element) {
  const loadingCircleContainer = document.createElement("div");
  loadingCircleContainer.id = "js-loadingCircleContainer";
  loadingCircleContainer.className = "loading-circle-container";
  const loadingCircle = document.createElement("img");
  loadingCircle.src = "./img/loading-circle.gif";
  loadingCircle.alt = "ローディング画像";
  element.appendChild(loadingCircleContainer).appendChild(loadingCircle);
}
