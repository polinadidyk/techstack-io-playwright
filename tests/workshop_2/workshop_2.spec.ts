import {test, expect} from '@playwright/test';

test.skip("Automating form submissions", async ({page}) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    const newTodo = await page.getByPlaceholder("What needs to be done?")
    await newTodo.fill("Learn Playwright");
    await newTodo.press("Enter");
    await newTodo.fill("Become a superwoman");
    await newTodo.press("Enter");
    await page.waitForTimeout(5000);

    const firstTodo = page.getByTestId("todo-item").nth(0);
    await firstTodo.getByRole("checkbox").check();
    await page.waitForTimeout(5000);

    const secondTodo = page.getByTestId("todo-item").nth(1);
    await expect(secondTodo).not.toHaveClass("completed")
    await expect(firstTodo).toHaveClass("completed");
});

test.only("Handling form", async ({page}) => {
await page.goto("https://demo.playwright.dev/todomvc");
const placeholder = "[placeholder='What needs to be done?']";
await page.fill(placeholder, "Learn Playwright");
await page.press(placeholder, "Enter");

const checkbox = await page.locator(".toggle");
await checkbox.check();
})