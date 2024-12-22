const mysql = require('mysql2'); // Using mysql2 instead of mysql

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // Make sure this matches the password for root
    database: 'labourmanagement',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

const fetchData = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { fetchData };