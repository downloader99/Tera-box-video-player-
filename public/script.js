document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded");

    const fetchButton = document.getElementById("fetchButton");
    const videoUrlInput = document.getElementById("videoUrl");
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource");
    const statusMessage = document.getElementById("statusMessage");

    fetchButton.addEventListener("click", async function () {
        const url = videoUrlInput.value.trim();
        if (!url) {
            statusMessage.textContent = "Please enter a TeraBox URL.";
            return;
        }

        statusMessage.textContent = "Fetching video...";

        try {
            const response = await fetch("https://tera-box-video-player-1.onrender.com/fetch-video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            console.log("Response Data:", data);

            if (response.ok && data.url) {
                videoSource.src = data.url;
                videoPlayer.load();
                statusMessage.textContent = "Video fetched successfully!";
            } else {
                statusMessage.textContent = "Failed to fetch video. Please check the URL.";
            }
        } catch (error) {
            console.error("Error:", error);
            statusMessage.textContent = "Error fetching video.";
        }
    });
});
