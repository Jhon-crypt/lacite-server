const express = require('express');
const router = express.Router();
const plotController = require('../controllers/plotController');

// Route to create a new plot
router.post('/plots', plotController.createPlot);

// Route to get plot counts by type
router.get('/plots/counts', plotController.getPlotCounts);

// Route to list all plots
router.get('/plots/all', plotController.listPlots);

// Route to get a single plot by ID
router.get('/plots/:id', plotController.getPlotById);

module.exports = router; 