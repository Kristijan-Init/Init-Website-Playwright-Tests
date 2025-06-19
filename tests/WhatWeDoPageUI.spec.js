const { test, expect } = require('@playwright/test');

test.describe('What we do page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/what-we-do/');
        // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/what-we-do/');
    const WWDPageTitle = await page.title();
    expect(WWDPageTitle).toBe('What we do - full-service partner within automation and industrial IT');
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

  test('Automation link - button', async ({ page }) => {

    const automationWWDPage = page.getByText('Automation').nth(2);
    await expect(automationWWDPage).toBeVisible();
    await automationWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/service/automation-solutions/');
  });

  test('Compliance Services - button', async ({ page }) => {

    const complianceServicesWWDPage = page.getByText('Compliance Services').nth(2);
    await expect(complianceServicesWWDPage).toBeVisible();
    await complianceServicesWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/service/compliance-services/');
  });

  test('Digitalisation - button', async ({ page }) => {

    const digitalisationWWDPage = page.getByText('Digitalisation').nth(2);
    await expect(digitalisationWWDPage).toBeVisible();
    await digitalisationWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/service/digitalisation/');
  });

  test('Industrial Engineering - button', async ({ page }) => {

    const industrialEngineeringWWDPage = page.getByText('Industrial Engineering').nth(2);
    await expect(industrialEngineeringWWDPage).toBeVisible();
    await industrialEngineeringWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/service/industrial-engineering/');
  });

  test('IT/OT infrastructure & security - button', async ({ page }) => {

    const itotWWDPage = page.getByText('IT/OT infrastructure & security').nth(2);
    await expect(itotWWDPage).toBeVisible();
    await itotWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/service/it-ot-infrastructure-and-security/');
  });

  test('Aqua & Agriculture - button', async ({ page }) => {

    const aquaAgricultureWWDPage = page.getByText('Aqua & Agriculture').nth(2);
    await expect(aquaAgricultureWWDPage).toBeVisible();
    await aquaAgricultureWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/aqua-agriculture/');
  });

  test('Buildings - button', async ({ page }) => {

    const buildingsWWDPage = page.getByText('Buildings').nth(2);
    await expect(buildingsWWDPage).toBeVisible();
    await buildingsWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/buildings/');
  });

  test('Energy - button', async ({ page }) => {

    const energyWWDPage = page.getByText('Energy').nth(2);
    await expect(energyWWDPage).toBeVisible();
    await energyWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/energy/');
  });

  test('Food & Beverage - button', async ({ page }) => {

    const foodBeverageWWDPage = page.getByText('Food & Beverage').nth(2);
    await expect(foodBeverageWWDPage).toBeVisible();
    await foodBeverageWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/food-beverage/');
  });

  test('Infrastructure - button', async ({ page }) => {

    const infrastructureWWDPage = page.getByText('Infrastructure').nth(5);
    await expect(infrastructureWWDPage).toBeVisible();
    await infrastructureWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/infrastructure/');
  });

  test('Life Science - button', async ({ page }) => {

    const lifeScienceWWDPage = page.getByText('Life Science').nth(2);
    await expect(lifeScienceWWDPage).toBeVisible();
    await lifeScienceWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/life-science/');
  });

  test('Manufacturing - button', async ({ page }) => {

    const manufacturingWWDPage = page.getByText('Manufacturing').nth(2);
    await expect(manufacturingWWDPage).toBeVisible();
    await manufacturingWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/manufacturing/');
  });

  test('Marine & Offshore - button', async ({ page }) => {

    const marineOffshoreWWDPage = page.getByText('Marine & Offshore').nth(2);
    await expect(marineOffshoreWWDPage).toBeVisible();
    await marineOffshoreWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/marine-offshore/');
  });

  test('Utility - button', async ({ page }) => {

    const utilityWWDPage = page.getByText('Utility').nth(2);
    await expect(utilityWWDPage).toBeVisible();
    await utilityWWDPage.click();
    await expect(page).toHaveURL('https://initgroup.com/businessarea/utility/');
  });

  test('Go to Contact Page button - New Tab', async ({ page, context }) => {

    const contactsButtonWWDPage = page.getByRole('button', { name: 'Go to our Contact page' });
    await expect(contactsButtonWWDPage).toBeVisible();
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      contactsButtonWWDPage.click(),
    ]);
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL('https://initgroup.com/contact/');
    await newTab.close();
  });




  test('Featured Cases content structure', async ({ page }) => {
    // Locate the active container that holds the posts
    const activeContainer = page.locator('.filter-page.w-full.grid:not(.filter-page-hidden)');
    await expect(activeContainer).toBeVisible();

    // Locate each post inside the active container
    const posts = activeContainer.locator('.col-span-1.anim, .xs\\:col-span-1');
    const postCount = await posts.count();

    // Ensure there's at least one post
    expect(postCount).toBeGreaterThan(0);

    // Loop through each post and validate the structure
    for (let i = 0; i < postCount; i++) {
      const post = posts.nth(i);

      // Ensure there's only one image within each post, refine the image locator
      const image = post.locator('a > div > img.object-cover').first(); // Use first() to ensure one image is selected
      await image.waitFor({ state: 'visible', timeout: 5000 }); // Ensure the image is visible before checking
      const imageSrc = await image.getAttribute('src');
      console.log(`Post ${i + 1} - Image source: ${imageSrc}`);

      // Validate the category
      const category = post.locator('p.uppercase.font-regular');
      await expect(category).toBeVisible();
      const categoryText = await category.textContent();
      console.log(`Post ${i + 1} - Category: ${categoryText.trim()}`);

      // Validate the title
      const title = post.locator('a > p.font-light');
      await expect(title).toBeVisible();
      const titleText = await title.textContent();
      const titleLink = await title.locator('..').getAttribute('href');
      console.log(`Post ${i + 1} - Title: ${titleText.trim()}`);
      console.log(`Post ${i + 1} - Title Link: ${titleLink}`);

      // Extract the description text (including the link text in the description)
      const descriptionContainer = post.locator('p.font-light.text-pure-black.xs\\:text-body-sm.md\\:text-body-md.xl\\:text-body-lg.mb-2');
      await expect(descriptionContainer).toBeVisible();

      // Get text content of the description, stripping the "See more" link
      const descriptionText = await descriptionContainer.evaluate(el => {
        // Remove the "See more" link from the text
        const link = el.querySelector('a');
        if (link) {
          link.remove();
        }
        return el.textContent.trim();
      });

      console.log(`Post ${i + 1} - Description: ${descriptionText}`);

      // Locate and ensure "See More" link exists and is visible
      const seeMoreLink = post.locator('a[aria-label="Go to the case"]');

      try {
        // Wait for the "See More" link to be visible with a longer timeout
        await seeMoreLink.waitFor({ state: 'visible', timeout: 10000 });
        const seeMoreHref = await seeMoreLink.getAttribute('href');
        console.log(`Post ${i + 1} - See More Link: ${seeMoreHref}`);
      } catch (error) {
        console.log(`Post ${i + 1} - See More Link not visible or not found.`);
      }
    }
  });

});