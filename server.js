const express = require('express');
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("✅ TeraBox Video Fetcher API is running! Use POST or GET /fetch-video");
});

app.all('/fetch-video', async (req, res) => {
    const teraBoxLink = req.method === "POST" ? req.body.teraBoxLink : req.query.teraBoxLink;
    
    if (!teraBoxLink) {
        return res.status(400).json({ error: "Missing TeraBox link. Use 'teraBoxLink' in body (POST) or query (GET)" });
    }

    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        javaScriptEnabled: true
    });

    const page = await context.newPage();
    let videoUrl = null;

    // Listen for network requests & log all URLs
    page.on('response', async (response) => {
        const url = response.url();
        console.log("Network Request:", url); // Log all requests

        if (url.match(/\.(mp4|m3u8|ts)(\?|$)/)) {
            console.log("✅ Found Video URL:", url);
            videoUrl = url;
        }
    });

    console.log("Navigating to:", teraBoxLink);
    try {
        await page.goto(teraBoxLink, { waitUntil: 'domcontentloaded', timeout: 120000 });
        console.log("✅ Page loaded successfully.");
        await page.waitForTimeout(30000); // Increased wait time
    } catch (error) {
        console.error("❌ Error loading page:", error);
        await browser.close();
        return res.status(500).json({ error: "Failed to load TeraBox page" });
    }

    await browser.close();

    if (videoUrl) {
        return res.json({ videoUrl });
    } else {
        return res.status(500).json({ error: "Failed to extract video URL. Check logs for possible URLs." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 TeraBox Video Fetcher API is running on http://localhost:${PORT}`);
});

