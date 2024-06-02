export function renderCircle(element) {
  const loadingCircleContainer = document.createElement('div');
  loadingCircleContainer.id = 'js-loadingCircleContainer';
  // loadingCircleContainer.classList.add('loading-circle-container');
  loadingCircleContainer.classList.add('flex');
  const loadingCircle = document.createElement('img');
  // loadingCircle.classList.add('loading-circle');
  loadingCircle.classList.add('mx-auto');
  loadingCircle.src = '/assets/img/loading-circle.gif';
  loadingCircle.alt = 'ローディング画像';
  element.appendChild(loadingCircleContainer).appendChild(loadingCircle);
}
