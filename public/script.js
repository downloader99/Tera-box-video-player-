async function fetchVideo() {
    const url = document.getElementById("videoUrl").value;
    if (!url) {
        alert("Please enter a URL.");
        return;
    }

    try {
        let response = await fetch("/fetch-video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url }),
        });

        let data = await response.json();
        console.log("Response:", data); // Check if response is correct

        if (data.url) {
            document.getElementById("videoFrame").src = data.url; // Update video player
            document.getElementById("downloadLink").href = data.url; // Set download link
            document.getElementById("downloadLink").style.display = "block";
        } else {
            alert("Failed to fetch video.");
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        alert("Failed to fetch video. Please check URL.");
    }
}
