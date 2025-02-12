async function fetchVideo() {
    try {
        console.log("fetchVideo function called");

        // Get the input URL
        let videoUrl = document.getElementById("videoUrl").value;
        if (!videoUrl) {
            alert("Please enter a valid video URL.");
            return;
        }

        // Send a request to the server to fetch the video
        let response = await fetch('/fetch-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: videoUrl })
        });

        let data = await response.json();

        if (data.success) {
            document.getElementById("videoPlayer").src = data.videoLink;
        } else {
            alert("Failed to fetch video. Please check the URL.");
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        alert("An error occurred. Please try again.");
    }
}

// Ensure the script runs after the page loads
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fetchButton").addEventListener("click", fetchVideo);
});
