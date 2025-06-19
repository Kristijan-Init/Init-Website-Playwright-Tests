const { test, expect } = require('@playwright/test');

test.describe('Contact page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/contact/');
        // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Page load', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/contact/');
    const contactPageTitle = await page.title();
    expect(contactPageTitle).toBe('Reach out to relevant automation and IT professionals - Init');
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

  test('Reach out content structure', async ({ page }) => {
    const contactsTable = page.locator('.filter-page.grid');
    await contactsTable.waitFor({ state: 'visible', timeout: 10000 });

    const contacts = contactsTable.locator('[data-name]');
    const contactCount = await contacts.count();
    expect(contactCount).toBeGreaterThan(0);

    for (let i = 0; i < contactCount; i++) {
      const contact = contacts.nth(i);

      const name = await contact.getAttribute('data-name');
      const title = await contact.getAttribute('data-title');
      const location = await contact.getAttribute('data-location');

      console.log(`Contact ${i + 1}`);
      console.log(`- Name: ${name}`);
      console.log(`- Title: ${title}`);
      if (location) {
        console.log(`- Location: ${location}`);
      } else {
        console.log(`- Location: not provided`);
      }

      expect(name).not.toBeNull();
      expect(title).not.toBeNull();

      const emailLink = contact.locator('a[href^="mailto:"]');
      await expect(emailLink).toBeVisible();
      const emailHref = await emailLink.getAttribute('href');
      console.log(`- Email: ${emailHref}`);

      const phoneLink = contact.locator('a[href^="tel:"]');
      const phoneHref = await phoneLink.getAttribute('href');

      if (phoneHref && phoneHref.trim() !== 'tel:') {
        await expect(phoneLink).toBeVisible();
        console.log(`- Phone: ${phoneHref}`);
      } else {
        console.log(`- Phone: not provided`);
      }

    }
  });




});