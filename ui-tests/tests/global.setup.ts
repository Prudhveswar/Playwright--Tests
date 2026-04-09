import { test as setup, expect } from '@playwright/test';
import fs from 'fs';

const authFile = 'playwright/.auth/user.json';

// Wrapping it in setup() makes it a "Test" that Playwright can find
setup('authenticate', async ({ page }) => {
  
  if (!process.env.CI && fs.existsSync(authFile)) {
    console.log('Local auth state found. Skipping...');
    return;
  }

  await page.goto('https://www.saucedemo.com/');

  const username = process.env.MY_USERNAME || 'standard_user';
  const password = process.env.MY_PASSWORD || 'secret_sauce';

  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();

  await page.waitForURL(/.*inventory.html/);

  if (!fs.existsSync('playwright/.auth')) {
    fs.mkdirSync('playwright/.auth', { recursive: true });
  }

  await page.context().storageState({ path: authFile });
});