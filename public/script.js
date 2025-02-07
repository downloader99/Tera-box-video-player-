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

    // Fetch the video
    fetchVideo(linkInput);
});

// Function to fetch the video page
function fetchVideo(link) {
    console.log("🔄 Fetching video for link:", link);

    fetch(link)
        .then(response => {
            console.log("✅ Response received:", response);
            return response.text();
        })
        .then(html => {
            console.log("📜 HTML content fetched.");

            // Check if the page requires login
            if (html.includes("Please log in") || html.includes("Sign in to view")) {
                alert("⚠️ TeraBox requires login to access this file.");
                return;
            }

            // Extract video URL (This part may need improvements)
            const videoUrl = extractVideoUrl(html);
            if (videoUrl) {
                console.log("🎬 Extracted Video URL:", videoUrl);
                document.getElementById("videoPlayer").src = videoUrl;
                document.getElementById("videoPlayer").style.display = "block"; // Show the video player
            } else {
                alert("❌ Could not extract video. Try another link.");
            }
        })
        .catch(error => {
            console.error("❌ Error fetching video:", error);
            alert("⚠️ Error loading video. Check the console for details.");
        });
}

// Function to extract video URL from the HTML (Needs improvement)
function extractVideoUrl(html) {
    // Try to find a direct .mp4 URL in the HTML (may not always work)
    const match = html.match(/"videoUrl":"(https:\/\/[^"]+\.mp4)"/);
    return match ? match[1] : null;
}
