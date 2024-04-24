export function showError(input, stateOfItem, message) {
  input.classList.remove('border-gray-200');
  input.classList.remove('border-successColor');
  input.classList.add('border-errorColor');
  stateOfItem.isValid = false;
  const parentElement = input.parentElement;
  const small = parentElement.querySelector('small');
  small.innerText = message;
  small.classList.remove('invisible');
}

export function showSuccess(input, stateOfItem) {
  input.classList.remove('border-gray-200');
  input.classList.remove('border-errorColor');
  input.classList.add('border-successColor');
  stateOfItem.isValid = true;
  const parentElement = input.parentElement;
  const small = parentElement.querySelector('small');
  small.classList.add('invisible');
}

export function showEmptyError(input, stateOfItem) {
  if (input.value.trim() === '') {
    stateOfItem.empty = true;
    showError(
      input,
      stateOfItem,
      `${capitalizeTheFirstLetter(input)} is required`
    );
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

export function isEmpty(stateOfItem) {
  if (stateOfItem.empty) return true;
}

export function showResultUsernameValidation(input, stateOfItem, min, max) {
  if (isEmpty(input)) return;
  if (input.value.length < min) {
    showError(
      input,
      stateOfItem,
      `${capitalizeTheFirstLetter(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      stateOfItem,
      `${capitalizeTheFirstLetter(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input, stateOfItem);
  }
}

export function showResultEmailValidation(input, stateOfItem) {
  if (isEmpty(input)) return;
  const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
  if (regularExpression.test(input.value.trim())) {
    showSuccess(input, stateOfItem);
  } else {
    showError(input, stateOfItem, 'Email is not valid');
  }
}

export function showResultPasswordValidation(input, stateOfItem) {
  if (isEmpty(input)) return;
  const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  // https://genkichi.hateblo.jp/entry/2019/02/23/143527
  if (regularExpression.test(input.value.trim())) {
    showSuccess(input, stateOfItem);
  } else {
    showError(
      input,
      stateOfItem,
      'Min 8 chars, including 1 uppercase and 1 number'
    );
  }
}

export function showResultMatchingPasswords(input, confirmInput, stateOfItem) {
  if (input.value === confirmInput.value) {
    showSuccess(confirmInput, stateOfItem);
  } else {
    showError(confirmInput, stateOfItem, 'Passwords do not match');
  }
}

export function capitalizeTheFirstLetter(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

export function isEveryRequiredItemValid(stateOfItems) {
  return stateOfItems.every(obj => obj.isValid);
}
