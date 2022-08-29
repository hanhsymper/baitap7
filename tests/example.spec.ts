import { test, expect } from '@playwright/test';

test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('https://shop-test-abc.onshopbase.com');
  await page.waitForNavigation();
  // await expect(await page.screenshot({fullPage:true})).toMatchSnapshot("hanh_test.png")


});
