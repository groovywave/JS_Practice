debugger;
const url = new URL(window.location.href);
console.log('url', url);
const resetPasswordTokenFromURL = url.searchParams.get('resetPasswordToken');
const resetPasswordTokenFromLocalStorage =
  localStorage.getItem('resetPasswordToken');
console.log('resetPasswordTokenFromURL', resetPasswordTokenFromURL);
console.log(
  'resetPasswordTokenFromLocalStorage',
  resetPasswordTokenFromLocalStorage
);

try {
  if (
    !resetPasswordTokenFromURL ||
    !resetPasswordTokenFromLocalStorage ||
    resetPasswordTokenFromURL !== resetPasswordTokenFromLocalStorage
  ) {
    window.location.href = './not-authorized.html';
  }
} catch {
  window.location.href = '../login-failed.html';
}
