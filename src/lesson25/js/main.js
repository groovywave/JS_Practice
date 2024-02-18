import * as validation from './modules/validation.js';

const username = document.getElementById('username');

username.focus();

const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

let stateOfItems = [
  { item: username, empty: true, isValid: false },
  { item: email, empty: true, isValid: false },
  { item: password, empty: true, isValid: false },
  { item: confirmPassword, empty: true, isValid: false }
];

function getStateOfItem(input) {
  return stateOfItems.find(obj => obj.item === input);
}

const submitButton = document.getElementById('js-submitButton');

submitButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'registration.html';
});

function checkItemAndToggleSubmitButton(func, arg, anotherArgs) {
  submitButton.disabled = true;
  if (validation.showEmptyError(arg, getStateOfItem(arg))) return;
  if (func(arg, ...anotherArgs)) return;
  if (!validation.isEveryRequiredItemValid(stateOfItems)) return;
  if (!submitCheckbox.checked) return;
  submitButton.disabled = false;
}

const minCharCount = 3;
const maxCharCount = 15;

username.addEventListener('input', () => {
  checkItemAndToggleSubmitButton(
    validation.showResultUsernameValidation,
    username,
    [getStateOfItem(username), minCharCount, maxCharCount]
  );
});

email.addEventListener('input', () => {
  checkItemAndToggleSubmitButton(validation.showResultEmailValidation, email, [
    getStateOfItem(email)
  ]);
});
function checkMatchingPasswordsAndToggleSubmitButton() {
  checkItemAndToggleSubmitButton(
    validation.showResultMatchingPasswords,
    password,
    [confirmPassword, getStateOfItem(confirmPassword)]
  );
}

function checkPasswordAndToggleSubmitButton() {
  checkItemAndToggleSubmitButton(
    validation.showResultPasswordValidation,
    password,
    [getStateOfItem(password)]
  );
  if (!getStateOfItem(password).isValid) return;
  if (confirmPassword.value) checkMatchingPasswordsAndToggleSubmitButton();
  confirmPassword.addEventListener('input', () => {
    checkMatchingPasswordsAndToggleSubmitButton();
  });
  password.addEventListener('input', () => {
    checkMatchingPasswordsAndToggleSubmitButton();
  });
}

password.addEventListener('input', () => {
  checkPasswordAndToggleSubmitButton();
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

const submitCheckbox = document.getElementById('js-submitCheckbox');

function checkboxToBeChecked() {
  submitCheckbox.disabled = false;
  submitCheckbox.checked = true;
  if (!validation.isEveryRequiredItemValid(stateOfItems)) return;
  submitButton.disabled = false;
}

function addToggleToTheSubmitCheckbox() {
  submitCheckbox.addEventListener('change', () => {
    if (!validation.isEveryRequiredItemValid(stateOfItems)) return;
    if (!submitCheckbox.checked) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  });
}

function checkAllItems() {
  checkItemAndToggleSubmitButton(
    validation.showResultUsernameValidation,
    username,
    [getStateOfItem(username), minCharCount, maxCharCount]
  );
  checkItemAndToggleSubmitButton(validation.showResultEmailValidation, email, [
    getStateOfItem(email)
  ]);
  checkItemAndToggleSubmitButton(
    validation.showResultMatchingPasswords,
    password,
    [confirmPassword, getStateOfItem(confirmPassword)]
  );
  checkPasswordAndToggleSubmitButton();
}

function readUpToTheLastSentence(entries) {
  if (!entries[0].isIntersecting) {
    return;
  }
  checkboxToBeChecked();
  addToggleToTheSubmitCheckbox();
  mask.addEventListener('click', () => {
    checkAllItems();
  });
}

const options = {
  root: modal,
  threshold: 1
};

const observer = new IntersectionObserver(readUpToTheLastSentence, options);

const lastSentence = document.getElementById('js-lastSentence');

observer.observe(lastSentence);
