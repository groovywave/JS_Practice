const usernameOrEmail = document.getElementById('js-usernameOrEmail');
const password = document.getElementById('js-password');
const loginButton = document.getElementById('js-loginButton');
const url = 'https://660d2d926ddfa2943b337888.mockapi.io/api/v1/tasks';

loginButton.addEventListener('click', async e => {
  e.preventDefault();
  const queryString = `password=${encodeURIComponent(password.value)}`;
  try {
    const response = await fetch(`${url}?${queryString}`);
    const responseData = await response.json();
    if (!response.ok) {
      console.error(`${response.status}:${response.statusText}`);
    }
    if (!responseData.length) {
      console.log('no data');
    }
    new Promise((resolve, reject) => {
      if (
        responseData[0].password === password.value &&
        (responseData[0].name === usernameOrEmail.value ||
          responseData[0].email === usernameOrEmail.value)
      ) {
        resolve({ token: 'ae2efaa8fd0255cfafda76a7', ok: true, code: 200 });
      } else {
        reject({ ok: false, code: 401 });
      }
    })
      .then(object => {
        localStorage.setItem('token', object.token);
        window.location.href = './contents.html';
      })
      .catch(() => {
        window.location.href = './login-failed.html';
      });
  } catch (error) {
    console.error(error);
  }
});
