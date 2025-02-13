document.getElementById("fetchButton").addEventListener("click", async () => {
    console.log("Fetch button clicked!");  // Debug log

    const videoUrl = document.getElementById("videoUrl").value;
    if (!videoUrl) {
        console.log("No URL entered!");
        return;
    }

    console.log("Sending request to server...");

    try {
        const response = await fetch("/fetch-video", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: videoUrl })
        });

        console.log("Response received!", response);

        const data = await response.json();
        console.log("Response Data:", data);

        if (data.url) {
            document.getElementById("videoPlayer").src = data.url;
            console.log("Video URL set:", data.url);
        } else {
            console.log("No video URL received from server!");
        }
    } catch (error) {
        console.error("Error fetching video:", error);
    }
});
