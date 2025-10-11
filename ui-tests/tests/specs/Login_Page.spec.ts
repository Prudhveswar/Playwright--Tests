import { test, expect } from '@playwright/test';

test('Login page - can sign in and see inventory', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Fill credentials and submit
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Assert inventory list is visible after login
  const inventory = page.locator('.inventory_list');
  await expect(inventory).toBeVisible();
});
