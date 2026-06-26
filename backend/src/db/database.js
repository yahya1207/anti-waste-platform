const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database object
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Function to initialize the database
const initializeDatabase = () => {
    // Create tables if they do not exist
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Businesses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            address TEXT NOT NULL,
            latitude REAL,
            longitude REAL,
            pickup_instructions TEXT,
            FOREIGN KEY (user_id) REFERENCES Users (id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Offers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_id INTEGER,
            title TEXT NOT NULL,
            description TEXT,
            original_price REAL NOT NULL,
            discounted_price REAL NOT NULL,
            quantity_available INTEGER NOT NULL,
            pickup_start TEXT NOT NULL,
            pickup_end TEXT NOT NULL,
            status TEXT NOT NULL,
            FOREIGN KEY (business_id) REFERENCES Businesses (id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            offer_id INTEGER,
            quantity INTEGER NOT NULL,
            secure_code TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users (id),
            FOREIGN KEY (offer_id) REFERENCES Offers (id)
        )`);
    });
};

// Export the database object and initialization function
module.exports = {
    db,
    initializeDatabase
};