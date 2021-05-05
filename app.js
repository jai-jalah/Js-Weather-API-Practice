const express = require('express');
const https = require('https');
require('dotenv').config();

const app = express();

const weatherApiKey = process.env.WEATHER_API_KEY;
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${weatherApiKey}`;

app.get('/', function (req, res) {
  https.get(weatherApiUrl, function (response) {
    console.log(response.statusCode);

    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      console.log(desc);
    });
  });
  res.send('Server is up and running.');
});

app.listen(3000, function () {
  console.log('Server is running on port 3000.');
});
