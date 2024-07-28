const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route
router.post('/api/signup', async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ message: 'User created successfully. Now login to proceed.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Fetch account details
router.get('/api/account', (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded.user.id, (err, user) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, user });
        });
    } catch (err) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});

// Update account details
router.post('/api/updateAccount', (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { firstName, lastName, phoneNumber, email } = req.body;
        User.findByIdAndUpdate(decoded.user.id, { firstName, lastName, phoneNumber, email }, { new: true }, (err, user) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, user });
        });
    } catch (err) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});

// Check authentication route
router.get('/api/checkAuth', (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ authenticated: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded.user.id, (err, user) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ authenticated: true, user: { firstName: user.firstName } });
        });
    } catch (err) {
        res.status(401).json({ authenticated: false });
    }
});

module.exports = router;
