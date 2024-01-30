const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

let stateOfItems = [
  { item: username, empty: true, result: false },
  { item: email, empty: true, result: false },
  { item: password, empty: true, result: false },
  { item: confirmPassword, empty: true, result: false }
];

export function showError(input, message) {
  input.classList.remove('border-gray-200');
  input.classList.remove('border-successColor');
  input.classList.add('border-errorColor');
  const parentElement = input.parentElement;
  const small = parentElement.querySelector('small');
  small.innerText = message;
  small.classList.remove('invisible');
}

export function getStateOfItem(input) {
  return stateOfItems.find(obj => obj.item === input);
}

export function showSuccess(input) {
  input.classList.remove('border-gray-200');
  input.classList.remove('border-errorColor');
  input.classList.add('border-successColor');
  const stateOfItem = getStateOfItem(input);
  stateOfItem.result = true;
  const parentElement = input.parentElement;
  const small = parentElement.querySelector('small');
  small.classList.add('invisible');
}

export function checkRequired(inputArr) {
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

export function removeErrorMessages(inputArr) {
  inputArr.forEach(input => {
    const parentElement = input.parentElement;
    const small = parentElement.querySelector('small');
    small.innerText = '';
    small.classList.add('invisible');
  });
}

export function checkForUnfilled(input) {
  const stateOfItem = getStateOfItem(input);
  if (stateOfItem.empty === true) return true;
}
export function checkLength(input, min, max) {
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

export function checkEmail(input) {
  if (checkForUnfilled(input)) return;
  const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
  if (regularExpression.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

export function checkPassword(input) {
  if (checkForUnfilled(input)) return;
  const regularExpression = /^[a-zA-Z0-9]{8,}$/;
  if (regularExpression.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Must be alphanumeric and at least 8 characters long');
  }
}

export function checkPasswordsMatch(input, confirmInput) {
  const stateOfItem = getStateOfItem(input);
  if (stateOfItem.result === false) return;
  if (input.value === confirmInput.value) {
    showSuccess(confirmInput);
  } else {
    showError(confirmInput, 'Passwords do not match');
  }
}

export function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
export function checkTheValidation() {
  removeErrorMessages([username, email, password, confirmPassword]);
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkEmail(email);
  checkPassword(password);
  checkPasswordsMatch(password, confirmPassword);
}

export function checkAllResultsOfValidation() {
  return stateOfItems.every(obj => obj.result === true);
}
