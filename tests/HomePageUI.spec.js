const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {

  // Runs before each test to load the home page
  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/');
    // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  // Test if the home page loads successfully
  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/');
    const homePageTitle = await page.title();
    expect(homePageTitle).toBe('Init - The future of industrial IT and automation starts here');
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


  test('What we do - Button', async ({ page }) => {
    const whatWeDoButton = await page.getByRole('button', { name: 'What we do' });
    await expect(whatWeDoButton).toBeVisible();
    await whatWeDoButton.click();
    await expect(page).toHaveURL('https://initgroup.com/what-we-do/');
  });


  test('News and Events content structure', async ({ page }) => {

    // Locate the table or container that holds the posts
    await page.waitForSelector('.mt-8.w-full.h-auto.grid-cols-4.gap-4', { timeout: 10000 });
    const postsTable = page.locator('.mt-8.w-full.h-auto.grid-cols-4.gap-4');
    await expect(postsTable).toBeVisible();

    // Locate each post inside the table
    const posts = postsTable.locator('.col-span-2.anim');
    const postCount = await posts.count();

    // Ensure there's at least one post
    expect(postCount).toBeGreaterThan(0);

    // Loop through each post and validate the structure
    for (let i = 0; i < postCount; i++) {
      const post = posts.nth(i);

      const image = post.locator('img');
      await expect(image).toBeVisible();
      const imageSrc = await image.getAttribute('src');
      console.log(`Post ${i + 1} - Image source: ${imageSrc}`);

      // Check and retrieve link URL
      const link = post.locator('a[aria-label="Go to the case"]');
      await expect(link).toBeVisible();
      const linkHref = await link.getAttribute('href');
      console.log(`Post ${i + 1} - Link URL: ${linkHref}`);

      // Check and retrieve description text
      const description = post.locator('.font-light.text-pure-black.text-body-lg');
      await expect(description).toBeVisible();
      const descriptionText = await description.textContent();
      console.log(`Post ${i + 1} - Description: ${descriptionText.trim()}`);
    }
  });

  test('Explore open positions - Button', async ({ page }) => {
    // Get the button and ensure it's visible
    const OpenPositionsButton = await page.getByRole('button', { name: 'Explore open positions' });
    await expect(OpenPositionsButton).toBeVisible();

    // Create a promise to handle the new page/tab
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'), // Wait for the new page to open
      OpenPositionsButton.click(), // Click the button
    ]);

    // Wait for the new page to load and check its URL
    await newPage.waitForLoadState('domcontentloaded'); // Wait for the new page to load
    await expect(newPage).toHaveURL('https://initgroup.com/career/');
  });

  test('Featured Cases content structure for second table', async ({ page }) => {
    // Wait for the selector and locate the second container that holds the posts
    await page.waitForSelector('.mt-8.w-full.h-auto.xs\\:hidden.lg\\:grid.grid-cols-4', { timeout: 10000 });

    // Locate the second container with the posts
    const CasesTable = page.locator('.mt-8.w-full.h-auto.xs\\:hidden.lg\\:grid.grid-cols-4').nth(1); // Changed to nth(1) for second table

    // Ensure that the specific element is visible
    await expect(CasesTable).toBeVisible();

    // Locate each post inside the second table
    const posts = CasesTable.locator('.anim'); // Use a broader selector for debugging
    const postCount = await posts.count();

    // Log the post count
    console.log(`Post count in second table: ${postCount}`);

    // Ensure there's at least one post
    expect(postCount).toBeGreaterThan(0);

    // Loop through each post and validate the structure
    for (let i = 0; i < postCount; i++) {
      const post = posts.nth(i);

      const image = post.locator('img');
      await expect(image).toBeVisible();
      const imageSrc = await image.getAttribute('src');
      console.log(`Post ${i + 1} in second table - Image source: ${imageSrc}`);

      // Check and retrieve link URL
      const link = post.locator('a[aria-label="Go to the case"]').first(); // Ensure single element selection
      await expect(link).toBeVisible();
      const linkHref = await link.getAttribute('href');
      console.log(`Post ${i + 1} in second table - Link URL: ${linkHref}`);

      // Check and retrieve description text
      const description = post.locator('.font-light.text-pure-black.text-body-lg').first(); // Ensure single element selection
      await expect(description).toBeVisible();
      const descriptionText = await description.textContent();
      console.log(`Post ${i + 1} in second table - Description: ${descriptionText.trim()}`);
    }
  });


});