const axios = require('axios');  // Ensure axios is installed

// Define the URL for the POST request
const url = 'https://1024terabox.com/s/1BbXb02Gmin2lTrg_MX6x7Q';  // Replace with the actual URL

// Define the request headers (modify as needed)
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    // Add cookies or other headers if needed
};

// Define the POST data (parameters that TeraBox expects)
const data = {
    video_id: '1234567890',  // Example data, replace with actual video ID
    auth_token: 'your_auth_token_here',  // If authentication is required
    // Include any other necessary form data
};

// Function to extract video
async function extractVideo() {
    try {
        const response = await axios.post(url, data, { headers: headers });
        console.log('Video retrieved successfully');
        console.log(response.data);  // Handle the response (video URL, etc.)
    } catch (error) {
        console.error('Error retrieving video:', error);
    }
}

// Run the function
extractVideo();
