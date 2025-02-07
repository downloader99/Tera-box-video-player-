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

function extractVideoId(link) {
  // This function needs to be updated if TeraBox's link format is different
  const match = link.match(/terabox\.com\/video\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
