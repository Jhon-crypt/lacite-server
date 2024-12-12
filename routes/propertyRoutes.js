const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Route to create a new property
router.post('/properties', propertyController.createProperty);

router.get('/properties/counts', propertyController.getPropertyCounts);

// Route to list all properties
router.get('/properties/all', propertyController.listProperties);

module.exports = router; 