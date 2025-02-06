document.getElementById('playButton').addEventListener('click', function() {
  const link = document.getElementById('teraboxLink').value;
  const videoContainer = document.getElementById('videoContainer');

  if (link) {
    const videoId = extractVideoId(link);
    if (videoId) {
      const videoUrl = `https://terabox.com/video/${videoId}`; // Modify as per TeraBox API
      const iframe = document.createElement('iframe');
      iframe.src = videoUrl;
      iframe.width = '100%';
      iframe.height = '400';
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; encrypted-media';
      videoContainer.innerHTML = ''; // Clear previous content
      videoContainer.appendChild(iframe);
    } else {
      videoContainer.innerHTML = 'Invalid TeraBox link.';
    }
  } else {
    videoContainer.innerHTML = 'Please enter a TeraBox link.';
  }
});

function extractVideoId(link) {
  // Implement a function to extract video ID from TeraBox link
  const match = link.match(/terabox\.com\/video\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}