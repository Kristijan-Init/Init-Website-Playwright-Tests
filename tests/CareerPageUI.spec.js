const { test, expect } = require('@playwright/test');

test.describe('Career page', () => {

  // Runs before each test to load the home page
  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/career/');
        // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  // Test if the home page loads successfully
  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/career/');
    const careerPageTitle = await page.title();
    expect(careerPageTitle).toBe('IT and automation careers at Init | Come join us!');
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


test('Jobs in Denmark - Link', async ({ page }) => {
  const denmarkJobsLink = await page.getByRole('link', { name: 'See available jobs in Denmark' });
  await expect(denmarkJobsLink).toBeVisible();
  await denmarkJobsLink.click();
  await expect(page).toHaveURL('https://init.career.emply.com/home');
});

test('Internships in Denmark - Link', async ({ page }) => {
  const denmarkInternshipsLink = await page.getByRole('link', { name: 'See available internships in Denmark' });
  await expect(denmarkInternshipsLink).toBeVisible();
  await denmarkInternshipsLink.click();
  await expect(page).toHaveURL('https://init.career.emply.com/earlycareer');
});

test('Jobs in Norway - Link', async ({ page }) => {
  const norwayJobsLink = await page.getByRole('link', { name: 'See available jobs in Norway' });
  await expect(norwayJobsLink).toBeVisible();
  await norwayJobsLink.click();
  await expect(page).toHaveURL('https://nebb.hire.trakstar.com/?country=Norway');
});

test('Jobs in Sweden - Link', async ({ page }) => {
  const swedenJobsLink = await page.getByRole('link', { name: 'See available jobs in Sweden' });
  await expect(swedenJobsLink).toBeVisible();
  await swedenJobsLink.click();
  await expect(page).toHaveURL('https://jobb-karriar.initsweden.com/');
});

test('Jobs in North Macedonia - Link', async ({ page }) => {
  // Get the link and ensure it's visible
  const macedoniaJobsLink = await page.getByRole('link', { name: 'See available jobs in North Macedonia' });
  await expect(macedoniaJobsLink).toBeVisible();
  // Handle the new tab popup
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),      // Wait for the new tab
    macedoniaJobsLink.click(),       // Trigger the click that opens it
  ]);
  // Wait for the new page to finish loading
  await newPage.waitForLoadState('domcontentloaded');
  // Verify the URL of the new tab
  await expect(newPage).toHaveURL('https://nebb.hire.trakstar.com/?country=North+Macedonia');
});

test('Find out what is Init for you - Button', async ({ page }) => {
  const workingAtInitButton = await page.getByRole('button', { name: "Find out what's Init for you" });
  await expect(workingAtInitButton).toBeVisible();
  await workingAtInitButton.click();
  await expect(page).toHaveURL('https://initgroup.com/working-at-init/');
});


});