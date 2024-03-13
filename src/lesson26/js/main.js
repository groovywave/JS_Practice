import * as validation from './modules/validation.js';

const usernameOrEmail = document.getElementById('js-usernameOrEmailLabel');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

usernameOrEmail.focus();

let stateOfItems = [
  {
    item: usernameOrEmail,
    name: 'usernameOrEmail',
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

const minCharCount = 3;
const maxCharCount = 15;
const stateOfUsernameOrEmail = getStateOfItem(usernameOrEmail);
let intervalIdForErrorMessages;

function checkAndShowUsernameOrEmailValidation() {
  if (validation.isEmpty(usernameOrEmail.value, stateOfUsernameOrEmail)) {
    validation.showError(usernameOrEmail, stateOfUsernameOrEmail.errorMessage);
    return;
  }
  const isValidUsername = validation.isValidUsername(
    usernameOrEmail.value,
    stateOfUsernameOrEmail,
    minCharCount,
    maxCharCount
  );
  const isValidEmail = validation.isValidEmail(
    usernameOrEmail.value,
    stateOfUsernameOrEmail
  );
  if (!isValidUsername && !isValidEmail) {
    stateOfUsernameOrEmail.isValid = false;
    validation.showError(usernameOrEmail, stateOfUsernameOrEmail.errorMessage);
    let toggle = true;
    intervalIdForErrorMessages = setInterval(() => {
      if (toggle) {
        validation.showError(
          usernameOrEmail,
          stateOfUsernameOrEmail.errorMessage
        );
      } else {
        validation.showError(
          usernameOrEmail,
          stateOfUsernameOrEmail.theOtherErrorMessage
        );
      }
      toggle = !toggle;
    }, 2000);
    return;
  }
  stateOfUsernameOrEmail.isValid = true;
  validation.showSuccess(usernameOrEmail);
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
  checkAndShowUsernameOrEmailValidation();
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

usernameOrEmail.addEventListener('input', () => {
  submitButton.disabled = true;
  clearInterval(intervalIdForErrorMessages);
  checkAndShowUsernameOrEmailValidation();
  if (
    stateOfUsernameOrEmail.isValid &&
    !validation.isSomeRequiredItemEmpty(stateOfItems)
  )
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
  usernameOrEmail.focus();
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
  addToggleToTheSubmitCheckbox();
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
