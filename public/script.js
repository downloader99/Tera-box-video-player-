// Make sure this function is defined properly
async function fetchVideo() {
  const url = document.getElementById('urlInput').value;

  // Make a GET request to the backend to get the video URL
  const response = await fetch(`/get-video?url=${encodeURIComponent(url)}`);
  const data = await response.json();

  // Display the video URL
  const videoContainer = document.getElementById('videoContainer');
  if (data.videoUrl) {
    videoContainer.innerHTML = `<video controls><source src="${data.videoUrl}" type="video/mp4"></video>`;
  } else {
    videoContainer.innerHTML = 'No video found.';
  }
}
