const express = require('express');
const playwright = require('playwright');

const app = express();
const PORT = 3000;

app.use(express.json());

// Root Route (To Fix "Cannot GET /")
app.get('/', (req, res) => {
    res.send("TeraBox Video Fetcher API is running!");
});

// Fetch Video Route
app.post('/fetch-video', async (req, res) => {
    const { teraBoxLink } = req.body;
    if (!teraBoxLink) {
        return res.status(400).json({ error: "No TeraBox link provided" });
    }

    console.log("Launching browser...");
    const browser = await playwright.chromium.launch({ headless: true });

    try {
        const context = await browser.newContext({
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            javaScriptEnabled: true
        });

        const page = await context.newPage();
        console.log("Navigating to TeraBox...");
        await page.goto(teraBoxLink, { waitUntil: 'load', timeout: 90000 });

        console.log("Waiting for video element...");
        await page.waitForSelector('video', { timeout: 60000 });

        // Extracting video URL
        const videoUrl = await page.evaluate(() => {
            const videoElement = document.querySelector('video');
            return videoElement ? videoElement.src : null;
        });

        if (videoUrl) {
            console.log("Direct Video URL Found:", videoUrl);
            res.json({ videoUrl });
        } else {
            console.log("Failed to extract video URL");
            res.status(500).json({ error: "Failed to extract video URL" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    } finally {
        await browser.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
