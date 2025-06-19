const { test, expect } = require('@playwright/test');

test.describe('Our Vision page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/our-vision/');
    // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/our-vision/');
    const ourVisionPageTitle = await page.title();
    expect(ourVisionPageTitle).toBe('Creating a Nordic champion in industrial IT & automation');
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test('Working at Init - button', async ({ page }) => {

    const workingAtInitButton = page.getByText("Find out what it's like to work at Init");
    await expect(workingAtInitButton).toBeVisible();
    await workingAtInitButton.click();
    await expect(page).toHaveURL('https://initgroup.com/working-at-init/');
  });

  test('What we do - button', async ({ page }) => {

    const whatWeDoButton = page.getByText('Read about what we do');
    await expect(whatWeDoButton).toBeVisible();
    await whatWeDoButton.click();
    await expect(page).toHaveURL('https://initgroup.com/what-we-do/');
  });

  test('Browse our customer cases - button', async ({ page }) => {

    const casesButton = page.getByText('Browse our customer cases');
    await expect(casesButton).toBeVisible();
    await casesButton.click();
    await expect(page).toHaveURL('https://initgroup.com/industrial-it-and-automation-cases/');
  });



});