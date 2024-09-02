import * as validation from './modules/validation.js';
import Chance from 'chance';

const url = 'https://mocki.io/v1/3b2e42e1-a5bc-4523-8505-8e58e7c6d28d';
const emailForResetPassword = document.getElementById(
  'js-emailForResetPassword'
);
const buttonForResetPassword = document.getElementById(
  'js-buttonForResetPassword'
);

// https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

emailForResetPassword.addEventListener('input', () => {
  const isEmail = regularExpression.test(emailForResetPassword.value.trim());
  buttonForResetPassword.disabled = !isEmail;
});

buttonForResetPassword.addEventListener('click', async e => {
  e.preventDefault();
  try {
    const response = await fetch(url);
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

    const isRegistered = responseData.find(obj => {
      return obj.email === emailForResetPassword.value;
    });
    if (!isRegistered) {
      validation.showError(emailForResetPassword, 'Email not registered');
      return;
    }

    const chance = new Chance();
    const resetPasswordToken = chance.guid();
    localStorage.setItem('resetPasswordToken', resetPasswordToken);
    window.location.href = `./register/password.html?resetPasswordToken=${resetPasswordToken}`;
  } catch (error) {
    // console.error(error?.message || 'An unknown error occurred.');
    window.location.replace = './login-failed.html';
  }
});
