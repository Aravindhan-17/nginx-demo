const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST_PORT = process.env.HOST_PORT || PORT;
const INSTANCE_NAME = process.env.INSTANCE_NAME || 'Local Instance';

// Add a simple route to identify which instance is responding
app.get('/api/instance', (req, res) => {
    res.json({ instance: INSTANCE_NAME });
});

// Log every request to see which instance handles it
app.use((req, res, next) => {
    console.log(`[${INSTANCE_NAME}] Serving request: ${req.method} ${req.url}`);
    next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`${INSTANCE_NAME} is running on http://localhost:${HOST_PORT}`);
});
