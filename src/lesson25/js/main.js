const form = document.getElementById('js-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
let stateOfItems = [
  { itemName: username, empty: true, result: false },
  { itemName: email, empty: true, result: false },
  { itemName: password, empty: true, result: false },
  { itemName: confirmPassword, empty: true, result: false }
];

function showError(input, message) {
  input.classList.remove('border-gray-200');
  input.classList.remove('border-successColor');
  input.classList.add('border-errorColor');
  const parentElement = input.parentElement;
  const small = parentElement.querySelector('small');
  small.innerText = message;
  small.classList.remove('invisible');
}

function getStateOfItem(input) {
  return stateOfItems.find(obj => obj.itemName === input);
}

function showSuccess(input) {
  input.classList.remove('border-gray-200');
  input.classList.remove('border-errorColor');
  input.classList.add('border-successColor');
  const stateOfItem = getStateOfItem(input);
  stateOfItem.result = true;
  const parentElement = input.parentElement;
  const small = parentElement.querySelector('small');
  small.classList.add('invisible');
}

function checkRequired(inputArr) {
  inputArr.forEach(input => {
    const stateOfItem = getStateOfItem(input);
    if (input.value.trim() === '') {
      stateOfItem.empty = true;
      showError(input, `${getFieldName(input)} is required`);
    } else {
      stateOfItem.empty = false;
    }
  });
}
function removeErrorMessages(inputArr) {
  inputArr.forEach(input => {
    const parentElement = input.parentElement;
    const small = parentElement.querySelector('small');
    small.innerText = '';
    small.classList.add('invisible');
  });
}

function checkForUnfilled(input) {
  const stateOfItem = getStateOfItem(input);
  if (stateOfItem.empty === true) return true;
}

function checkLength(input, min, max) {
  if (checkForUnfilled(input)) return;
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  if (checkForUnfilled(input)) return;
  const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
  if (regularExpression.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkPassword(input) {
  if (checkForUnfilled(input)) return;
  const regularExpression = /^[a-zA-Z0-9]{8,}$/;
  if (regularExpression.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Must be alphanumeric and at least 8 characters long');
  }
}

function checkPasswordsMatch(input, confirmInput) {
  const stateOfItem = getStateOfItem(input);
  if (stateOfItem.result === false) return;
  if (input.value === confirmInput.value) {
    showSuccess(confirmInput);
  } else {
    showError(confirmInput, 'Passwords do not match');
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkTheValidation() {
  removeErrorMessages([username, email, password, confirmPassword]);
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 1, 15);
  checkEmail(email);
  checkPassword(password);
  checkPasswordsMatch(password, confirmPassword);
}

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

function checkAllResultsOfValidation() {
  return stateOfItems.every(obj => obj.result === true);
}

submitButton.addEventListener('click', e => {
  e.preventDefault();
  checkTheValidation();
  if (!checkAllResultsOfValidation()) return;
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
