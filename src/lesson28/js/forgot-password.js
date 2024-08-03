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
  try {
    const queryString = encodeURIComponent(emailForResetPassword.value);
    const response = await fetch(`${url}?email=${queryString}`);
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
    localStorage.setItem('resetPasswordToken', '482r22fafah');
    window.location.href = './register/password.html';
  } catch (error) {
    window.location.href = './login-failed.html';
  }
});
