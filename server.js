const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright'); // Playwright

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Fetch video URL using Playwright
async function fetchVideoPlaywright(url) {
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    try {
        // Increase timeout to 60 seconds
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Wait for the thumbnail to load - adjust the selector if needed
        console.log('Waiting for thumbnail selector...');
        await page.waitForSelector('img.video-img.blur', { timeout: 60000 });

        // Simulate click on the thumbnail
        console.log('Clicking on thumbnail...');
        await page.click('img.video-img.blur'); // Adjust this if the thumbnail element is different

        // Wait for the video element or iframe to appear
        console.log('Waiting for video element or iframe...');
        await page.waitForSelector('video, iframe', { timeout: 60000 });

        // Extract video URL from the <video> element
        const videoUrl = await page.evaluate(() => {
            const videoElement = document.querySelector('video');
            if (videoElement && videoElement.src) {
                return videoElement.src;
            }

            // Check for iframe
            const iframeElement = document.querySelector('iframe');
            if (iframeElement && iframeElement.src) {
                return iframeElement.src;
            }

            return null; // Return null if no video found
        });

        await browser.close();
        return videoUrl;
    } catch (error) {
        console.error('Error loading page:', error);
        await browser.close();
        throw new Error('Page loading failed');
    }
}

// Route to fetch video URL
app.post('/fetch-video', async (req, res) => {
    const videoUrl = req.body.url;
    if (!videoUrl) {
        return res.status(400).json({ error: "No URL provided" });
    }

    try {
        console.log("Using Playwright...");
        const extractedUrl = await fetchVideoPlaywright(videoUrl);

        if (extractedUrl) {
            console.log("Extracted Video URL:", extractedUrl);
            return res.json({ message: "Video fetched successfully", videoUrl: extractedUrl });
        } else {
            console.log("Failed to extract video URL!");
            return res.status(404).json({ error: "Video not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to fetch video" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
