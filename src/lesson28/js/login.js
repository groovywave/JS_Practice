import * as validation from './modules/validation.js';

const url = 'https://660d2d926ddfa2943b337888.mockapi.io/api/v1/tasks';
const usernameOrEmail = document.getElementById('js-usernameOrEmail');
const password = document.getElementById('js-password');
const loginButton = document.getElementById('js-loginButton');

loginButton.addEventListener('click', async e => {
  e.preventDefault();
  const queryString = encodeURIComponent(usernameOrEmail.value);
  const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let response;
  let isEmail = false;
  try {
    if (!regularExpression.test(usernameOrEmail.value.trim())) {
      response = await fetch(`${url}?name=${queryString}`);
    } else {
      isEmail = true;
      response = await fetch(`${url}?email=${queryString}`);
    }
    const responseData = await response.json();
    if (!response.ok) {
      if (isEmail) {
        validation.showError(usernameOrEmail, 'No matching Email');
      } else {
        validation.showError(usernameOrEmail, 'No matching username');
      }
      console.error(`${response.status}:${response.statusText}`);
      return;
    }
    if (!responseData.length) {
      console.log('no data');
      return;
    }
    new Promise((resolve, reject) => {
      if (
        responseData[0].password === password.value &&
        (responseData[0].name === usernameOrEmail.value ||
          responseData[0].email === usernameOrEmail.value)
      ) {
        resolve({ token: 'ae2efaa8fd0255cfafda76a7', ok: true, code: 200 });
      } else {
        reject({ ok: false, code: 401 });
      }
    })
      .then(object => {
        localStorage.setItem('token', object.token);
        window.location.href = './contents.html';
      })
      .catch(() => {
        window.location.href = './login-failed.html';
      });
  } catch (error) {
    console.error(error);
  }
});
