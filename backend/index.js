const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config({ path: './.env' });

// Database connection
const connectDB = require('./config/db');
connectDB();

// Initialize express app
const app = express();
const server = http.createServer(app);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());


// Starting the server
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
