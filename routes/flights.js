const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Search flights route
router.post('/api/searchFlights', async (req, res) => {
    const { flightNumber } = req.body;
    const apiKey = process.env.AVIATIONSTACK_API_KEY;
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;

    try {
        const response = await axios.get(url);
        const flightData = response.data.data[0]; // Get the first flight data object

        if (flightData) {
            res.json({ success: true, data: flightData });
        } else {
            res.json({ success: false, message: 'No flight found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
