const loginButton = document.getElementById('js-loginButton');
const registrationButton = document.getElementById('js-registrationButton');
loginButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'login.html';
});

registrationButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'registration.html';
});
