const loginPageButton = document.getElementById('js-loginPageButton');
const registrationButton = document.getElementById('js-registrationButton');
loginPageButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'login.html';
});

registrationButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'registration.html';
});
