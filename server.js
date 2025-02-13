<<<<<<< HEAD
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
=======
const express = require("express");
const puppeteer = require('puppeteer');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Function to extract the actual video URL from TeraBox
async function fetchVideoStream(url) {
    const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/home/userland/.cache/puppeteer/chrome/linux-133.0.6943.53/chrome-linux64/chrome',  // Update this path if required
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("Extracting video stream URL...");
    
    const extractedUrl = await page.evaluate(() => {
        const videoElement = document.querySelector("video");
        return videoElement ? videoElement.src : null;
    });

    await browser.close();

    return extractedUrl;
}

// API Route to fetch and return the video streaming link
app.post("/fetch-video", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const videoStreamUrl = await fetchVideoStream(url);

        if (videoStreamUrl) {
            console.log("Extracted Video URL:", videoStreamUrl);
            return res.json({ message: "Video fetched successfully", url: videoStreamUrl });
        } else {
            console.log("Failed to extract video URL!");
            return res.status(404).json({ error: "Video URL not found" });
        }
    } catch (error) {
        console.error("Error extracting video:", error);
        return res.status(500).json({ error: "Failed to fetch video" });
    }
});

// Serve the frontend
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
>>>>>>> 8dc2f75 (Updated server and client code, modified package files)
});
