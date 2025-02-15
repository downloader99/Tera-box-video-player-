async function fetchVideo() {
    const link = document.getElementById("linkInput").value;
    const result = document.getElementById("result");
    result.textContent = "Fetching video...";

    try {
        const response = await fetch("/fetch-video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teraBoxLink: link })
        });

        const data = await response.json();
        if (data.videoUrl) {
            result.innerHTML = `Video URL: <a href="${data.videoUrl}" target="_blank">${data.videoUrl}</a>`;
        } else {
            result.textContent = "Failed to fetch video.";
        }
    } catch (error) {
        result.textContent = "Error fetching video.";
    }
}
