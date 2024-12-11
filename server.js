// server.js
const express = require('express');
const cors = require('cors'); // Require the CORS module
const app = express();
const port = 3000;

app.use(cors()); // Use CORS middleware to allow all origins
app.use(express.json()); // Middleware to parse JSON bodies

// Import routes
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});