// @ts-check

import { test, expect } from "@playwright/test";

test("focus on the link ", async ({ page }) => {
  const takeScreenshot = async (name) => {
    await page.screenshot({ path: `screenshot/${name}.png` });
  };

  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  const locator = page.locator("#js-linkToRule");
  await locator.focus();
  await takeScreenshot("focus on the link ");
});

test("focus on the link and press Enter", async ({ page }) => {
  const takeScreenshot = async (name) => {
    await page.screenshot({ path: `screenshot/${name}.png` });
  };

  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  const locator = page.locator("#js-linkToRule");
  await locator.focus();
  await locator.press("Enter");
  await takeScreenshot("focus on the link and press enter");
});

test("focus on the link and click the link", async ({ page }) => {
  const takeScreenshot = async (name) => {
    await page.screenshot({ path: `screenshot/${name}.png` });
  };

  await page.goto("localhost:3000/");
  await page.getByRole("link", { name: "lesson24" }).click();
  const locator = page.locator("#js-linkToRule");
  await locator.focus();
  await locator.click();
  await takeScreenshot("focus on the link and click the link");
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
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  await takeScreenshot("click ruleButton");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
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
  await page.getByRole("link", { name: "利用規約" }).press("Enter");
  await takeScreenshot("click ruleButton");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByLabel("利用規約", { exact: true }).press("ArrowDown");
  await page.getByText("利用規約を読み、同意しました", { exact: true }).click();
  await takeScreenshot("click agreeButton");
  await page.getByRole("button", { name: "Submit" }).click();
  await takeScreenshot("click submitButton");
});
