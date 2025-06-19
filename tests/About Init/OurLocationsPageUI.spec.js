const { test, expect } = require('@playwright/test');

test.describe('Our Locations page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/our-locations/');
    // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/our-locations/');
    const ourLocationsPageTitle = await page.title();
    expect(ourLocationsPageTitle).toBe('Init offices - find office adresses and local contact information');
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

test('Locations list interacts with map', async ({ page }) => {
  await page.goto('https://initgroup.com/our-locations/'); // Adjust URL if needed

  const locationList = page.locator('#locations-list .location-btn');
  const locationCount = await locationList.count();
  expect(locationCount).toBeGreaterThan(0);

  for (let i = 0; i < locationCount; i++) {
    const location = locationList.nth(i);

    // Get identifying attributes
    const name = await location.getAttribute('data-name');
    const lat = await location.getAttribute('data-lat');
    const lng = await location.getAttribute('data-lng');

    // Click location to trigger map update
    await location.click();

    // Wait for possible map update (depends on implementation)
    const mapContainer = page.locator('#map-container');
    await expect(mapContainer).toBeVisible();

    console.log(`📍 Clicked: ${name} | Expected map center: lat ${lat}, lng ${lng}`);
  }
});

});