const url = new URL(window.location.href);
const resetPasswordTokenFromURL = url.searchParams.get('resetPasswordToken');
const resetPasswordTokenFromLocalStorage =
  localStorage.getItem('resetPasswordToken');

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
