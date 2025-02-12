const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;  // Use Render's assigned port

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
