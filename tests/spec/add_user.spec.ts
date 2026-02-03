import { test } from "@playwright/test";
import { LoginSteps } from "../steps/LoginSteps";
import { CredentialsDTO } from "../dto/CredentialsDTO";

test("goToPageTest", async ({ page }) => {
  await page.goto('https://traineeautomation.azurewebsites.net/Login?returnUrl=%2F'); // переход на страницу БЕЗ ЗАПОЛНЕНИЯ ПОЛЕЙ 
});

test("fillWithValidDataTest", async ({ page }) => {
  const login = new LoginSteps(page);

  await login.openLogin();
  await login.loginWith(new CredentialsDTO("admin", "123"));
  await login.expectLoggedIn();
});
  

test("SendWithoutDataTest", async ({ page }) => {
  const login = new LoginSteps(page);

  await login.submitEmpty();
  await login.expectRequiredErrors();
});

test("SendWithInvalidDataTest", async ({ page }) => {
  const login = new LoginSteps(page);

  await login.openLogin();
  await login.loginWith(new CredentialsDTO("kjgh", "321"));
  await login.expectStillOnLogin();
});

