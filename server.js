const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/account', (req, res) => res.sendFile(path.join(__dirname, 'views', 'account.html')));
app.get('/search', (req, res) => res.sendFile(path.join(__dirname, 'views', 'search.html')));

const authRoutes = require('./routes/auth');
const flightRoutes = require('./routes/flights');
app.use('/', authRoutes);
app.use('/', flightRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
