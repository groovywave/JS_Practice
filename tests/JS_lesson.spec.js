// @ts-check
const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
  const takeScreenshot = async (name) => {
    await page.screenshot({ path: `screenshot/${name}.png` });
  };
  await page.goto(
    "https://stackblitz.com/edit/stackblitz-starters-axeudy?file=README.md"
  );
  await page.goto("https://stackblitz.com/edit/stackblitz-starters-axeudy");
  await page.goto(
    "https://stackblitz.com/edit/stackblitz-starters-axeudy?file=README.md"
  );
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByRole("link", { name: "lesson24" })
    .click();
  await page.locator("div:nth-child(6) > .mosaic-split-line").click();
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByPlaceholder("Enter username")
    .click();
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByPlaceholder("Enter username")
    .click();
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByPlaceholder("Enter username")
    .click();
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByPlaceholder("Enter username")
    .press("Tab");
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByPlaceholder("Enter email")
    .press("Tab");
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByPlaceholder("Enter password", { exact: true })
    .press("Tab");
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByPlaceholder("Enter password again")
    .press("Tab");
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByRole("link", { name: "利用規約" })
    .press("Enter");
  await takeScreenshot("click 利用規約");
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByText("利用規約を読み、同意しました", { exact: true })
    .click();
  await takeScreenshot("click agreeButton");
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByLabel("利用規約を読み、同意しました。")
    .uncheck();
  await takeScreenshot("checkbox unchecked");
  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByLabel("利用規約を読み、同意しました。")
    .check();
  await takeScreenshot("checkbox checked");

  await page
    .frameLocator('iframe[title="Preview page"]')
    .getByRole("button", { name: "Submit" })
    .click();
  await takeScreenshot("click submitButton");
});
