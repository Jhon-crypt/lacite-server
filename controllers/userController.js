const fs = require('fs');

const dbPath = './db.json';

// Function to handle user signup
exports.signup = (req, res) => {
    const newUser = req.body;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        const existingUser = db.users.find(user => user.email === newUser.email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists.' });
        }

        newUser.id = db.users.length + 1;
        db.users.push(newUser);

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error writing to database.' });
            }
            res.status(201).json({ message: 'User created successfully', user: newUser });
        });
    });
};

// Function to handle user login
exports.login = (req, res) => {
    const { email, password } = req.body;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        const user = db.users.find(u => u.email === email);

        if (user && user.password === password) {
            const { password, ...userWithoutPassword } = user;
            res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
};

// Function to retrieve all users
exports.getUsers = (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading from database.' });
        }

        const db = JSON.parse(data);
        const users = db.users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.status(200).json(users);
    });
};
