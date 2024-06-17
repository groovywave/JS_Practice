export function showError(item, errorMessage) {
  item.classList.remove('border-gray-200');
  item.classList.remove('border-successColor');
  item.classList.add('border-errorColor');
  const parentElement = item.parentElement;
  const small = parentElement.querySelector('small');
  small.innerText = errorMessage;
  small.classList.remove('invisible');
}

export function showSuccess(item) {
  item.classList.remove('border-gray-200');
  item.classList.remove('border-errorColor');
  item.classList.add('border-successColor');
  const parentElement = item.parentElement;
  const small = parentElement.querySelector('small');
  small.classList.add('invisible');
}

export function isEmpty(input, stateOfItem) {
  if (input.trim() === '') {
    stateOfItem.errorMessage = `${capitalizeTheFirstLetter(stateOfItem.name)} is required`;
    stateOfItem.isEmpty = true;
    return true;
  } else {
    stateOfItem.isEmpty = false;
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

export function isValidUsername(input, stateOfItem, min, max) {
  if (isEmpty(input, stateOfItem)) return false;
  if (input.length < min) {
    stateOfItem.errorMessage = `Username must be at least ${min} characters`;
    return false;
  }
  if (input.length > max) {
    stateOfItem.errorMessage = `Username must be less than ${max} characters`;
    return false;
  }
  return true;
}

export function isValidEmail(input, stateOfItem) {
  if (isEmpty(input, stateOfItem)) return false;
  const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
  if (!regularExpression.test(input.trim())) {
    stateOfItem.errorMessage = 'Email is not valid';
    return false;
  }
  return true;
}

export function isValidPassword(input, stateOfItem) {
  const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  // https://genkichi.hateblo.jp/entry/2019/02/23/143527
  if (regularExpression.test(input.trim())) {
    return true;
  } else {
    stateOfItem.errorMessage =
      'Min 8 chars, including 1 uppercase and 1 number';
    return false;
  }
}

export function isMatchingPasswords(input, confirmInput, stateOfItem) {
  if (input === confirmInput) {
    return true;
  } else {
    stateOfItem.errorMessage = 'Passwords do not match';
    return false;
  }
}

export function capitalizeTheFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isSomeRequiredItemEmpty(stateOfItems) {
  return stateOfItems.some(obj => obj.isEmpty);
}

export function isEveryRequiredItemValid(stateOfItems) {
  return stateOfItems.every(obj => obj.isValid);
}
