const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server with error handling
app.listen(port, (err) => {
    if (err) {
        console.error(`Failed to start server: ${err}`);
    } else {
        console.log(`Server running on port ${port}`);
    }
});
