import { test as setup } from '@playwright/test';

const authFilePath = 'playwright/.auth/user.json';

setup('Authenticate and save storage state', async ({ page }) => {
  console.log('Running setup to authenticate and save storage state...');
  
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  //2.Wait indefinitely for the user to complete the login process
  await page.waitForURL(/.*inventory.html*/, { timeout: 0 });

  //3.Saving the authentication state to a file
  await page.context().storageState({ path: authFilePath });
  console.log(`Authentication state saved to ${authFilePath}`);
});