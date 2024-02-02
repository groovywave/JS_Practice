import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/lesson25/index.html');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password', { exact: true }).press('Tab');
  await page.getByLabel('Confirm Password').press('Tab');
  await page.getByRole('link', { name: '利用規約' }).press('Enter');
  await page.getByTestId('js-agreeButton').scrollIntoViewIfNeeded();
  await page.getByLabel('利用規約', { exact: true }).press('ArrowDown');
  await page.getByText('利用規約を読み、同意しました', { exact: true }).click();
});

test('input less than 3 characters into username and show error message', async ({
  page
}) => {
  await page.getByLabel('Username').fill('e');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(
    page.getByTestId('js-usernameError', {
      name: 'Username must be at least 3 characters'
    })
  ).toBeVisible();
});

test('input more than 15 characters into username and show error message', async ({
  page
}) => {
  await page.getByLabel('Username').fill('01234567890123456789');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(
    page.getByTestId('js-usernameError', {
      name: 'Username must be less than 15 characters'
    })
  ).toBeVisible();
});

test('input invalid mail address into email and show error message', async ({
  page
}) => {
  await page.getByLabel('Email').fill('invalid email');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(
    page.getByTestId('js-emailError', {
      name: 'Email is not valid'
    })
  ).toBeVisible();
});

test('input less than 8 characters into Password and show error message', async ({
  page
}) => {
  await page.getByTestId('js-passwordLabel').fill('abc');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(
    page.getByTestId('js-passwordError', {
      name: 'at least 8 characters that include at least one uppercase letter, one lowercase letter, and one digit'
    })
  ).toBeVisible();
});

test('input wrong password into Confirm Password and show error message', async ({
  page
}) => {
  await page.getByTestId('js-passwordLabel').fill('KevinDeBruyne17');
  await page.getByTestId('js-confirmPasswordLabel').fill('KevinDeBruyne7');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(
    page.getByTestId('js-confirmPasswordError', {
      name: 'Passwords do not match'
    })
  ).toBeVisible();
});

test('Show a completion message after the form is successfully submitted', async ({
  page
}) => {
  await page.getByLabel('Username').fill('Alexander');
  await page.getByLabel('Email').fill('Arnord@liverpool.com');
  await page.getByTestId('js-passwordLabel').fill('KevinDeBruyne17');
  await page.getByTestId('js-confirmPasswordLabel').fill('KevinDeBruyne17');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(
    page.getByRole('heading', {
      name: 'Your Registration Has Been Completed!'
    })
  ).toBeVisible();
});
