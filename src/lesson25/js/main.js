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
function checkboxToBeChecked() {
  submitCheckbox.disabled = false;
  submitCheckbox.checked = true;
  if (!validation.isEveryRequiredItemValid(stateOfItems)) return;
  submitButton.disabled = false;
}

function closeModal() {
  mask.classList.add('hidden');
  modal.classList.add('hidden');
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
  addToggleToTheSubmitCheckbox();
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

let stateOfItems = [
  { item: username, empty: true, result: false },
  { item: email, empty: true, result: false },
  { item: password, empty: true, result: false },
  { item: confirmPassword, empty: true, result: false }
];

function getStateOfItem(input) {
  return stateOfItems.find(obj => obj.item === input);
}

function checkItemAndToggleSubmitButton(func, arg, anotherArgs) {
  submitButton.disabled = true;
  if (validation.isEmptyForRequired(arg, getStateOfItem(arg))) return;
  if (func(arg, ...anotherArgs)) return;
  if (!validation.isEveryRequiredItemValid(stateOfItems)) return;
  if (!submitCheckbox.checked) return;
  submitButton.disabled = false;
}
username.addEventListener('input', () => {
  const minCharCount = 3;
  const maxCharCount = 15;
  checkItemAndToggleSubmitButton(validation.isInvalidForLength, username, [
    getStateOfItem(username),
    minCharCount,
    maxCharCount
  ]);
});

email.addEventListener('input', () => {
  checkItemAndToggleSubmitButton(validation.isInvalidForMail, email, [
    getStateOfItem(email)
  ]);
});

function checkMatchingPasswordsAndToggleSubmitButton() {
  checkItemAndToggleSubmitButton(validation.isNotMatchPasswords, password, [
    confirmPassword,
    getStateOfItem(confirmPassword)
  ]);
}

function checkPasswordAndToggleSubmitButton() {
  checkItemAndToggleSubmitButton(validation.isInvalidForPassword, password, [
    getStateOfItem(password)
  ]);
  if (!getStateOfItem(password).result) return;
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
