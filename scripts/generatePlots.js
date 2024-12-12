const fs = require('fs');
//const path = require('path');
const dbPath = '../db.json';

// Helper function to generate a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Function to generate random plots
function generateRandomPlots(numPlots) {
    const plots = [];
    for (let i = 0; i < numPlots; i++) {
        const plot = {
            id: i + 1,
            name: `Plot ${i + 1}`,
            uid: `UID${getRandomInt(10000)}`,
            path: `/images/plots/plot${i + 1}.jpg`,
            sqft: `${getRandomInt(1000) + 100} sqft`,
            price: `$${getRandomInt(1000) + 100}`,
            type: getRandomInt(2) === 1 ? 'Residential' : 'Commercial',
            description: `Description for Plot ${i + 1}`,
            amenities: ['amenity1', 'amenity2'],
            date_created: new Date().toISOString(),
            time_created: new Date().toTimeString()
        };
        plots.push(plot);
    }
    console.log("Generated Plots:", plots);
    return plots;
}

// Function to write plots to the JSON database
function writePlotsToDB(plots) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading from database:', err);
            return;
        }

        const db = JSON.parse(data);
        console.log("Current DB Data:", db);
        db.plots = db.plots.concat(plots); // Append new plots

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error('Error writing to database:', err);
                return;
            }
            console.log(`${plots.length} plots added successfully.`);
        });
    });
}

// Generate 10 random plots
const randomPlots = generateRandomPlots(10);
writePlotsToDB(randomPlots); 