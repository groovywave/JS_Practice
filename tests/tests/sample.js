import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?gws_rd=ssl');
  await page.getByRole('combobox', { name: '検索' }).click();
  await page.getByRole('combobox', { name: '検索' }).fill('');
  await page.getByRole('combobox', { name: '検索' }).press('Enter');
  await page.screenshot({ path:`test.png` });
});