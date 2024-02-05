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

const submitButton = document.getElementById('js-submitButton');
const submitCheckbox = document.getElementById('js-submitCheckbox');

function submitButtonToBeClickable() {
  submitCheckbox.disabled = false;
  submitCheckbox.checked = true;
  submitButton.disabled = false;
}

function submitButtonNotToBeClickable() {
  submitCheckbox.disabled = true;
  submitCheckbox.checked = false;
  submitButton.disabled = true;
}

let isReadUpToTheLastSentence = false;

mask.addEventListener('click', () => {
  closeModal();
  username.focus();
  if (isReadUpToTheLastSentence) {
    submitButtonToBeClickable();
    addToggleToTheSubmitCheckbox();
  } else {
    submitButtonNotToBeClickable();
  }
});

function addToggleToTheSubmitCheckbox() {
  submitCheckbox.addEventListener('change', () => {
    if (submitCheckbox.checked) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });
}

function readUpToTheLastSentence(entries) {
  if (!entries[0].isIntersecting) {
    return;
  }
  isReadUpToTheLastSentence = true;
  submitButtonToBeClickable();
  addToggleToTheSubmitCheckbox();
}

submitButton.addEventListener('click', e => {
  e.preventDefault();
  validation.checkTheValidation();
  if (!validation.checkAllResultsOfValidation()) return;
  window.location.href = 'registration.html';
});

const lastSentence = document.getElementById('js-lastSentence');

const options = {
  root: modal,
  threshold: 1
};

const observer = new IntersectionObserver(readUpToTheLastSentence, options);

observer.observe(lastSentence);
