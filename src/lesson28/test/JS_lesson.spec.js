import { test, expect } from '@playwright/test';

const HEADER_TITLE = 'HOT NEWS';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/lesson28/index.html');
});

test.describe('tab-key navigation', () => {
  test('press tab-key and focus on 利用規約', async ({ page }) => {
    await page.getByRole('button', { name: 'Registration' }).click();
    await page.getByText('Username').click();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('test-email')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('test-password')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('test-confirmPassword')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: '利用規約' })).toBeFocused();
  });

  test('press Enter on the link and open the modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Registration' }).click();
    await page.getByRole('link', { name: '利用規約' }).press('Enter');
    await expect(page.getByTestId('js-modalBody')).toBeVisible();
  });
});

test.describe('form validation', () => {
  test('input less than 3 characters into username and show error message', async ({
    page
  }) => {
    await page.getByRole('button', { name: 'Registration' }).click();
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
    await page.getByRole('button', { name: 'Registration' }).click();
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
    await page.getByRole('button', { name: 'Registration' }).click();
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
    await page.getByRole('button', { name: 'Registration' }).click();
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
    await page.getByRole('button', { name: 'Registration' }).click();
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
    await page.getByRole('button', { name: 'Registration' }).click();
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

test.describe('input for login', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Login Page' }).click();
  });
  test('show login form', async ({ page }) => {
    await expect(page.getByText('Username or Email')).toBeVisible();
  });
  test('input required items and click login button', async ({ page }) => {
    await page.getByTestId('test-usernameOrEmail').fill('Hoeger');
    await page.getByTestId('test-password').fill('HQnmjPKBWkqzjeB');
    await page.getByTestId('test-loginButton').click();
    await expect(
      page.getByRole('heading', {
        name: HEADER_TITLE
      })
    ).toBeVisible();
  });
  test('input unregistered items and click login button', async ({ page }) => {
    await page.getByTestId('test-usernameOrEmail').fill('Hoe');
    await page.getByTestId('test-password').fill('HQeB');
    await page.getByTestId('test-loginButton').click();
    await expect(
      page.getByRole('heading', {
        name: 'Login failed'
      })
    ).toBeVisible();
  });
  test('click link forgot password?', async ({ page }) => {
    await page.getByRole('link', { name: 'Forgot password?' }).click();
    await expect(
      page.getByRole('heading', {
        name: 'Reset Your Password'
      })
    ).toBeVisible();
  });
});

test.describe('behavior of local storage', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
  });
  test('input required items and click login button', async ({ page }) => {
    await page.getByTestId('test-usernameOrEmail').fill('Hoeger');
    await page.getByTestId('test-password').fill('HQnmjPKBWkqzjeB');
    await page.getByTestId('test-loginButton').click();
    await expect(
      page.getByRole('heading', {
        name: HEADER_TITLE
      })
    ).toBeVisible();
  });
  test('login with local storage', async ({ page }) => {
    await page.getByTestId('test-usernameOrEmail').fill('Hoeger');
    await page.getByTestId('test-password').fill('HQnmjPKBWkqzjeB');
    await page.getByTestId('test-loginButton').click();
    await page
      .getByRole('heading', {
        name: HEADER_TITLE
      })
      .waitFor();
    await page.goto('http://localhost:3000/lesson26/index.html');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(
      page.getByRole('heading', {
        name: HEADER_TITLE
      })
    ).toBeVisible();
  });

  test('input the unregistered items and click login button', async ({
    page
  }) => {
    await page.getByTestId('test-usernameOrEmail').fill('Hoeg');
    await page.getByTestId('test-password').fill('HQjeB');
    await page.getByTestId('test-loginButton').click();
    await expect(
      page.getByRole('heading', {
        name: 'Login failed'
      })
    ).toBeVisible();
  });
  test('click the link named forgot password?', async ({ page }) => {
    await page.getByRole('link', { name: 'Forgot password?' }).click();
    await expect(
      page.getByRole('heading', {
        name: 'Reset Your Password'
      })
    ).toBeVisible();
  });
  test('logout and login again', async ({ page }) => {
    await page.getByTestId('test-usernameOrEmail').fill('Hoeger');
    await page.getByTestId('test-password').fill('HQnmjPKBWkqzjeB');
    await page.getByTestId('test-loginButton').click();
    await page.getByTestId('test-logout').click();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(
      page.getByRole('heading', {
        name: 'Login'
      })
    ).toBeVisible();
  });
});

test.describe('Test each function on the reset your password page', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Login Page' }).click();
    await page.getByRole('link', { name: 'Forgot password?' }).click();
    await page.getByTestId('test-emailForResetPassword').click();
  });
  test('Do not activate the button for resetting the password', async ({
    page
  }) => {
    await page.getByTestId('test-emailForResetPassword').fill('aaa@');
    await expect(
      page.getByTestId('test-buttonForResetPassword')
    ).toBeDisabled();
  });
  test('Activate the button for resetting the password', async ({ page }) => {
    await page.getByTestId('test-emailForResetPassword').fill('aaa@gmail.com');
    await expect(page.getByTestId('test-buttonForResetPassword')).toBeEnabled();
  });
  test('Show an error message when an unregistered email address is submitted', async ({
    page
  }) => {
    await page.getByTestId('test-emailForResetPassword').fill('aaa@gmail.com');
    await page.getByTestId('test-buttonForResetPassword').click();
    await expect(
      page.getByTestId('test-emailForResetPasswordError')
    ).toBeVisible();
  });
  test('Go to the password reset page when a registered email address is submitted', async ({
    page
  }) => {
    await page
      .getByTestId('test-emailForResetPassword')
      .fill('Zella_Homenick38@example.net');
    await page.getByTestId('test-buttonForResetPassword').click();
    await expect(
      page.getByRole('heading', {
        name: 'Reset Password'
      })
    ).toBeVisible();
  });
});
