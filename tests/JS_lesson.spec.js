import { test, expect } from "@playwright/test";

test("press tab-key and focus on 利用規約", async ({ page }) => {
  const takeScreenshot = async (name) => {
    await page.screenshot({ path: `screenshot/${name}.png` });
  };

  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  await page.getByPlaceholder("Enter username").click();
  await page.getByPlaceholder("Enter username").press("Tab");
  await page.getByPlaceholder("Enter email").press("Tab");
  await page.getByPlaceholder("Enter password", { exact: true }).press("Tab");
  await page.getByPlaceholder("Enter password again").press("Tab");
  takeScreenshot("focus on 利用規約");
  await expect(page.getByRole("link", { name: "利用規約" })).toBeFocused();
});

test("transition to rule page", async ({ page }) => {
  const takeScreenshot = async (name) => {
    await page.screenshot({ path: `screenshot/${name}.png` });
  };

  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  await page.getByPlaceholder("Enter username").click();
  await page.getByPlaceholder("Enter username").press("Tab");
  await page.getByPlaceholder("Enter email").press("Tab");
  await page.getByPlaceholder("Enter password", { exact: true }).press("Tab");
  await page.getByPlaceholder("Enter password again").press("Tab");
  await expect(page.getByRole("link", { name: "利用規約" })).toBeFocused();
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  await takeScreenshot("click ruleButton");
});

test("transition to form page", async ({ page }) => {
  const takeScreenshot = async (name) => {
    await page.screenshot({ path: `screenshot/${name}.png` });
  };

  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  await page.getByPlaceholder("Enter username").click();
  await page.getByPlaceholder("Enter username").press("Tab");
  await page.getByPlaceholder("Enter email").press("Tab");
  await page.getByPlaceholder("Enter password", { exact: true }).press("Tab");
  await page.getByPlaceholder("Enter password again").press("Tab");
  await expect(page.getByRole("link", { name: "利用規約" })).toBeFocused();
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  await takeScreenshot("press Enter on ruleButton");
  await page.getByTestId("js-agreeButton").scrollIntoViewIfNeeded();
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByText("利用規約を読み、同意しました", { exact: true }).click();
  await takeScreenshot("click agreeButton");
});

test("transition to registration page", async ({ page }) => {
  const takeScreenshot = async (name) => {
    await page.screenshot({ path: `screenshot/${name}.png` });
  };

  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  await page.getByPlaceholder("Enter username").click();
  await page.getByPlaceholder("Enter username").press("Tab");
  await page.getByPlaceholder("Enter email").press("Tab");
  await page.getByPlaceholder("Enter password", { exact: true }).press("Tab");
  await page.getByPlaceholder("Enter password again").press("Tab");
  await expect(page.getByRole("link", { name: "利用規約" })).toBeFocused();
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  await takeScreenshot("press Enter on ruleButton");
  await page.getByTestId("js-agreeButton").scrollIntoViewIfNeeded();
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByText("利用規約を読み、同意しました", { exact: true }).click();
  await takeScreenshot("click agreeButton");
  await page.getByRole("button", { name: "Submit" }).click();
  await takeScreenshot("click submitButton");
});
