import { test, expect } from "@playwright/test";

test("press tab-key and focus on 利用規約", async ({ page }) => {
  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  await page.getByPlaceholder("Enter username").click();
  await page.getByPlaceholder("Enter username").press("Tab");
  await page.getByPlaceholder("Enter email").press("Tab");
  await page.getByPlaceholder("Enter password", { exact: true }).press("Tab");
  await page.getByPlaceholder("Enter password again").press("Tab");
  await expect(page.getByRole("link", { name: "利用規約" })).toBeFocused();
});

test("press Enter on the link to rule-page", async ({ page }) => {
  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  await page.getByPlaceholder("Enter password again").click();
  await page.getByPlaceholder("Enter password again").press("Tab");
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
});

test("Click the 'Agree' button to go to the form page", async ({ page }) => {
  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  await page.getByPlaceholder("Enter password again").click();
  await page.getByPlaceholder("Enter password again").press("Tab");
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  await page.getByTestId("js-agreeButton").scrollIntoViewIfNeeded();
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByText("利用規約を読み、同意しました", { exact: true }).click();
});

test("Click the 'Submit' button to go to the registration complete page", async ({
  page,
}) => {
  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  await page.getByPlaceholder("Enter password again").click();
  await page.getByPlaceholder("Enter password again").press("Tab");
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  await page.getByTestId("js-agreeButton").scrollIntoViewIfNeeded();
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByText("利用規約を読み、同意しました", { exact: true }).click();
  await page.getByRole("button", { name: "Submit" }).click();
});
