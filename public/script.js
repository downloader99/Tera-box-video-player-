document.getElementById("playButton").addEventListener("click", function() {
    const linkInput = document.getElementById("teraboxLink").value;

    if (!isValidTeraBoxLink(linkInput)) {
        alert("Invalid TeraBox link! Please enter a correct link.");
        return;
    }

    console.log("Valid TeraBox link:", linkInput);

    // Attempt to fetch the video
    fetchVideo(linkInput);
});

function fetchVideo(link) {
    console.log("Fetching video for link:", link);

    fetch(link)
        .then(response => {
            console.log("Response received:", response);
            return response.text();
        })
        .then(html => {
            console.log("HTML content:", html);

            // Check if the page requires login
            if (html.includes("Please log in")) {
                alert("TeraBox requires login to access this file.");
                return;
            }

            // Extract video URL (Needs correct parsing logic)
            const videoUrl = extractVideoUrl(html);
            if (videoUrl) {
                console.log("Extracted video URL:", videoUrl);
                document.getElementById("videoPlayer").src = videoUrl;
            } else {
                alert("Could not extract video. Try another link.");
            }
        })
        .catch(error => {
            console.error("Error fetching video:", error);
            alert("Error loading video. Check console for details.");
        });
}

function extractVideoUrl(html) {
    // This function needs proper logic to extract video URLs from TeraBox
    const match = html.match(/"videoUrl":"(https:\/\/[^"]+)"/);
    return match ? match[1] : null;
}
