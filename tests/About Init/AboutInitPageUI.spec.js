const { test, expect } = require('@playwright/test');

test.describe('About Init page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/about-init/');
    // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/about-init/');
    const aboutInitPageTitle = await page.title();
    expect(aboutInitPageTitle).toBe("We're Init together - Init");
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

  test('Read about our vision - button', async ({ page }) => {

    const ourVisionButton = page.getByText('Read about our vision');
    await expect(ourVisionButton).toBeVisible();
    await ourVisionButton.click();
    await expect(page).toHaveURL('https://initgroup.com/our-vision/');
  });

  test('See our locations - button', async ({ page }) => {

    const ourVisionButton = page.getByText('See our locations');
    await expect(ourVisionButton).toBeVisible();
    await ourVisionButton.click();
    await expect(page).toHaveURL('https://initgroup.com/our-locations/');
  });

});