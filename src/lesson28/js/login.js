import * as validation from './modules/validation.js';

const url = 'https://mocki.io/v1/3b2e42e1-a5bc-4523-8505-8e58e7c6d28d';
const usernameOrEmail = document.getElementById('js-usernameOrEmail');
const password = document.getElementById('js-password');
const loginButton = document.getElementById('js-loginButton');

if (localStorage.getItem('token')) window.location.href = './contents.html';

function isEmptyThenShowError() {
  validation.removeErrorMessages([usernameOrEmail, password]);
  validation.removeErrorColor([usernameOrEmail, password]);
  if (usernameOrEmail.value === '') {
    validation.showError(usernameOrEmail, 'No data');
    return true;
  }
  if (password.value === '') {
    validation.showError(password, 'No data');
    return true;
  }
}

function findUser(userData) {
  const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // https://stackoverflow.com/questions/65801147/validate-email-pattern-with-regex
  let isName = true;
  if (regularExpression.test(usernameOrEmail.value.trim())) isName = false;
  const user = userData.find(obj => {
    return (
      obj.password === password.value &&
      (isName
        ? obj.name === usernameOrEmail.value
        : obj.email === usernameOrEmail.value)
    );
  });
  return user;
}

const usersHandler = (userData, matchedUserData) => {
  if (userData.length === 0)
    return {
      ok: true,
      code: 200,
      message: 'empty',
      token: null,
    };
  if (matchedUserData)
    return {
      ok: true,
      code: 200,
      message: 'Success',
      token: matchedUserData.id,
    };
  return {
    ok: false,
    code: 401,
    message: 'Not found',
    token: null,
  };
};

const submit = async e => {
  e.preventDefault();
  try {
    if (isEmptyThenShowError()) return;
    const response = await fetch(url);
    if (!response.ok) {
      window.location.href = './login-failed.html';
      return;
    }
    const userData = await response.json();
    const matchedUserData = findUser(userData);
    const userDataState = usersHandler(userData, matchedUserData);
    if (!userDataState.token) {
      window.alert(userDataState.message);
      window.location.href = './login-failed.html';
      return;
    }
    localStorage.setItem('token', matchedUserData.userId);
    window.location.href = './contents.html';
  } catch (error) {
    console.error(error);
    window.location.href = './login-failed.html';
  }
};

loginButton.addEventListener('click', submit);
