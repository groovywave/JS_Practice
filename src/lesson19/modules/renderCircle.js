// export function renderCircle(element) {
//   const loadingCircle = document.createElement("img");
//   loadingCircle.src = "img/loading-circle.gif";
//   loadingCircle.alt = "ローディング画像";
//   loadingCircle.id = "js-loadingCircle";
//   element.appendChild(loadingCircle);
// }

export function renderCircle(element) {
  const loadingCircleContainer = document.createElement("div");
  loadingCircleContainer.id = "js-loadingCircleContainer";
  loadingCircleContainer.className = "loading-circle-container";
  const loadingCircle = document.createElement("img");
  loadingCircle.src = "img/loading-circle.gif";
  loadingCircle.alt = "ローディング画像";
  element.appendChild(loadingCircleContainer).appendChild(loadingCircle);
  // document.body.appendChild(loadingCircleContainer).appendChild(loadingCircle);
}
