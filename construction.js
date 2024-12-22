const mysql = require('mysql');

// Function to fetch construction data and return HTML table
async function fetchConstructionData() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234', // Make sure this matches the password for root
        database: 'labourmanagement',
        port: 3306
    });

    // Connect to the database
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
    });

    return new Promise((resolve, reject) => {
        const query = 'SELECT name, work_time, location, mobile_number FROM labourrequests WHERE work_field = "Construction"';
        
        connection.query(query, (err, results) => {
            if (err) {
                reject('Error fetching data from database');
                return;
            }

            // Generate HTML table
            let tableHTML = '<table border="1">';
            tableHTML += '<thead><tr><th>Name</th><th>Work Time</th><th>Location</th><th>Mobile Number</th></tr></thead>';
            tableHTML += '<tbody>';

            results.forEach(row => {
                tableHTML += `
                    <tr>
                        <td>${row.name}</td>
                        <td>${row.work_time}</td>
                        <td>${row.location}</td>
                        <td>${row.mobile_number}</td>
                    </tr>
                `;
            });

            tableHTML += '</tbody></table>';

            resolve(tableHTML);  // Return the HTML table as the result
        });

        // Close the connection
        connection.end();
    });
}

module.exports = { fetchConstructionData };
