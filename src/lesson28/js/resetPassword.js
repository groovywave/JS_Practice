import Chance from 'chance';
import * as validation from './modules/validation.js';

const password = document.getElementById('js-password');
const confirmPassword = document.getElementById('js-confirmPassword');

let baseStateOfItems = {
  isEmpty: true,
  isValid: false,
  errorMessage: null,
};

let stateOfItems = [
  {
    item: password,
    name: 'password',
    ...baseStateOfItems,
  },
  {
    item: confirmPassword,
    name: 'confirmPassword',
    ...baseStateOfItems,
  },
];

function getStateOfItem(input) {
  return stateOfItems.find(obj => obj.item === input);
}

const submitButton = document.getElementById('js-submitButton');

submitButton.addEventListener('click', e => {
  e.preventDefault();
  const chance = new Chance();
  const token = chance.guid();
  localStorage.setItem('token', token);
  window.location.href(`./password-done.html?token=${token}`);
});

const stateOfPassword = getStateOfItem(password);
const stateOfConfirmPassword = getStateOfItem(confirmPassword);

function checkAndShowPasswordValidation() {
  if (validation.isEmpty(password.value, stateOfPassword)) {
    validation.showError(password, stateOfPassword.errorMessage);
    return;
  }
  if (!validation.isValidPassword(password.value, stateOfPassword)) {
    stateOfPassword.isValid = false;
    validation.showError(password, stateOfPassword.errorMessage);
    return;
  }
  stateOfPassword.isValid = true;
  validation.showSuccess(password);
}

function checkAndShowConfirmPasswordValidation() {
  if (validation.isEmpty(confirmPassword.value, stateOfConfirmPassword)) {
    validation.showError(confirmPassword, stateOfConfirmPassword.errorMessage);
    return;
  }
  if (
    !validation.isMatchingPasswords(
      password.value,
      confirmPassword.value,
      stateOfConfirmPassword
    )
  ) {
    stateOfConfirmPassword.isValid = false;
    validation.showError(confirmPassword, stateOfConfirmPassword.errorMessage);
    return;
  }
  stateOfConfirmPassword.isValid = true;
  validation.showSuccess(confirmPassword);
}

function enableSubmitWhenAllInputValid() {
  if (!validation.isEveryRequiredItemValid(stateOfItems)) return;
  submitButton.disabled = false;
}

password.addEventListener('blur', () => {
  submitButton.disabled = true;
  if (!password.value.trim()) return;
  checkAndShowPasswordValidation();
  if (!confirmPassword.value.trim()) return;
  checkAndShowConfirmPasswordValidation();
  enableSubmitWhenAllInputValid();
});

confirmPassword.addEventListener('blur', () => {
  submitButton.disabled = true;
  if (!password.value.trim()) return;
  if (!confirmPassword.value.trim()) return;
  checkAndShowConfirmPasswordValidation();
  enableSubmitWhenAllInputValid();
});
