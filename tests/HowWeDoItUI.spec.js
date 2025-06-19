const { test, expect } = require('@playwright/test');

test.describe('How we do it page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/how-we-do-it/');
    // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/how-we-do-it/');
    const WWDPageTitle = await page.title();
    expect(WWDPageTitle).toBe('How we do it - Our way is people first');
  });

  test('UI elements', async ({ page }) => {

    const header = page.locator('#header-nav');
    await expect(header, 'Header navigation should be visible').toBeVisible();

    const navbar = page.locator('#menu-primary-menu');
    await expect(navbar, 'Main navigation bar should be visible').toBeVisible();

    const homeButton = page.locator('#site-logo');
    await expect(homeButton, 'Homepage button should be visible').toBeVisible();

    const boundingBox = await homeButton.boundingBox();
    expect(boundingBox.y).toBeLessThan(26, 'Homepage button should be near the top of the page');

    const footer = page.locator('#footer');
    await expect(footer, 'Footer should be visible').toBeVisible();
  });


});