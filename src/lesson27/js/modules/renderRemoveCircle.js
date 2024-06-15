export function renderCircle(element) {
  const loadingCircleContainer = document.createElement('div');
  loadingCircleContainer.id = 'js-loadingCircleContainer';
  loadingCircleContainer.classList.add('flex');
  const loadingCircle = document.createElement('img');
  loadingCircle.classList.add('mx-auto');
  loadingCircle.src = '/assets/img/loading-circle.gif';
  loadingCircle.alt = 'ローディング画像';
  element.appendChild(loadingCircleContainer).appendChild(loadingCircle);
}

export function removeCircle() {
  document.getElementById('js-loadingCircleContainer').remove();
}
