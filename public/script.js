document.getElementById('playButton').addEventListener('click', function() {
  const link = document.getElementById('teraboxLink').value;
  const videoContainer = document.getElementById('videoContainer');

  console.log("User input link:", link); // Debugging

  if (link) {
    const videoId = extractVideoId(link);
    console.log("Extracted video ID:", videoId); // Debugging

    if (videoId) {
      const videoUrl = `https://terabox.com/video/${videoId}`; // This may need modification
      console.log("Generated video URL:", videoUrl); // Debugging

      const iframe = document.createElement('iframe');
      iframe.src = videoUrl;
      iframe.width = '100%';
      iframe.height = '400';
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; encrypted-media';

      videoContainer.innerHTML = ''; // Clear previous content
      videoContainer.appendChild(iframe);
    } else {
      console.log("Invalid TeraBox link format.");
      videoContainer.innerHTML = 'Invalid TeraBox link.';
    }
  } else {
    console.log("No link entered.");
    videoContainer.innerHTML = 'Please enter a TeraBox link.';
  }
});

function isValidTeraBoxLink(url) {
    const regex = /^https:\/\/(www\.)?(terabox|1024terabox)\.com\/s\/[a-zA-Z0-9_-]+$/;
    return regex.test(url);
}

document.getElementById("playButton").addEventListener("click", function() {
    const linkInput = document.getElementById("teraboxLink").value;

    if (!isValidTeraBoxLink(linkInput)) {
        alert("Invalid TeraBox link! Please enter a correct link.");
        return;
    }

    console.log("Valid TeraBox link:", linkInput);
});
