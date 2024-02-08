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

export function getStateOfItem(input) {
  return stateOfItems.find(obj => obj.item === input);
}

export function showError(input, message) {
  input.classList.remove('border-gray-200');
  input.classList.remove('border-successColor');
  input.classList.add('border-errorColor');
  const stateOfItem = getStateOfItem(input);
  stateOfItem.result = false;
  const parentElement = input.parentElement;
  const small = parentElement.querySelector('small');
  small.innerText = message;
  small.classList.remove('invisible');
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

export function isEmptyForRequired(input) {
  const stateOfItem = getStateOfItem(input);
  if (input.value.trim() === '') {
    stateOfItem.empty = true;
    showError(input, `${getFieldName(input)} is required`);
    return true;
  } else {
    stateOfItem.empty = false;
    return false;
  }
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

export function isInvalidForLength(input, min, max) {
  if (checkForUnfilled(input)) return;
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    return true;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    return true;
  } else {
    showSuccess(input);
    return false;
  }
}

export function isInvalidForMail(input) {
  if (checkForUnfilled(input)) return;
  const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
  if (regularExpression.test(input.value.trim())) {
    showSuccess(input);
    return false;
  } else {
    showError(input, 'Email is not valid');
    return true;
  }
}

export function isInvalidForPassword(input) {
  if (checkForUnfilled(input)) return;
  const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  // https://genkichi.hateblo.jp/entry/2019/02/23/143527
  if (regularExpression.test(input.value.trim())) {
    showSuccess(input);
    return false;
  } else {
    showError(input, 'Min 8 chars, including 1 uppercase and 1 number');
    return true;
  }
}

export function isNotMatchPasswords(input, confirmInput) {
  const stateOfItem = getStateOfItem(input);
  if (stateOfItem.result === false) return;
  if (input.value === confirmInput.value) {
    showSuccess(confirmInput);
    return false;
  } else {
    showError(confirmInput, 'Passwords do not match');
    return true;
  }
}

export function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

const minCharCount = 3;
const maxCharCount = 15;

export function checkTheValidation() {
  removeErrorMessages([username, email, password, confirmPassword]);
  isInvalidForLength(username, minCharCount, maxCharCount);
  checkEmail(email);
  checkPassword(password);
  checkPasswordsMatch(password, confirmPassword);
}

export function isEveryRequiredItemValid() {
  return stateOfItems.every(obj => obj.result === true);
}
