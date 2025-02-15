const playwright = require('playwright');

(async () => {
    console.log("Launching browser...");

    // Launch browser in headless mode
    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        javaScriptEnabled: true
    });

    const page = await context.newPage();
    const teraBoxLink = "https://1024terabox.com/s/17aWZGCfn62KrXNBIfzJEeQ"; // Replace with a valid TeraBox link

    console.log("Navigating to TeraBox...");
    try {
        await page.goto(teraBoxLink, { waitUntil: 'load', timeout: 90000 }); // Increased timeout to 90s
        console.log("Page loaded successfully.");
    } catch (error) {
        console.error("Error loading page:", error);
        await browser.close();
        return;
    }

    // Extract body content
    const pageContent = await page.content();
    console.log("Page Content:", pageContent);

    await browser.close();
})();
