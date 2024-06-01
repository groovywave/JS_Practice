const logoutLink = document.getElementById('js-logoutLink');
logoutLink.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = './index.html';
});
