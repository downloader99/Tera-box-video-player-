const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/fetch-video', async (req, res) => {
    const { url } = req.body;

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Your scraping logic here (adjust based on the TeraBox video page structure)
        const videoUrl = await page.evaluate(() => {
            // Find the video URL from the page
            const videoElement = document.querySelector('video'); 
            return videoElement ? videoElement.src : null;
        });

        await browser.close();

        if (videoUrl) {
            res.json({ message: 'Video fetched successfully', url: videoUrl });
        } else {
            res.status(404).json({ message: 'Video not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching video' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
