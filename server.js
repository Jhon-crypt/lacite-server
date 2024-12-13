// server.js
const express = require('express');
const cors = require('cors'); // Require the CORS module
const app = express();
const path = require('path');
const port = 3000;

app.use(cors()); // Use CORS middleware to allow all origins
app.use(express.json()); // Middleware to parse JSON bodies

// Import routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const plotRoutes = require('./routes/plotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Use routes
app.use('/api', userRoutes);
app.use('/api', propertyRoutes);
app.use('/api', plotRoutes);
app.use('/api', bookingRoutes);
app.use('/images', express.static(path.join(__dirname, 'storage', 'plots')));
app.use('/plot-images', express.static(path.join(__dirname, 'storage', 'properties')));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
//module.exports = app;