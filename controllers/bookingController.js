const fs = require('fs');
const dbPath = './db.json';

// Function to create a new booking
exports.createBooking = (req, res) => {
    const {
        fullname,
        email,
        phone,
        country_of_residence,
        plot_property,
        plot_property_id,
        type,
        price,
        status = 'pending' // Default status is 'pending' if not provided
    } = req.body;

    // Validate required fields
    if (!fullname || !email || !phone || !country_of_residence || !plot_property || 
        !plot_property_id || !type || !price) {
        return res.status(400).json({
            error: 'Missing required fields. Please provide fullname, email, phone, country_of_residence, plot_property, plot_property_id, type, and price'
        });
    }

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        
        const newBooking = {
            id: db.bookings.length + 1,
            fullname,
            email,
            phone,
            country_of_residence,
            plot_property,
            plot_property_id,
            type,
            price,
            status,
            date_created: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
            time_created: new Date().toTimeString()
        };

        // Add the new booking to the array
        db.bookings.push(newBooking);

        // Write the updated bookings back to db.json
        fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error writing to database.' });
            }

            res.status(201).json({
                message: 'Booking created successfully',
                booking: newBooking
            });
        });
    });
};

// Function to list all bookings
exports.listBookings = (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }
        const db = JSON.parse(data);
        res.status(200).json(db.bookings);
    });
};

// Function to get a single booking by ID
exports.getBookingById = (req, res) => {
    const bookingId = parseInt(req.params.id);

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        const booking = db.bookings.find(b => b.id === bookingId);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(booking);
    });
}; 