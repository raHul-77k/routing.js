const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
    // Parse the URL
    const url = req.url;

    // Set content type to plain text
    res.setHeader('Content-Type', 'text/plain');

    // Handle requests based on URL
    if (url === '/home') {
        res.end('Welcome home');
    } else if (url === '/about') {
        res.end('Welcome to About Us page');
    } else if (url === '/node') {
        res.end('Welcome to my Node.js project');
    } else {
        // Handle other URLs
        res.statusCode = 404;
        res.end('404 Not Found');
    }
});

// Set the port and start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
