const mysql = require('mysql2');

// Create a connection to MySQL (no database specified yet)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // Make sure this matches the password for root
    port: 3306
});

// Connect to MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL server: ', err);
        return;
    }
    console.log('Connected to MySQL server.');

    // Step 1: Create the database
    const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS LabourManagement';
    connection.query(createDatabaseQuery, (err) => {
        if (err) {
            console.error('Error creating database: ', err);
            return;
        }
        console.log('Database "LabourManagement" created or already exists.');

        // Step 2: Use the created database
        connection.changeUser({ database: 'LabourManagement' }, (err) => {
            if (err) {
                console.error('Error switching to database: ', err);
                return;
            }
            console.log('Using "LabourManagement" database.');

            // Step 3: Create the LabourRequests table
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS LabourRequests (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    mobile_number VARCHAR(15) NOT NULL,
                    work_field ENUM('Construction', 'Industries', 'Agriculture', 'Home Needs', 'Medical', 'Other') NOT NULL,
                    need_of ENUM('Labour', 'Owner') NOT NULL,
                    work_time ENUM('1 day', '3 or more days', '1 week', '2 or more weeks', 'months') NOT NULL,
                    location VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;

            connection.query(createTableQuery, (err) => {
                if (err) {
                    console.error('Error creating table: ', err);
                    return;
                }
                console.log('Table "LabourRequests" created or already exists.');

                // Step 4: Insert data into the LabourRequests table
                const insertDataQuery = `
                    INSERT INTO LabourRequests (name, mobile_number, work_field, need_of, work_time, location)
                    VALUES
                        ('Ramesh Kumar', '9876543210', 'Construction', 'Labour', '1 week', 'Hyderabad'),
                        ('Rajesh Verma', '9876543201', 'Construction', 'Labour', '1 day', 'Mumbai'),
                        ('Sunita Sharma', '8765432190', 'Industries', 'Owner', '3 or more days', 'Delhi'),
                        ('Amit Kumar', '7654321987', 'Agriculture', 'Labour', '1 week', 'Lucknow'),
                        ('Priya Singh', '6543219876', 'Home Needs', 'Owner', '2 or more weeks', 'Bangalore'),
                        ('Manoj Tiwari', '5432198765', 'Medical', 'Labour', 'months', 'Pune'),
                        ('Suresh Reddy', '4321987654', 'Construction', 'Owner', '1 day', 'Hyderabad'),
                        ('Anita Das', '3219876543', 'Agriculture', 'Labour', '3 or more days', 'Kolkata'),
                        ('Vikram Mehta', '2198765432', 'Home Needs', 'Labour', '1 week', 'Chennai'),
                        ('Pooja Agarwal', '1987654321', 'Medical', 'Owner', '2 or more weeks', 'Jaipur'),
                        ('Ravi Sharma', '8765432109', 'Industries', 'Labour', 'months', 'Ahmedabad');
                `;

                connection.query(insertDataQuery, (err) => {
                    if (err) {
                        console.error('Error inserting data: ', err);
                        return;
                    }
                    console.log('Data inserted successfully into "LabourRequests" table.');
                });
            });
        });
    });
});
