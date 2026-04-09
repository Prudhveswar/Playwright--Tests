import { test as setup } from '@playwright/test';

const authFilePath = 'playwright/.auth/user.json';

setup('Authenticate and save storage state', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('https://www.saucedemo.com/');

    // 2. SMART LOGIN LOGIC
    // It checks process.env (Dell) first, falls back to hardcoded strings (Acer)
    const username = process.env.MY_USERNAME || 'standard_user';
    const password = process.env.MY_PASSWORD || 'secret_sauce';

    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();

    // 3. Wait for success
    await page.waitForURL(/.*inventory.html/);

    await page.context().storageState({ path: authFilePath });
});