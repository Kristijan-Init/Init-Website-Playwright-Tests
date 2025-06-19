const { test, expect } = require('@playwright/test');

test.describe('Infrastructure page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/businessarea/infrastructure/');
        // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/businessarea/infrastructure/');
    const infrastructurePageTitle = await page.title();
    expect(infrastructurePageTitle).toBe('Tailored IT and automation services for smarter Infrastructure - Init');
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


  test('Featured Cases content structure', async ({ page }) => {

    // Locate the container that holds the posts
    await page.waitForSelector('.mt-8.w-full.h-auto.xs\\:hidden.lg\\:grid.grid-cols-3.gap-4', { timeout: 10000 });
    const postsTable = page.locator('.mt-8.w-full.h-auto.xs\\:hidden.lg\\:grid.grid-cols-3.gap-4');
    await expect(postsTable).toBeVisible();
  
    // Locate each post inside the container
    const posts = postsTable.locator('.anim');
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
  
      // Check and retrieve the main link (ignoring the "See more" link)
      const mainLink = post.locator('a[aria-label="Go to the case"]:not(.text-green)'); // Ensure we're not selecting the "See more" link
      await expect(mainLink).toBeVisible();
      const linkHref = await mainLink.getAttribute('href');
      console.log(`Post ${i + 1} - Link URL: ${linkHref}`);
  
      // Check and retrieve the title text
      const title = post.locator('.font-light.text-pure-black.text-case-list-title');
      await expect(title).toBeVisible();
      const titleText = await title.textContent();
      console.log(`Post ${i + 1} - Title: ${titleText.trim()}`);
  
      // Check and retrieve description text
      const description = post.locator('.font-light.text-pure-black.text-body-lg');
      await expect(description).toBeVisible();
      const descriptionText = await description.textContent();
      console.log(`Post ${i + 1} - Description: ${descriptionText.trim()}`);
    }
  });
  
  test('Reach out content structure', async ({ page }) => {

    // Locate the second container (new table) that holds the posts
    await page.waitForSelector('.grid.xs\\:grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-4', { timeout: 10000 });
    const postsTable = page.locator('.grid.xs\\:grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-4');
    await expect(postsTable).toBeVisible();
  
    // Locate each post inside the new table using the updated selector
    const posts = postsTable.locator('.ig-result');
    const postCount = await posts.count();
  
    // Ensure there's at least one post
    expect(postCount).toBeGreaterThan(0);
  
    // Loop through each post and validate the structure
    for (let i = 0; i < postCount; i++) {
      const post = posts.nth(i);
  
      // Check and retrieve name from the data-name attribute
      const name = await post.getAttribute('data-name');
      console.log(`Post ${i + 1} - Name: ${name}`);
  
      // Check and retrieve the title from the data-title attribute
      const title = await post.getAttribute('data-title');
      console.log(`Post ${i + 1} - Title: ${title}`);
  
      // Check and retrieve location from the data-location attribute
      const location = await post.getAttribute('data-location');
      console.log(`Post ${i + 1} - Location: ${location}`);
  
      // Check for the email link specifically
      const emailLink = post.locator('a[href^="mailto:"]');
      await expect(emailLink).toBeVisible();
      const emailHref = await emailLink.getAttribute('href');
      console.log(`Post ${i + 1} - Email: ${emailHref}`);
  
      // Check for the phone number link specifically
      const phoneLink = post.locator('a[href^="tel:"]');
      await expect(phoneLink).toBeVisible();
      const phoneHref = await phoneLink.getAttribute('href');
      console.log(`Post ${i + 1} - Phone: ${phoneHref}`);
    }
  });
  
});