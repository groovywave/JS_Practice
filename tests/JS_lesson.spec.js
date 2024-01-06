// @ts-check
const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
  const takeScreenshot = async (name) => {
    await page.screenshot({ path: `screenshot/${name}.png` });
  };
  await page.goto("http://127.0.0.1:4173/");
  await page.getByRole("link", { name: "lesson24" }).click();
  await page.getByText("利用規約を読み、同意しました", { exact: true }).click();
  await takeScreenshot("click agreeButton");
  await page.getByRole("button", { name: "Submit" }).click();
  await takeScreenshot("click submitButton");
});
