const express = require('express');
const { chromium } = require('playwright');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve frontend
});

app.post('/fetch-video', async (req, res) => {
    const { teraBoxLink } = req.body;
    if (!teraBoxLink) {
        return res.status(400).json({ error: "Missing TeraBox link" });
    }

    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        javaScriptEnabled: true
    });

    const page = await context.newPage();
    let videoUrl = null;

    // Listen for video requests
    page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('.m3u8') || url.includes('.mp4')) {
            console.log("Possible video URL found:", url);
            videoUrl = url;
        }
    });

    console.log("Navigating to:", teraBoxLink);
    try {
        await page.goto(teraBoxLink, { waitUntil: 'networkidle', timeout: 90000 });
        console.log("Page loaded successfully.");
        await page.waitForTimeout(10000); // Wait for network requests
    } catch (error) {
        console.error("Error loading page:", error);
        await browser.close();
        return res.status(500).json({ error: "Failed to load TeraBox page" });
    }

    await browser.close();

    if (videoUrl) {
        return res.json({ videoUrl });
    } else {
        return res.status(500).json({ error: "Failed to extract video URL" });
    }
});

app.listen(PORT, () => {
    console.log(`TeraBox Video Fetcher API is running on http://localhost:${PORT}`);
});
