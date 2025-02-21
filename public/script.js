document.getElementById('fetchButton').addEventListener('click', async () => {
    const linkInput = document.getElementById('linkInput').value.trim();
    const loadingText = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    const videoPlayer = document.getElementById('videoPlayer');

    if (!linkInput) {
        errorMessage.textContent = "Please enter a TeraBox link.";
        return;
    }

    // Reset UI
    errorMessage.textContent = "";
    videoPlayer.style.display = "none";
    videoPlayer.src = "";
    loadingText.style.display = "block";

    try {
        const response = await fetch('http://localhost:3000/fetch-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teraBoxLink: linkInput })
        });

        const data = await response.json();
        loadingText.style.display = "none";

        if (data.videoUrl) {
            videoPlayer.src = data.videoUrl;
            videoPlayer.style.display = "block";
        } else {
            errorMessage.textContent = "Failed to extract video.";
        }
    } catch (error) {
        loadingText.style.display = "none";
        errorMessage.textContent = "Error fetching video.";
        console.error("Fetch error:", error);
    }
});
