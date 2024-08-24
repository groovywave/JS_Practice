import { test, expect } from '@playwright/test';

test('If submit the registered email, Navigate to password.html.', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'lesson28' }).click();
  await page.getByTestId('test-loginPageButton').click();
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await page.getByTestId('test-emailForResetPassword').click();
  await page
    .getByTestId('test-emailForResetPassword')
    .fill('hasegawa@example.net');
  await page.getByTestId('test-buttonForResetPassword').click();
  await expect(
    page.getByRole('heading', {
      name: 'Reset Password',
    })
  ).toBeVisible();
});
test('Set same resetPasswordToken in localStorage and URL, navigate to password.html.', async ({
  page,
}) => {
  const resetPasswordToken = '482r22';
  await page.addInitScript(token => {
    localStorage.setItem('resetPasswordToken', token);
  }, resetPasswordToken);
  await page.goto(
    `http://localhost:3000/lesson28/register/password.html?resetPasswordToken=${resetPasswordToken}`
  );
  await expect(
    page.getByRole('heading', {
      name: 'Reset Password',
    })
  ).toBeVisible();
});

test('The token in localStorage does not match the one in the URL, navigate to not-authorized.html.', async ({
  page,
}) => {
  const resetPasswordToken = '482r22fafah';
  await page.addInitScript(token => {
    localStorage.setItem('resetPasswordToken', token);
  }, resetPasswordToken);
  await page.goto(
    `http://localhost:3000/lesson28/register/password.html?resetPasswordToken=doesNotMatch${resetPasswordToken}`
  );
  await expect(
    page.getByRole('heading', {
      name: 'You do not have permission to access the page.',
    })
  ).toBeVisible();
});
test('The token in localStorage is null, navigate to not-authorized.html.', async ({
  page,
}) => {
  const resetPasswordToken = '482r22fafah';
  await page.addInitScript(token => {
    localStorage.setItem('resetPasswordToken', token);
  }, null);
  await page.goto(
    `http://localhost:3000/lesson28/register/password.html?resetPasswordToken=${resetPasswordToken}`
  );
  expect(page.url()).toBe(
    `http://localhost:3000/lesson28/register/not-authorized.html`
  );
});
test('The token in URL is null, navigate to not-authorized.html.', async ({
  page,
}) => {
  const resetPasswordToken = '482r22fafah';
  await page.addInitScript(token => {
    localStorage.setItem('resetPasswordToken', token);
  }, resetPasswordToken);
  await page.goto(
    `http://localhost:3000/lesson28/register/password.html?resetPasswordToken=`
  );
  expect(page.url()).toBe(
    `http://localhost:3000/lesson28/register/not-authorized.html`
  );
});
