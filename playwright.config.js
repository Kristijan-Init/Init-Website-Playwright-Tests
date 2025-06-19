// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Limit to 1 worker in CI for stability, unlimited locally */
  workers: process.env.CI ? 1 : undefined,

  /* Set a global timeout for each test (30 seconds) */
  timeout: 30 * 1000, // 30 seconds per test

  /* Reporter to use */
  reporter: 'html',

  /* Shared settings for all the projects */
  use: {
    // baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',

    // Optional: set per-action timeout (useful for slow CI environments)
    actionTimeout: 10 * 1000, // 10s per action like click, fill, etc.
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Optional: start a web server before tests (if needed) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
