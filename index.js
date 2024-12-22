const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser'); 
const { fetchData } = require('./database'); // Assuming fetchData is working

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Middleware to serve static files
app.use('/photo', express.static(path.join(__dirname, 'photo')));

// Route to handle dark mode toggle
app.post('/toggle-dark-mode', (req, res) => {
    const darkMode = req.body.darkMode === 'true';  // Get the darkMode value from the request body
    req.session.darkMode = darkMode;  // Save it to the session
    res.redirect('back');  // Redirect back to the previous page
});

// Route for the index page (home page)
app.get('/', (req, res) => {
    // Retrieve dark mode preference from session (if any), default to false
    const darkMode = req.session.darkMode || false;
    res.render('index', { darkMode: darkMode });
});


// Route for the construction page (you can apply the same logic)
app.get('/construction', async (req, res) => {
    try {
        const query = 'SELECT name, work_time, location, mobile_number FROM labourrequests WHERE work_field = "Construction"';
        const results = await fetchData(query);
        const darkMode = req.session.darkMode || false;
        res.render('construction', { constructionData: results, darkMode: darkMode });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Fallback route for 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
