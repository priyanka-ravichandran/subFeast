const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
require('dotenv').config({ path: './.env' });

// Database connection
const connectDB = require('./config/db');
connectDB();

// Initialize express app
const app = express();
const server = http.createServer(app);

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/cart', cartRoutes);

app.use('/images', express.static('images'));





// Starting the server
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
