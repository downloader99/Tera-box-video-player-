const express = require('express');
const app = express();
const path = require('path');

app.use(express.json()); // Middleware to parse JSON request bodies

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle the POST request to /fetch-video
app.post('/fetch-video', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Here you can add your logic for video fetching or scraping

  // For now, just return the URL as a response
  res.json({ message: 'Video fetched successfully', url });
});

// If you want to serve an index page or handle the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
