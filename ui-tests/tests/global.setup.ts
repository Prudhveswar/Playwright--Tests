import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
  const authFile = 'playwright/.auth/user.json';

  // 1. If on Acer and file exists, skip login to save time
  if (!process.env.CI && fs.existsSync(authFile)) {
    console.log('Local auth state found. Skipping global setup...');
    return;
  }

  // 2. Otherwise (on Dell or first time on Acer), perform login
  const browser = await chromium.launch({ headless: !!process.env.CI });
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com/');
  
  const username = process.env.MY_USERNAME || 'standard_user';
  const password = process.env.MY_PASSWORD || 'secret_sauce';

  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();

  await page.waitForURL(/.*inventory.html/);

  // Ensure directory exists
  if (!fs.existsSync('playwright/.auth')) {
    fs.mkdirSync('playwright/.auth', { recursive: true });
  }

  await page.context().storageState({ path: authFile });
  await browser.close();
}

export default globalSetup;