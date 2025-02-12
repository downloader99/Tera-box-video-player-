const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/fetch-video', (req, res) => {
  const { url } = req.body; // Extract the URL from the request body

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Here, you can add the logic to fetch the video from the URL
  // For now, let's just return the URL as a response
  res.json({ message: 'Video fetched successfully', url });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
