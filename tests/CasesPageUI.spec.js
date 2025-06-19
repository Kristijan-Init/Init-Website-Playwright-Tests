const { test, expect } = require('@playwright/test');

test.describe('Cases page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/industrial-it-and-automation-cases/');
        // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/industrial-it-and-automation-cases/');
    const casesPageTitle = await page.title();
    expect(casesPageTitle).toBe('Customer cases within industrial automation and IT - Init');
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