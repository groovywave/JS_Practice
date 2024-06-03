const logoutButton = document.getElementById('js-logoutButton');
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = './index.html';
});
