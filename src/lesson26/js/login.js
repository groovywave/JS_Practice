Swal.fire({
  position: 'bottom-end',
  toast: true,
  title: 'You can use the following',
  html: 'name:<br>Hoeger<br>email:<br>Zella_Homenick38@example.net<br>password:<br>HQnmjPKBWkqzjeB'
});
const usernameOrEmail = document.getElementById('js-usernameOrEmail');
const password = document.getElementById('js-password');
const loginButton = document.getElementById('js-loginButton');
const url = 'https://660d2d926ddfa2943b337888.mockapi.io/api/v1/tasks';
const queryString = `password=${encodeURIComponent(password.value)}`;

loginButton.addEventListener('click', async e => {
  e.preventDefault();
  try {
    const queryString = `password=${encodeURIComponent(password.value)}`;
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
        responseData[0].name === usernameOrEmail.value ||
        responseData[0].email === usernameOrEmail.value
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
