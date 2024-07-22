import * as validation from './modules/validation.js';

const url = 'https://660d2d926ddfa2943b337888.mockapi.io/api/v1/tasks';
const emailForResetPassword = document.getElementById(
  'js-emailForResetPassword'
);
const buttonForResetPassword = document.getElementById(
  'js-buttonForResetPassword'
);

// https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

emailForResetPassword.addEventListener('input', () => {
  const isEmailValid = regularExpression.test(
    emailForResetPassword.value.trim()
  );
  buttonForResetPassword.disabled = !isEmailValid;
});

buttonForResetPassword.addEventListener('click', async e => {
  e.preventDefault();
  const queryString = encodeURIComponent(emailForResetPassword.value);
  let response;
  try {
    response = await fetch(`${url}?email=${queryString}`);
    const responseData = await response.json();
    if (!response.ok) {
      validation.showError(emailForResetPassword, 'Email not registered');
      console.error(`${response.status}:${response.statusText}`);
      return;
    }
    if (!responseData.length) {
      console.log('no data');
      return;
    }
    new Promise((resolve, reject) => {
      if (responseData[0].email === emailForResetPassword.value) {
        //The following is a temporary token.
        resolve({ token: '482r22fafah', ok: true, code: 200 });
      } else {
        reject({ ok: false, code: 401 });
      }
    })
      .then(object => {
        localStorage.setItem('token', object.token);
        window.location.href = './register/password.html';
      })
      .catch(() => {
        window.location.href = './login-failed.html';
      });
  } catch (error) {
    console.error(error);
  }
});
