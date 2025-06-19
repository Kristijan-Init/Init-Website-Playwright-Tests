const { test, expect } = require('@playwright/test');

test.describe('News and Events page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/news-events/');
    // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/news-events/');
    const newsEventsPageTitle = await page.title();
    expect(newsEventsPageTitle).toBe("News & Events - InitGroup");
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

  test('News and Events content structure', async ({ page }) => {

    // Wait for the news/events grid to load
    const postsGrid = page.locator('div.grid.gap-6').nth(0);;
    await expect(postsGrid).toBeVisible();

    // Get each news post
    const posts = postsGrid.locator('div.col-span-1.anim');
    const postCount = await posts.count();
    expect(postCount).toBeGreaterThan(0);

    for (let i = 0; i < postCount; i++) {
      const post = posts.nth(i);

      // Image check
      const image = post.locator('img');
      await expect(image).toBeVisible();
      const imageSrc = await image.getAttribute('src');
      console.log(`Post ${i + 1} - Image src: ${imageSrc}`);

      // Link with aria-label
      const mainLink = post.locator('a[aria-label="Go to the case"]');
      await expect(mainLink).toBeVisible();
      const href = await mainLink.getAttribute('href');
      console.log(`Post ${i + 1} - Main link href: ${href}`);

      // Headline check
      const headline = post.locator('p.font-semibold');
      await expect(headline).toBeVisible();
      const headlineText = await headline.textContent();
      console.log(`Post ${i + 1} - Headline: ${headlineText?.trim()}`);

      // Description check
      const description = post.locator('p.leading-relaxed');
      await expect(description).toBeVisible();
      const descText = await description.textContent();
      console.log(`Post ${i + 1} - Description: ${descText?.trim()}`);

      // "Read more" link check
      const readMore = post.locator('a', { hasText: 'Read more' });
      await expect(readMore).toBeVisible();
      const readMoreHref = await readMore.getAttribute('href');
      console.log(`Post ${i + 1} - Read more href: ${readMoreHref}`);
    }
  });

  test('Cool Stories content structure', async ({ page }) => {

    // Wait for the grid of posts
    const postsGrid = page.locator('div.grid.gap-6').nth(1);
    await expect(postsGrid).toBeVisible();

    // Select all posts
    const posts = postsGrid.locator('div.col-span-1.anim');
    const postCount = await posts.count();
    expect(postCount).toBeGreaterThan(0);

    for (let i = 0; i < postCount; i++) {
      const post = posts.nth(i);

      // Image check
      const image = post.locator('img');
      await expect(image).toBeVisible();
      const imageSrc = await image.getAttribute('src');
      console.log(`Post ${i + 1} - Image src: ${imageSrc}`);

      // Link with aria-label
      const mainLink = post.locator('a[aria-label="Go to the case"]');
      await expect(mainLink).toBeVisible();
      const href = await mainLink.getAttribute('href');
      console.log(`Post ${i + 1} - Main link href: ${href}`);

      // Headline (title)
      const headline = post.locator('p.font-semibold');
      await expect(headline).toBeVisible();
      const headlineText = await headline.textContent();
      console.log(`Post ${i + 1} - Headline: ${headlineText?.trim()}`);

      // Description
      const description = post.locator('p.leading-relaxed');
      await expect(description).toBeVisible();
      const descText = await description.textContent();
      console.log(`Post ${i + 1} - Description: ${descText?.trim()}`);

      // Read More link
      const readMore = post.locator('a', { hasText: 'Read more' });
      await expect(readMore).toBeVisible();
      const readMoreHref = await readMore.getAttribute('href');
      console.log(`Post ${i + 1} - Read more href: ${readMoreHref}`);
    }
  });

  test('Events content structure', async ({ page }) => {
    await page.goto('https://initgroup.com/news-events/');

    // Wait for the third grid (Events section)
    const postsGrid = page.locator('div.grid.gap-6').nth(2);
    await expect(postsGrid).toBeVisible();

    // Get each event post
    const posts = postsGrid.locator('div.col-span-1.anim');
    const postCount = await posts.count();
    expect(postCount).toBeGreaterThan(0);

    for (let i = 0; i < postCount; i++) {
      const post = posts.nth(i);

      // Image check
      const image = post.locator('img');
      await expect(image).toBeVisible();
      const imageSrc = await image.getAttribute('src');
      console.log(`Event ${i + 1} - Image src: ${imageSrc}`);

      // Link with aria-label
      const mainLink = post.locator('a[aria-label="Go to the case"]');
      await expect(mainLink).toBeVisible();
      const href = await mainLink.getAttribute('href');
      console.log(`Event ${i + 1} - Main link href: ${href}`);

      // Headline (title)
      const headline = post.locator('p.font-semibold');
      await expect(headline).toBeVisible();
      const headlineText = await headline.textContent();
      console.log(`Event ${i + 1} - Headline: ${headlineText?.trim()}`);

      // Description
      const description = post.locator('p.leading-relaxed');
      await expect(description).toBeVisible();
      const descText = await description.textContent();
      console.log(`Event ${i + 1} - Description: ${descText?.trim()}`);

      // Read More link
      const readMore = post.locator('a', { hasText: 'Read more' });
      await expect(readMore).toBeVisible();
      const readMoreHref = await readMore.getAttribute('href');
      console.log(`Event ${i + 1} - Read more href: ${readMoreHref}`);
    }
  });


  test('Find and open first calendar event with modal validation', async ({ page }) => {

    // Wait for calendar toolbar to be visible
    const title = page.locator('.fc-toolbar-title');
    await expect(title).toBeVisible();

    const maxMonthScrolls = 12;
    let eventFound = false;

    for (let i = 0; i < maxMonthScrolls; i++) {
      const currentMonth = await title.textContent();
      console.log(`Checking month: ${currentMonth?.trim()}`);

      const events = page.locator('.fc-event');
      const count = await events.count();

      if (count > 0) {
        console.log(`🎯 Found ${count} event(s) in: ${currentMonth?.trim()}`);
        eventFound = true;

        // Click the first event
        await events.first().click();

        // Wait for modal to appear
        const modal = page.locator('.modal-dialog');
        await expect(modal).toBeVisible();

        // Validate modal content

        // Title
        const modalTitle = page.locator('#eventTitle');
        await expect(modalTitle).toBeVisible();
        const titleText = await modalTitle.textContent();
        console.log(`📝 Modal Title: ${titleText?.trim()}`);

        // Image
        const image = page.locator('#event-image');
        await expect(image).toBeVisible();
        const imageSrc = await image.getAttribute('src');
        console.log(`🖼️ Modal Image: ${imageSrc}`);

        // Date
        const dateInput = page.locator('#eventDate');
        await expect(dateInput).toBeVisible();
        const dateValue = await dateInput.inputValue();
        console.log(`📅 Modal Date: ${dateValue || 'N/A'}`);

        // Description
        const description = page.locator('#eventDescription');
        await expect(description).toBeVisible();
        const descriptionText = await description.inputValue(); // <<-- fix
        console.log(`📖 Modal Description: ${descriptionText.trim()}`);

        break;
      }

      // Move to next month
      await page.click('.fc-next-button');
      await page.waitForTimeout(1000);
    }

    expect(eventFound).toBe(true); // Fail if no events found in 12 months
  });

});