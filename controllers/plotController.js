const fs = require('fs');
const dbPath = './db.json';

// Function to list all plots
exports.listPlots = (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        res.status(200).json(db.plots);
    });
};

// Function to get a single plot by ID
exports.getPlotById = (req, res) => {
    const plotId = parseInt(req.params.id);

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        const plot = db.plots.find(p => p.id === plotId);

        if (!plot) {
            return res.status(404).json({ error: 'Plot not found' });
        }

        res.status(200).json(plot);
    });
};

// Function to get plot counts by type
exports.getPlotCounts = (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        const response = {
            count: db.plots.length,
        };

        res.status(200).json(response);
    });
};

// Function to create a new plot
exports.createPlot = (req, res) => {
    const newPlot = req.body;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        
        // Set plot ID and timestamps
        newPlot.id = db.plots.length + 1;
        newPlot.date_created = new Date().toISOString();
        newPlot.time_created = new Date().toTimeString();

        // Add the new plot to the array
        db.plots.push(newPlot);

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error writing to database.' });
            }

            res.status(201).json({ message: 'Plot created successfully', plot: newPlot });
        });
    });
};

// Function to fetch properties by array of IDs
exports.getPropertiesByArray = (req, res) => {
    const { propertyIds } = req.body; // Expect an array of property IDs in the request body

    // Validate input
    if (!Array.isArray(propertyIds)) {
        return res.status(400).json({ error: 'propertyIds must be an array' });
    }

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        const matchedProperties = db.plots.filter(plot => propertyIds.includes(plot.id));

        if (matchedProperties.length === 0) {
            return res.status(404).json({ error: 'No matching properties found' });
        }

        res.status(200).json(matchedProperties);
    });
};
