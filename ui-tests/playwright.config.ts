import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
    retries: 0,
    workers: 1,
   reporter: 'html',
  use: {
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    headless: true, 
  },
  projects: [
    // --- 1. The Setup (Runs First) ---
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
      },
    },

    // --- 2. Desktop Chrome ---
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      
    },

    // --- 3. Desktop Firefox ---
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      
    },

    // --- 4. Mobile Safari (iPhone 13) ---
    {
      name: 'Mobile Safari',
      use: { 
        // This simulates the Viewport, User Agent, and Touch Screen of an iPhone 13
        ...devices['iPhone 13'], 
        storageState: 'playwright/.auth/user.json',
      },
      
    },
  ],
});