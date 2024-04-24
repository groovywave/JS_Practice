const loginButton = document.getElementById('js-loginButton');
const registrationButton = document.getElementById('js-registrationButton');
console.log(loginButton);
console.log(registrationButton);
loginButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'login.html';
});

registrationButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'register.html';
});
