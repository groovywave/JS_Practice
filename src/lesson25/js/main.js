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

function closeModal() {
  mask.classList.add('hidden');
  modal.classList.add('hidden');
}

const closeButton = document.getElementById('js-closeButton');

closeButton.addEventListener('click', () => {
  closeModal();
  username.focus();
});

const agreeButton = document.getElementById('js-agreeButton');
const submitButton = document.getElementById('js-submitButton');
const submitCheckbox = document.getElementById('js-submitCheckbox');

function checkboxNotToBeChecked() {
  submitCheckbox.disabled = true;
  submitCheckbox.checked = false;
}

mask.addEventListener('click', () => {
  closeModal();
  checkboxNotToBeChecked();
  submitButton.disabled = true;
  username.focus();
});

const cancelButton = document.getElementById('js-cancelButton');

cancelButton.addEventListener('click', () => {
  mask.click();
  username.focus();
});

function addClickAgreeButtonToCloseModal() {
  agreeButton.addEventListener('click', () => {
    closeModal();
    submitButton.disabled = false;
    username.focus();
  });
}

function checkboxToBeChecked() {
  submitCheckbox.disabled = false;
  submitCheckbox.checked = true;
}

function toggleSubmitCheckbox() {
  submitCheckbox.addEventListener('change', () => {
    if (submitCheckbox.checked) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });
}

function changeAgreeButtonToClickable(entries) {
  if (!entries[0].isIntersecting) {
    return;
  }
  agreeButton.disabled = false;
  addClickAgreeButtonToCloseModal();
  checkboxToBeChecked();
  toggleSubmitCheckbox();
}

submitButton.addEventListener('click', e => {
  e.preventDefault();
  validation.checkTheValidation();
  if (!validation.checkAllResultsOfValidation()) return;
  window.location.href = 'registration.html';
});

const options = {
  root: modal,
  threshold: 1
};

const observer = new IntersectionObserver(
  changeAgreeButtonToClickable,
  options
);

observer.observe(agreeButton);
