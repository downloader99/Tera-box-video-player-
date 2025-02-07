// Constants
const TERA_BOX_REGEX = /^https:\/\/(www\.)?(terabox|1024terabox)\.com\/s\/[a-zA-Z0-9_-]+$/;
const LOGIN_REQUIRED_MESSAGES = ["Please log in", "Sign in to view"];
const INVALID_LINK_MESSAGE = "Invalid TeraBox link! Please enter a correct link.";
const ERROR_FETCHING_VIDEO_MESSAGE = "⚠️ Error loading video. Check the console for details.";
const LOGIN_REQUIRED_ALERT = "⚠️ TeraBox requires login to access this file.";
const VIDEO_EXTRACTION_ERROR = "❌ Could not extract video. Try another link.";

// Function to validate TeraBox links
function isValidTeraBoxLink(url) {
    const regex = /^https:\/\/(www\.)?(terabox|1024terabox)\.com\/s\/[a-zA-Z0-9_-]+$/;
    return regex.test(url);
}

// When the "Play" button is clicked
document.getElementById("playButton").addEventListener("click", function () {
    const linkInput = document.getElementById("teraboxLink").value;

    // Validate the TeraBox link
    if (!isValidTeraBoxLink(linkInput)) {
        alert("Invalid TeraBox link! Please enter a correct link.");
        return;
    }

    console.log("✅ Valid TeraBox link:", linkInput);

    // Fetch the video page
    fetchVideo(linkInput);
});

// Function to fetch the video page using a proxy (to bypass CORS)
function fetchVideo(link) {
    console.log("🔄 Fetching video for link:", link);

    const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(link);

    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            console.log("📜 HTML content fetched.");

            const html = data.contents;

            // Check if login is required
            if (html.includes("Please log in") || html.includes("Sign in to view")) {
                alert("⚠️ TeraBox requires login to access this file.");
                return;
            }

            // Extract video URL
            const videoUrl = extractVideoUrl(html);
            if (videoUrl) {
                console.log("🎬 Extracted Video URL:", videoUrl);
                document.getElementById("videoPlayer").src = videoUrl;
                document.getElementById("videoPlayer").style.display = "block";
            } else {
                alert("❌ Could not extract video. Try another link.");
            }
        })
        .catch(error => {
            console.error("❌ Proxy Fetch Error:", error);
            alert("⚠️ Error fetching video. Check console for details.");
        });
}

// Function to extract video URL from the HTML (Basic pattern matching)
function extractVideoUrl(html) {
    // Try to find a direct .mp4 URL in the HTML (this may not always work)
    const match = html.match(/"videoUrl":"(https:\/\/[^"]+\.mp4)"/);
    return match ? match[1] : null;
}
