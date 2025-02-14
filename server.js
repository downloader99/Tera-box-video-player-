const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

(async () => {
    const browser = await chromium.launch({
        headless: false, // Run in non-headless mode
        args: [
            '--disable-blink-features=AutomationControlled', // Avoid detection
            '--start-maximized' // Open in full-screen
        ]
    });

    const page = await browser.newPage();

    // Set real user agent & viewport
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewportSize({ width: 1366, height: 768 });

    console.log("Navigating to TeraBox...");
    await page.goto('https://1024terabox.com/s/17aWZGCfn62KrXNBIfzJEeQ', {
        waitUntil: 'networkidle', // Wait until all network requests finish
        timeout: 60000
    });

    console.log("Waiting for page elements...");
    await page.waitForTimeout(5000); // Allow time for JS execution

    // Debugging: Take a screenshot to verify loading
    await page.screenshot({ path: 'terabox.png' });

    // Extract page content
    const pageContent = await page.content();
    console.log("Page Content (First 500 Chars):", pageContent.slice(0, 500));

    await browser.close();
})();
