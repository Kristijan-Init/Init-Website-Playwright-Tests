const { test, expect } = require('@playwright/test');

test.describe('Compliance Services page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/service/compliance-services/');
        // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/service/compliance-services/');
    const complianceServicesPageTitle = await page.title();
    expect(complianceServicesPageTitle).toBe('System compliance and validation services and consultancy - Init');
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

  test('Aqua & Agriculture - button', async ({ page }) => {

    const AquaAgricultureWWDPage = page.getByText('Aqua & Agriculture').nth(2);
    await expect(AquaAgricultureWWDPage).toBeVisible();
    await AquaAgricultureWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/aqua-agriculture/');
  });

  test('Buildings - button', async ({ page }) => {

    const BuildingsWWDPage = page.getByText('Buildings').nth(2);
    await expect(BuildingsWWDPage).toBeVisible();
    await BuildingsWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/buildings/');
  });

  test('Energy - button', async ({ page }) => {

    const EnergyWWDPage = page.getByText('Energy').nth(2);
    await expect(EnergyWWDPage).toBeVisible();
    await EnergyWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/energy/');
  });

  test('Food & Beverage - button', async ({ page }) => {

    const FoodBeverageWWDPage = page.getByText('Food & Beverage').nth(2);
    await expect(FoodBeverageWWDPage).toBeVisible();
    await FoodBeverageWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/food-beverage/');
  });

  test('Infrastructure - button', async ({ page }) => {

    const InfrastructureWWDPage = page.getByText('Infrastructure').nth(4);
    await expect(InfrastructureWWDPage).toBeVisible();
    await InfrastructureWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/infrastructure/');
  });

  test('Life Science - button', async ({ page }) => {

    const LifeScienceWWDPage = page.getByText('Life Science').nth(2);
    await expect(LifeScienceWWDPage).toBeVisible();
    await LifeScienceWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/life-science/');
  });

  test('Manufacturing - button', async ({ page }) => {

    const ManufacturingWWDPage = page.getByText('Manufacturing').nth(2);
    await expect(ManufacturingWWDPage).toBeVisible();
    await ManufacturingWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/manufacturing/');
  });

  test('Marine & Offshore - button', async ({ page }) => {

    const MarineOffshoreWWDPage = page.getByText('Marine & Offshore').nth(2);
    await expect(MarineOffshoreWWDPage).toBeVisible();
    await MarineOffshoreWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/marine-offshore/');
  });

  test('Utility - button', async ({ page }) => {

    const UtilityWWDPage = page.getByText('Utility').nth(2);
    await expect(UtilityWWDPage).toBeVisible();
    await UtilityWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/utility/');
  });

});