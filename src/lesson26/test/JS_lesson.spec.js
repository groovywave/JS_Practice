import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/lesson25/index.html');
});

test.describe('tab-key navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').press('Tab');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Password', { exact: true }).press('Tab');
    await page.getByLabel('Confirm Password').press('Tab');
  });

  test('press tab-key and focus on 利用規約', async ({ page }) => {
    await expect(page.getByRole('link', { name: '利用規約' })).toBeFocused();
  });

  test('press Enter on the link and open the modal', async ({ page }) => {
    await page.getByRole('link', { name: '利用規約' }).press('Enter');
    await expect(page.getByTestId('js-modalBody')).toBeVisible();
  });
});

test.describe('form validation', () => {
  test('input less than 3 characters into username and show error message', async ({
    page
  }) => {
    await page.getByLabel('Username').fill('e');
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
    await expect(
      page.getByTestId('js-confirmPasswordError', {
        name: 'Passwords do not match'
      })
    ).toBeVisible();
  });

  test('Show a completion message after the form is successfully submitted', async ({
    page
  }) => {
    await page.getByRole('link', { name: '利用規約' }).press('Enter');
    await page.getByTestId('js-lastSentence').scrollIntoViewIfNeeded();
    await page.getByTestId('js-lastSentence').press('ArrowDown');
    await page.getByTestId('js-closeButton').click();
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
});
