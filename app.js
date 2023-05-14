const express = require('express');
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Np@1938',
  database: 'npdb'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Create an Express app
const app = express();

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Define a route for form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  
  // Insert the form data into MySQL
  const query = `INSERT INTO form_data (name, email, message) VALUES (?, ?, ?)`;
  const values = [name, email, message];
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return;
    }
    console.log('Form data inserted into MySQL');
    res.send('Form data submitted successfully');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
