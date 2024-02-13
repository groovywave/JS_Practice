import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/lesson24/index.html');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password', { exact: true }).press('Tab');
  await page.getByLabel('Confirm Password').press('Tab');
});

test('press tab-key and focus on 利用規約', async ({ page }) => {
  // await page.getByRole('checkbox').press('Tab');
  await expect(page.getByRole('link', { name: '利用規約' })).toBeFocused();
});

test('press Enter on the link and open the modal', async ({ page }) => {
  await page.getByRole('link', { name: '利用規約' }).press('Enter');
  await expect(page.getByTestId('js-modalBody')).toBeVisible();
});

test("Click the 'Agree' button to go to the form page", async ({ page }) => {
  await page.getByRole('link', { name: '利用規約' }).press('Enter');
  await page.getByTestId('js-agreeButton').scrollIntoViewIfNeeded();
  // await page.getByTestId('js-agreeButton').press('ArrowDown');
  // await page.getByTestId('js-agreeButton').click();
  await page.getByLabel('利用規約', { exact: true }).press('ArrowDown');
  await expect(page.getByLabel('Username')).toBeVisible();
  await page.getByText('利用規約を読み、同意しました', { exact: true }).click();
  await expect(page.getByTestId('js-modalBody')).toBeHidden();
});

test("Click the 'Submit' button to go to the registration complete page", async ({
  page
}) => {
  await page.getByRole('link', { name: '利用規約' }).press('Enter');
  await page.getByTestId('js-agreeButton').scrollIntoViewIfNeeded();
  await page.getByText('利用規約を読み、同意しました', { exact: true }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(
    page.getByRole('heading', {
      name: 'Your Registration Has Been Completed!'
    })
  ).toBeVisible();
});
