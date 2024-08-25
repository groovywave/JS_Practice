import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'lesson28' }).click();
  await page.getByTestId('test-loginPageButton').click();
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await page.getByTestId('test-emailForResetPassword').click();
  await page
    .getByTestId('test-emailForResetPassword')
    .fill('hasegawa@example.net');
  await page.getByTestId('test-buttonForResetPassword').click();
  await page.getByPlaceholder('Enter password', { exact: true }).click();
});
test('Input password and confirmPassword correctly and then to be visible the submit button', async ({
  page,
}) => {
  await page
    .getByPlaceholder('Enter password', { exact: true })
    .fill('111111Aa');
  await page.getByPlaceholder('Enter password again').click();
  await page.getByPlaceholder('Enter password again').fill('111111Aa');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
});
test('Input password less than 8 letters and show an error message', async ({
  page,
}) => {
  await page
    .getByPlaceholder('Enter password', { exact: true })
    .fill('12345Aa');
  await expect(page.getByTestId('test-passwordError')).toBeVisible();
});
test('Input password without without uppercase and show an error message', async ({
  page,
}) => {
  await page
    .getByPlaceholder('Enter password', { exact: true })
    .fill('123456aa');
  await expect(page.getByTestId('test-passwordError')).toBeVisible();
});
test('Input password without lowercase and show an error message', async ({
  page,
}) => {
  await page
    .getByPlaceholder('Enter password', { exact: true })
    .fill('123456AA');
  await expect(page.getByTestId('test-passwordError')).toBeVisible();
});
test('Input password without alphabets and show an error message', async ({
  page,
}) => {
  await page
    .getByPlaceholder('Enter password', { exact: true })
    .fill('12345678');
  await expect(page.getByTestId('test-passwordError')).toBeVisible();
});
test('Input password without numbers and show an error message', async ({
  page,
}) => {
  await page
    .getByPlaceholder('Enter password', { exact: true })
    .fill('abcdefgH');
  await expect(page.getByTestId('test-passwordError')).toBeVisible();
});
