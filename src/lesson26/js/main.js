import * as validation from './modules/validation.js';

const username = document.getElementById('js-username');
const email = document.getElementById('js-email');
const password = document.getElementById('js-password');
const confirmPassword = document.getElementById('js-confirmPassword');

username.focus();

let stateOfItems = [
  {
    item: username,
    name: 'username',
    isEmpty: true,
    isValid: false,
    errorMessage: 'none',
    theOtherErrorMessage: 'none'
  },
  {
    item: email,
    name: 'email',
    isEmpty: true,
    isValid: false,
    errorMessage: 'none',
    theOtherErrorMessage: 'none'
  },
  {
    item: password,
    name: 'password',
    isEmpty: true,
    isValid: false,
    errorMessage: 'none',
    theOtherErrorMessage: 'none'
  },
  {
    item: confirmPassword,
    name: 'confirmPassword',
    isEmpty: true,
    isValid: false,
    errorMessage: 'none',
    theOtherErrorMessage: 'none'
  }
];

function getStateOfItem(input) {
  return stateOfItems.find(obj => obj.item === input);
}

const submitCheckbox = document.getElementById('js-submitCheckbox');
const submitButton = document.getElementById('js-submitButton');

submitButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'registration.html';
});

function checkboxToBeChecked() {
  submitCheckbox.disabled = false;
  submitCheckbox.checked = true;
}

function toggleSubmitButton() {
  if (submitCheckbox.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function addToggleToTheSubmitCheckbox() {
  submitCheckbox.addEventListener('change', () => {
    toggleSubmitButton();
  });
}

const stateOfUsername = getStateOfItem(username);

const minCharCount = 3;
const maxCharCount = 15;

function checkAndShowUsernameValidation() {
  if (validation.isEmpty(username.value, stateOfUsername)) {
    validation.showError(username, stateOfUsername.errorMessage);
    return;
  }
  const isValidUsername = validation.isValidUsername(
    username.value,
    stateOfUsername,
    minCharCount,
    maxCharCount
  );
  console.log(
    '🚀 ~ checkAndShowUsernameValidation ~ isValidUsername:',
    isValidUsername
  );
  if (!isValidUsername) {
    console.log('here is in if(!isValidUsername)');
    stateOfUsername.isValid = false;
    validation.showError(username, stateOfUsername.errorMessage);
    return;
  }
  stateOfUsername.isValid = true;
  validation.showSuccess(username);
}

const stateOfEmail = getStateOfItem(email);

function checkAndShowEmailValidation() {
  if (validation.isEmpty(email.value, stateOfEmail)) {
    validation.showError(email, stateOfEmail.errorMessage);
    return;
  }
  const isValidEmail = validation.isValidEmail(email.value, stateOfEmail);
  if (!isValidEmail) {
    stateOfEmail.isValid = false;
    validation.showError(email, stateOfEmail.errorMessage);
    return;
  }
  stateOfEmail.isValid = true;
  validation.showSuccess(email);
}

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

function checkAllItems() {
  checkAndShowUsernameValidation();
  checkAndShowEmailValidation();
  checkAndShowPasswordValidation();
  checkAndShowConfirmPasswordValidation();
}

function checkAllItemsAndToggleSubmitButton() {
  submitButton.disabled = true;
  checkAllItems();
  if (!validation.isEveryRequiredItemValid(stateOfItems)) return;
  if (!submitCheckbox.checked) return;
  addToggleToTheSubmitCheckbox();
  toggleSubmitButton();
}

username.addEventListener('input', () => {
  console.log('input in username', username.value);
  submitButton.disabled = true;
  checkAndShowUsernameValidation();
  if (
    stateOfUsername.isValid &&
    !validation.isSomeRequiredItemEmpty(stateOfItems)
  )
    checkAllItemsAndToggleSubmitButton();
});

email.addEventListener('input', () => {
  submitButton.disabled = true;
  checkAndShowEmailValidation();
  if (stateOfEmail.isValid && !validation.isSomeRequiredItemEmpty(stateOfItems))
    checkAllItemsAndToggleSubmitButton();
});
password.addEventListener('input', () => {
  submitButton.disabled = true;
  checkAndShowPasswordValidation();
  confirmPassword.addEventListener('input', () => {
    checkAndShowConfirmPasswordValidation();
    if (
      stateOfConfirmPassword.isValid &&
      !validation.isSomeRequiredItemEmpty(stateOfItems)
    )
      checkAllItemsAndToggleSubmitButton();
  });
  if (!confirmPassword.value) return;
  checkAndShowConfirmPasswordValidation();
  if (
    stateOfConfirmPassword.isValid &&
    !validation.isSomeRequiredItemEmpty(stateOfItems)
  )
    checkAllItemsAndToggleSubmitButton();
});

const linkToRule = document.getElementById('js-linkToRule');
const mask = document.getElementById('js-mask');
const modal = document.getElementById('js-modal');
const modalBody = document.getElementById('js-modalBody');

linkToRule.addEventListener('click', event => {
  event.preventDefault();
  mask.classList.remove('hidden');
  modal.classList.remove('hidden');
  modalBody.focus();
});

function closeModal() {
  mask.classList.add('hidden');
  modal.classList.add('hidden');
}

mask.addEventListener('click', () => {
  closeModal();
  username.focus();
});

const closeButton = document.getElementById('js-closeButton');

closeButton.addEventListener('click', () => {
  mask.click();
});

function readUpToTheLastSentence(entries) {
  if (!entries[0].isIntersecting) {
    return;
  }
  checkboxToBeChecked();
  // addToggleToTheSubmitCheckbox();
  mask.addEventListener('click', () => {
    // if (!validation.isSomeRequiredItemEmpty(stateOfItems))
    checkAllItemsAndToggleSubmitButton();
  });
}

const options = {
  root: modal,
  threshold: 1
};

const observer = new IntersectionObserver(readUpToTheLastSentence, options);

const lastSentence = document.getElementById('js-lastSentence');

observer.observe(lastSentence);
