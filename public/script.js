// Constants
const TERA_BOX_REGEX = /^https:\/\/(www\.)?(terabox|1024terabox)\.com\/s\/[a-zA-Z0-9_-]+$/;
const LOGIN_REQUIRED_MESSAGES = ["Please log in", "Sign in to view"];
const INVALID_LINK_MESSAGE = "Invalid TeraBox link! Please enter a correct link.";
const ERROR_FETCHING_VIDEO_MESSAGE = "⚠️ Error loading video. Check the console for details.";
const LOGIN_REQUIRED_ALERT = "⚠️ TeraBox requires login to access this file.";
const VIDEO_EXTRACTION_ERROR = "❌ Could not extract video. Try another link.";

// Function to validate TeraBox links
function isValidTeraBoxLink(url) {
    return TERA_BOX_REGEX.test(url);
}

// Function to show alert messages
function showAlert(message) {
    alert(message);
}

// Function to set video player source
function setVideoPlayerSource(videoUrl) {
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.src = videoUrl;
    videoPlayer.style.display = "block"; // Show the video player
}

// When the "Play" button is clicked
document.getElementById("playButton").addEventListener("click", async function () {
    const linkInput = document.getElementById("teraboxLink").value;

    // Validate the TeraBox link
    if (!isValidTeraBoxLink(linkInput)) {
        showAlert(INVALID_LINK_MESSAGE);
        return;
    }

    console.log("✅ Valid TeraBox link:", linkInput);

    // Fetch the video
    try {
        await fetchVideo(linkInput);
    } catch (error) {
        console.error("❌ Error fetching video:", error);
        showAlert(ERROR_FETCHING_VIDEO_MESSAGE);
    }
});

// Function to fetch the video page
async function fetchVideo(link) {
    console.log("🔄 Fetching video for link:", link);

    try {
        const response = await fetch(link);
        console.log("✅ Response received:", response);

        const html = await response.text();
        console.log("📜 HTML content fetched.");

        // Check if the page requires login
        if (LOGIN_REQUIRED_MESSAGES.some(msg => html.includes(msg))) {
            showAlert(LOGIN_REQUIRED_ALERT);
            return;
        }

        // Extract video URL (This part may need improvements)
        const videoUrl = extractVideoUrl(html);
        if (videoUrl) {
            console.log("🎬 Extracted Video URL:", videoUrl);
            setVideoPlayerSource(videoUrl);
        } else {
            showAlert(VIDEO_EXTRACTION_ERROR);
        }
    } catch (error) {
        throw new Error(error);
    }
}

// Function to extract video URL from the HTML (Needs improvement)
function extractVideoUrl(html) {
    // Try to find a direct .mp4 URL in the HTML (may not always work)
    const match = html.match(/"videoUrl":"(https:\/\/[^"]+\.mp4)"/);
    return match ? match[1] : null;
}
