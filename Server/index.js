// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

app.post('/geocode', async (req, res) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.json({ error: 'Failed to fetch data' });
  }
});

app.get('/search', async (req, res) => {
  const { location } = req.query;

  try {
    // Google Places API request to get the location coordinates
    const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=formatted_address,name,geometry&key=${apiKey}`);

    if (!placesResponse.data || !placesResponse.data.candidates || placesResponse.data.candidates.length === 0) {
      res.status(404).send('Location not found');
      return;
    }

    const { geometry: { location: { lat, lng } } } = placesResponse.data.candidates[0];
    
    // Time Zone API request to get the time zone
    const timestamp = Math.floor(Date.now() / 1000);
    const timeZoneResponse = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${apiKey}`);
    
    // Build the response object with both place and time zone data
    const result = {
      place: placesResponse.data.candidates[0],
      timeZone: timeZoneResponse.data,
    };
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing your request');
  }
});

app.listen(PORT, () => console.log(`app started on port: ${PORT}`));