const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Palette Picker running on localhost:3000');
});

app.locals.palettes = []

app.get('/api/v1/palettes', (request, response) => {
  const palettes = app.locals.palettes;
  return response.json({ palettes });
});