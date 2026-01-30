import { test, expect } from '@playwright/test';

const usernameInputXpath =
  '//label[normalize-space(.)="Username"]/following-sibling::input';
const passwordInputXpath =
  '//label[normalize-space(.)="Password"]/following-sibling::input';
const signInButtonXpath =
  '//button[normalize-space(.)="Sign in"]';
const invalidCredsMessageXpath =
  '//*[contains(normalize-space(.), "Invalid username or password")]';
const requiredMessageXpath =
  '//*[contains(normalize-space(.), "Required")]';

const baseUrl = 'https://traineeautomation.azurewebsites.net/';

test.skip('AFBB-1: Open page and verify sign-in form elements are visible (XPath)', async ({ page }) => {
  await page.goto(baseUrl);
  await expect(page).toHaveURL(/traineeautomation\.azurewebsites\.net/i);
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  await expect(page.locator(usernameInputXpath)).toBeVisible();
  await expect(page.locator(passwordInputXpath)).toBeVisible();
  await expect(page.locator(signInButtonXpath)).toBeVisible();
});

test.skip('AFPB-2: Fill all required fields with valid data and verify values are displayed (XPath)', async ({ page }) => {
  await page.goto(baseUrl);
  const username = page.locator(usernameInputXpath);
  const password = page.locator(passwordInputXpath);
  await username.fill('admin');
  await password.fill('123');
  await expect(username).toHaveValue('admin');
  await expect(password).toHaveValue('123');
  await expect(page.locator(signInButtonXpath)).toBeVisible();
});

test.skip('AFPB-3: Form submitted successfully with correctly filled data (XPath)', async ({ page }) => {
  await page.goto(baseUrl);
  const username = page.locator(usernameInputXpath);
  const password = page.locator(passwordInputXpath);
  await username.fill('admin');
  await password.fill('123');
  await expect(username).toHaveValue('admin');
  await expect(password).toHaveValue('123');
  await page.locator(signInButtonXpath).click();
  // Submitted -> should not stay on /Login
  await expect(page).not.toHaveURL(/\/login/i);
  // Sign in heading should be gone if navigated away
  await expect(page.getByRole('heading', { name: /sign in/i })).not.toBeVisible();
});

test.skip('AFPB-4: Submitting form with empty fields does not submit (XPath)', async ({ page }) => {
  await page.goto(baseUrl);
  const username = page.locator(usernameInputXpath);
  const password = page.locator(passwordInputXpath);
  const signInButton = page.locator(signInButtonXpath);
  // Step 1: fields are empty
  await expect(username).toHaveValue('');
  await expect(password).toHaveValue('');
  // Step 2: click Sign in
  await signInButton.click();
  // Post-condition: still on login page (no submit / no redirect)
  await expect(page).toHaveURL(/\/login/i);
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  // Still empty (nothing was "autofilled")
  await expect(username).toHaveValue('');
  await expect(password).toHaveValue('');
  // And NO invalid-credentials message (because we didn't try wrong creds)
  await expect(page.locator(invalidCredsMessageXpath)).toHaveCount(0);
});



test.skip('AFPB-5: Invalid credentials show error message and form is not submitted (XPath)', async ({ page }) => {
  await page.goto(baseUrl);
  const username = page.locator(usernameInputXpath);
  const password = page.locator(passwordInputXpath);
  await username.fill('admin');
  await password.fill('321');
  await page.locator(signInButtonXpath).click();
  // still on login page
  await expect(page).toHaveURL(/\/login/i);
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  // invalid creds message
  await expect(page.locator(invalidCredsMessageXpath).first()).toBeVisible();
});
