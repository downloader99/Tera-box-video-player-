const express = require('express');
const { chromium } = require('playwright');
const app = express();
const port = 3000;

// Allow JSON requests
app.use(express.json());

// Serve static files from the frontend (index.html, script.js, etc.)
app.use(express.static('public'));

// Route to fetch video URL from TeraBox or any other source
app.get('/get-video', async (req, res) => {
  const videoUrl = await getVideoUrl(req.query.url);
  res.json({ videoUrl });
});

// Playwright function to scrape the video URL
async function getVideoUrl(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('video'); // Adjust the selector as needed
  const videoUrl = await page.evaluate(() => document.querySelector('video').src);
  await browser.close();
  return videoUrl;
}

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
