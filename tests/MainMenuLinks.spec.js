const { test, expect } = require('@playwright/test');

test.describe('Main Menu Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://initgroup.com/');
        // Handle cookie banner if it appears
    const cookieAcceptButton = page.locator('button', { hasText: 'Accept all' }); // Adjust text if needed
    if (await cookieAcceptButton.isVisible()) {
      await cookieAcceptButton.click();
    }
  });

  test('Home page should load successfully', async ({ page }) => {
    await expect(page).toHaveURL('https://initgroup.com/');
  });

  // Test the main 'What we do' button
  test('What we do link', async ({ page }) => {
    await page.click('#wwd-menu-toggle');
    const WWDbutton = page.locator('.text-white.lg\\:text-case-title-thin-lg.\\32xl\\:text-case-title-thin.anim-block');
    await expect(WWDbutton).toBeVisible();
    await WWDbutton.click();
    await expect(page).toHaveURL('https://initgroup.com/what-we-do/');
  });

  // "What we do" business area links
  const businessLinks = [
    { name: 'Aqua & Agriculture', selector: '#wwd-content-one', url: 'https://initgroup.com/businessarea/aqua-agriculture/' },
    { name: 'Buildings', selector: '#wwd-content-one', url: 'https://initgroup.com/businessarea/buildings/' },
    { name: 'Energy', selector: '#wwd-content-one', url: 'https://initgroup.com/businessarea/energy/' },
    { name: 'Food & Beverage', selector: '#wwd-content-one', url: 'https://initgroup.com/businessarea/food-beverage/' },
    { name: 'Infrastructure', selector: '#wwd-content-one', url: 'https://initgroup.com/businessarea/infrastructure/' },
    { name: 'Life Science', selector: '#wwd-content-one', url: 'https://initgroup.com/businessarea/life-science/' },
    { name: 'Manufacturing', selector: '#wwd-content-one', url: 'https://initgroup.com/businessarea/manufacturing/' },
    { name: 'Marine & Offshore', selector: '#wwd-content-one', url: 'https://initgroup.com/businessarea/marine-offshore/' },
    { name: 'Utility', selector: '#wwd-content-one', url: 'https://initgroup.com/businessarea/utility/' },
  ];

  businessLinks.forEach(({ name, selector, url }) => {
    test(`${name} link`, async ({ page }) => {
      await page.click('#wwd-menu-toggle');
      const linkButton = page.locator(selector).getByRole('link', { name });
      await expect(linkButton).toBeVisible();
      await linkButton.click();
      await expect(page).toHaveURL(url);
    });
  });

  // "What we do" service links
  const serviceLinks = [
    { name: 'Automation Solutions', href: 'automation-solutions' },
    { name: 'Compliance Services', href: 'compliance-services' },
    { name: 'Digitalisation', href: 'digitalisation' },
    { name: 'Industrial Engineering', href: 'industrial-engineering' },
    { name: 'IT/OT Infrastructure & Security', href: 'it-ot-infrastructure-and-security' },
  ];

  serviceLinks.forEach(({ name, href }) => {
    test(`${name} link`, async ({ page }) => {
      await page.click('#wwd-menu-toggle');
      const serviceButton = page.locator(`#wwd-content a[href="https://initgroup.com/service/${href}/"]`);
      await expect(serviceButton).toBeVisible();
      await serviceButton.click();
      await expect(page).toHaveURL(`https://initgroup.com/service/${href}/`);
    });
  });

  // Main menu links (excluding dropdowns)
  const primaryMenuLinks = [
    { name: 'How we do it', href: 'how-we-do-it' },
    { name: 'Cases', href: 'industrial-it-and-automation-cases' },
    { name: 'Career', href: 'career' },
    { name: 'Contact', href: 'contact' },
    // 'About Init' removed here because it's now a submenu
  ];

  primaryMenuLinks.forEach(({ name, href }) => {
    test(`${name} link`, async ({ page }) => {
      const linkButton = page.locator(`#menu-primary-menu a[href="https://initgroup.com/${href}/"]`);
      await expect(linkButton).toBeVisible();
      await linkButton.click();
      await expect(page).toHaveURL(`https://initgroup.com/${href}/`);
    });
  });

// NEW: 'About Init' dropdown submenu (based on #insights-menu-toggle and #insights-content)
const aboutInitLinks = [
  { name: 'About Init', href: 'about-init' },
  { name: 'News & events', href: 'news-events' },
  { name: 'Our vision', href: 'our-vision' },
  { name: 'Our locations', href: 'our-locations' },
];

aboutInitLinks.forEach(({ name, href }) => {
  test(`${name} link`, async ({ page }) => {
    // Click to open the dropdown menu
    await page.click('#insights-menu-toggle');

    // Wait for the content container to appear
    const content = page.locator('#insights-content');
    await expect(content).toBeVisible();

    // Find and click the link by name inside the dropdown
    const link = content.getByRole('link', { name: new RegExp(name, 'i') });
    await expect(link).toBeVisible();
    await link.click();

    // Verify URL
    await expect(page).toHaveURL(`https://initgroup.com/${href}/`);
  });
});

});
