import { test, expect } from '@playwright/test';

test('AFBB-1: Open Add User page and verify form elements are visible', async ({ page }) => {
  // Step: follow the link
  await page.goto('https://traineeautomation.azurewebsites.net/');
  // Expected: page opens (login/add user entry page)
  await expect(page).toHaveURL(/traineeautomation\.azurewebsites\.net/i);
  // Header is visible
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  // Fields are visible
  await expect(page.getByLabel(/username/i)).toBeVisible();
  await expect(page.getByLabel(/password/i)).toBeVisible();
  // Sign in button is visible
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  await page.waitForTimeout(5000);
});

test('AFPB-2: Fill all required fields with valid data (Sign in form)', async ({ page }) => {
  // Step 1: Follow the link
  await page.goto('https://traineeautomation.azurewebsites.net/');
  // Step 2: Fill all required fields with valid values (from test case)
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('123');
  // Step 3: Ensure that the values are displayed in the fields
  await expect(page.getByLabel('Username')).toHaveValue('admin');
  await expect(page.getByLabel('Password')).toHaveValue('123');
  // (Optional) extra UI check from the page: Sign in button is visible/enabled
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  await page.waitForTimeout(5000);
});


test('AFPB-3: Form submitted successfully with correctly filled in data (Sign in form)', async ({ page }) => {
  // Step 1: Open page
  await page.goto('https://traineeautomation.azurewebsites.net/');
  // Step 2: Fill required fields with valid data
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('123');
  // (Optional) verify values are in inputs before submit
  await expect(page.getByLabel('Username')).toHaveValue('admin');
  await expect(page.getByLabel('Password')).toHaveValue('123');
  // Step 3: Click on Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();
  // Expected: the form is submitted (we are not on Login anymore)
  await expect(page).not.toHaveURL(/\/login/i);
  // Extra: "Sign in" header should not be visible anymore
  await expect(page.getByRole('heading', { name: 'Sign in' })).not.toBeVisible();
  await page.waitForTimeout(5000);
});



test('AFPB-4: Submitting sign-in form with empty fields shows validation errors and does not submit', async ({ page }) => {
  await page.goto('https://traineeautomation.azurewebsites.net/');
  // Step 1: Leave the form with empty fields
  await expect(page.getByLabel('Username')).toHaveValue('');
  await expect(page.getByLabel('Password')).toHaveValue('');
  // Step 2: Click Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();
  // Post-condition: Submission does not occur -> still on login page
  await expect(page).toHaveURL(/\/login/i);
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  // Expected: Required fields display validation errors ("Required")
  // (Flexible check - looks for "required" anywhere on the page)
  await expect(page.getByText(/required/i).first()).toBeVisible();
  await page.waitForTimeout(5000);
});


test.only('AFPB-5: Invalid credentials -> error message "Invalid username or password" is displayed', async ({ page }) => {
  await page.goto('https://traineeautomation.azurewebsites.net/');
  // Step 1: Fill required fields with invalid data (from test case)
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('321');
  // Step 2: Click Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();
  // Post-condition: form is not sent -> still on Login page
  await expect(page).toHaveURL(/\/login/i);
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  // Expected: error message is displayed
  await expect(page.getByText('Invalid username or password')).toBeVisible();
  await page.waitForTimeout(5000);
});
