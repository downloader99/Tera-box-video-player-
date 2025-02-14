const { chromium } = require("playwright");

(async () => {
    try {
        const browser = await chromium.launch({ headless: true });  // Launch Chromium
        const page = await browser.newPage();
        await page.goto("https://example.com");  // Replace with the actual video URL
        console.log("Page title:", await page.title());
        await browser.close();
    } catch (error) {
        console.error("Error launching Playwright:", error);
    }
})();
