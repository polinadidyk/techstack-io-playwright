import {test} from '@playwright/test';
import { link } from 'node:fs';

test.skip("basic navigation" , async ({page}) => {
   await page.goto("https://about.gitlab.com/");
   await page.waitForTimeout(3000);
   await page.reload(); 
})

test.skip("Interacting with Web Element on Gitlab", async ({page}) => {
    await page.goto("https://gitlab.com/");
    await page.click("#onetrust-accept-btn-handler");
    //await page.locator('#be-navigation-mobile').getByRole('link', {name: 'Get free trial'}).click();
    await page.getByLabel('Navigation')
  .getByRole('link', { name: 'Get free trial' })
  .click();
    await page.waitForTimeout(10000);
    // await page.locator('[data-testid="new-user-first-name-field"]').fill("Polina")
    // await page.locator('[data-testid="new-user-last-name-field"]').fill("Didyk")
    await page.getByTestId("new-user-first-name-field").fill("Polina");
    await page.getByTestId("new-user-last-name-field").fill("Didyk");
    await page.waitForTimeout(5000);

})

test("using Various Locator Methods", async ({page}) => {
    await page.goto("https://gitlab.com/");
    await page.click("#onetrust-accept-btn-handler");
    await page.getByRole('button', { name: 'Main menu' }).click();
})