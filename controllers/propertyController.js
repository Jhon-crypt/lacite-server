const fs = require('fs');
const dbPath = './db.json';

// Custom UUID generator
function generateCustomUUID() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36
    const randomSegment = Math.random().toString(36).substring(2, 15); // Generate a random alphanumeric string
    const staticSegment = 'custom'; // A static segment to identify the UUIDs as custom

    return `${timestamp}-${randomSegment}-${staticSegment}`;
}

// Function to create a new property
exports.createProperty = (req, res) => {
    const newProperty = req.body;

    // Assign a new unique custom UUID
    newProperty.uid = generateCustomUUID();

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);

        // Assign a new unique ID based on array length
        newProperty.id = db.properties.length + 1;

        // Add the new property to the array
        db.properties.push(newProperty);

        // Write the updated properties back to db.json
        fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error writing to database.' });
            }

            res.status(201).json({ message: 'Property created successfully', property: newProperty });
        });
    });
};

exports.getPropertyCounts = (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        res.status(200).json({ count: db.properties.length });
    });
};

// Function to list all properties
exports.listProperties = (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        res.status(200).json(db.properties);
    });
};
