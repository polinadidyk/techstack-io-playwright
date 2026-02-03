import { type Page, type Locator } from '@playwright/test';
import { CredentialsDTO } from "../dto/CredentialsDTO";

export class LoginPage {
  private readonly page: Page;
  private readonly usernameTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameTextbox = page.getByTestId('username-field').getByTestId('input');
    this.passwordTextbox = page.getByTestId('password-field').getByTestId('input');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  async goToLoginPage(): Promise<void> {
    await this.page.goto('https://traineeautomation.azurewebsites.net/Login?returnUrl=%2F');
  }


  async login(creds: CredentialsDTO): Promise<void> {
  await this.usernameTextbox.fill(creds.username);
  await this.passwordTextbox.fill(creds.password);
  await this.signInButton.click();
}

async signIn(){
   await this.signInButton.click()
}
}