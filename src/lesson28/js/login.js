import * as validation from './modules/validation.js';

const url = 'https://660d2d926ddfa2943b337888.mockapi.io/api/v1/tasks';
const usernameOrEmail = document.getElementById('js-usernameOrEmail');
const password = document.getElementById('js-password');
const loginButton = document.getElementById('js-loginButton');

if (localStorage.getItem('token') === 'ae2efaa8fd0255cfafda76a7')
  window.location.href = './contents.html';

loginButton.addEventListener('click', async e => {
  e.preventDefault();
  const queryStringOfUsernameOrEmail = encodeURIComponent(
    usernameOrEmail.value
  );
  const queryStringOfPassword = encodeURIComponent(password.value);
  // https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
  let response;
  try {
    const regularExpression =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    validation.removeErrorMessages([usernameOrEmail, password]);
    validation.removeErrorColor([usernameOrEmail, password]);
    if (usernameOrEmail.value === '') {
      validation.showError(usernameOrEmail, 'No data');
      return;
    }
    if (password.value === '') {
      validation.showError(password, 'No data');
      return;
    }
    if (!regularExpression.test(usernameOrEmail.value.trim())) {
      response = await fetch(
        `${url}?name=${queryStringOfUsernameOrEmail}&password=${queryStringOfPassword}`
      );
    } else {
      response = await fetch(
        `${url}?email=${queryStringOfUsernameOrEmail}&password=${queryStringOfPassword}`
      );
    }
    if (!response.ok) {
      window.location.href = './login-failed.html';
      return;
    }
    localStorage.setItem('token', 'ae2efaa8fd0255cfafda76a7');
    window.location.href = './contents.html';
  } catch (error) {
    console.error(error);
    window.location.href = './login-failed.html';
  }
});
