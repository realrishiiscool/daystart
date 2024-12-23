��#   d a y s t a r t 
 

database name - LabourManagement
table name - LabourRequests

desc of table:
CREATE TABLE IF NOT EXISTS LabourRequests (
 id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    mobile_number VARCHAR(15) NOT NULL,
                    work_field ENUM('Construction', 'Industries', 'Agriculture', 'Home Needs', 'Medical', 'Other') NOT NULL,
                    need_of ENUM('Labour', 'Owner') NOT NULL,
                    work_time ENUM('1 day', '3 or more days', '1 week', '2 or more weeks', 'months') NOT NULL,
                    location VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

database software mysql

expression session for darkmode url encoded to determine the darkode or white mode of page
