import * as validation from './modules/validation.js';

const url = 'https://660d2d926ddfa2943b337888.mockapi.io/api/v1/tasks';
const usernameOrEmail = document.getElementById('js-usernameOrEmail');
const password = document.getElementById('js-password');
const loginButton = document.getElementById('js-loginButton');

if (localStorage.getItem('token')) window.location.href = './contents.html';

loginButton.addEventListener('click', async e => {
  e.preventDefault();
  try {
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
    const response = await fetch(`${url}`);
    if (!response.ok) {
      window.location.href = './login-failed.html';
      return;
    }
    const responseData = await response.json();
    const regularExpression =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
    let isName = true;
    if (regularExpression.test(usernameOrEmail.value.trim())) isName = false;
    const matchedUserData = await new Promise(resolve => {
      resolve(
        responseData.find(obj => {
          return (
            obj.password === password.value &&
            (isName
              ? obj.name === usernameOrEmail.value
              : obj.email === usernameOrEmail.value)
          );
        })
      );
    });
    if (!matchedUserData) {
      window.location.href = './login-failed.html';
      return;
    }
    localStorage.setItem('token', matchedUserData.userId);
    window.location.href = './contents.html';
  } catch (error) {
    console.error(error);
    window.location.href = './login-failed.html';
  }
});
