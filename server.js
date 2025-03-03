const express = require("express");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const path = require("path");

puppeteer.use(StealthPlugin());

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/extract", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "No URL provided" });
    }

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        // Log page content for debugging
        console.log(await page.content());

        // Extract video URL (modify selector based on TeraBox page structure)
        const videoSrc = await page.evaluate(() => {
            let videoElement = document.querySelector("video"); // Adjust selector if necessary
            return videoElement ? videoElement.src : null;
        });

        await browser.close();

        if (!videoSrc) {
            return res.status(500).json({ error: "Failed to extract video URL" });
        }

        res.json({ success: true, videoUrl: videoSrc });
    } catch (error) {
        console.error("Extraction failed:", error);
        res.status(500).json({ error: "Failed to extract video" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

