import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/lesson24/index.html");
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").press("Tab");
  await page.getByLabel("Email").press("Tab");
  await page.getByLabel("Password", { exact: true }).press("Tab");
  await page.getByLabel("Confirm Password").press("Tab");
  await expect(page.getByRole("link", { name: "利用規約" })).toBeFocused();
});

test("press tab-key and focus on 利用規約", async () => {});

test("press Enter on the link to rule-page", async ({ page }) => {
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  // await page.getByTestId("js-modalBody").click();
  await expect(page.getByTestId("js-modalBody")).toBeVisible();
});

test("Click the 'Agree' button to go to the form page", async ({ page }) => {
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  await page.getByTestId("js-agreeButton").scrollIntoViewIfNeeded();
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByText("利用規約を読み、同意しました", { exact: true }).click();
});

test("Click the 'Submit' button to go to the registration complete page", async ({
  page,
}) => {
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  await page.getByTestId("js-agreeButton").scrollIntoViewIfNeeded();
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByText("利用規約を読み、同意しました", { exact: true }).click();
  await page.getByRole("button", { name: "Submit" }).click();
});
