import * as validation from './modules/validation.js';

const username = document.getElementById('username');
username.focus();

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

const submitCheckbox = document.getElementById('js-submitCheckbox');
const submitButton = document.getElementById('js-submitButton');
let isReadUpToTheLastSentence = false;

function checkboxToBeChecked() {
  submitCheckbox.disabled = false;
  submitCheckbox.checked = true;
  if (!validation.isEveryRequiredItemValid()) return;
  submitButton.disabled = false;
}

function closeModal() {
  mask.classList.add('hidden');
  modal.classList.add('hidden');
}

function addToggleToTheSubmitCheckbox() {
  submitCheckbox.addEventListener('change', () => {
    if (!validation.isEveryRequiredItemValid()) return;
    if (!submitCheckbox.checked) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  });
}

mask.addEventListener('click', () => {
  closeModal();
  username.focus();
  if (isReadUpToTheLastSentence) {
    checkboxToBeChecked();
    addToggleToTheSubmitCheckbox();
  }
});

const closeButton = document.getElementById('js-closeButton');

closeButton.addEventListener('click', () => {
  mask.click();
});

function readUpToTheLastSentence(entries) {
  if (!entries[0].isIntersecting) {
    return;
  }
  isReadUpToTheLastSentence = true;
  submitCheckbox.disabled = false;
  submitCheckbox.checked = true;
}

submitButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = 'registration.html';
});

const lastSentence = document.getElementById('js-lastSentence');

const options = {
  root: modal,
  threshold: 1
};

const observer = new IntersectionObserver(readUpToTheLastSentence, options);

observer.observe(lastSentence);

const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

function checkUsernameAndToggleSubmitButton() {
  submitButton.disabled = true;
  if (validation.isEmptyForRequired(username)) return;
  if (validation.isInvalidForLength(username, 3, 15)) return;
  if (!validation.isEveryRequiredItemValid()) return;
  if (!submitCheckbox.checked) return;
  submitButton.disabled = false;
}

username.addEventListener('input', checkUsernameAndToggleSubmitButton);

function checkEmailAndToggleSubmitButton() {
  submitButton.disabled = true;
  if (validation.isEmptyForRequired(email)) return;
  if (validation.isInvalidForMail(email)) return;
  if (!validation.isEveryRequiredItemValid()) return;
  if (!submitCheckbox.checked) return;
  submitButton.disabled = false;
}

email.addEventListener('input', checkEmailAndToggleSubmitButton);

function checkMatchingPasswordsAndToggleSubmitButton() {
  submitButton.disabled = true;
  if (validation.isEmptyForRequired(confirmPassword)) return;
  if (validation.isNotMatchPasswords(password, confirmPassword)) return;
  if (!validation.isEveryRequiredItemValid()) return;
  if (!submitCheckbox.checked) return;
  submitButton.disabled = false;
}

function checkPasswordAndToggleSubmitButton() {
  submitButton.disabled = true;
  if (validation.isEmptyForRequired(password)) return;
  if (validation.isInvalidForPassword(password)) return;
  if (confirmPassword.value) checkMatchingPasswordsAndToggleSubmitButton();
  confirmPassword.addEventListener(
    'input',
    checkMatchingPasswordsAndToggleSubmitButton
  );
  password.addEventListener(
    'input',
    checkMatchingPasswordsAndToggleSubmitButton
  );
  if (!validation.isEveryRequiredItemValid()) return;
  if (!submitCheckbox.checked) return;
  submitButton.disabled = false;
}

password.addEventListener('input', checkPasswordAndToggleSubmitButton);
