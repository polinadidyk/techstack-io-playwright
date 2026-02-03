import { expect, type Page } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { CredentialsDTO } from "../dto/CredentialsDTO";

export class LoginSteps {
  constructor(private readonly page: Page) {}

  async openLogin(): Promise<void> {
    const loginPage = new LoginPage(this.page);
    await loginPage.goToLoginPage();
  }

  async loginWith(creds: CredentialsDTO): Promise<void> {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(creds);
  }

  async submitEmpty(): Promise<void> {
    const loginPage = new LoginPage(this.page);
    await loginPage.goToLoginPage();
    await loginPage.signIn();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).not.toHaveURL(/\/Login/i);
  }

  async expectStillOnLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/\/Login/i);
  }

  async expectRequiredErrors(): Promise<void> {
    await expect(this.page.getByText("Username is required.")).toBeVisible();
    await expect(this.page.getByText("Password is required.")).toBeVisible();
  }
}
