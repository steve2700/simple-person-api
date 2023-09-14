const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());

// Create the "persons" table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS persons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    email TEXT
  )
`);

// CREATE: Add a new person
app.post('/api/persons', (req, res) => {
  const { name, age, email } = req.body;

  // Validate the data (add your validation logic here)

  // Insert the new person into the SQLite database
  const sql = 'INSERT INTO persons (name, age, email) VALUES (?, ?, ?)';
  const params = [name, age, email];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Respond with the ID of the newly created person
    res.status(201).json({ id: this.lastID });
  });
});

// READ: Fetch details of a person by ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  // Query the SQLite database for the person with the specified ID
  db.get('SELECT * FROM persons WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Person not found' });
    }
    // Respond with the person's details
    res.json(row);
  });
});

// UPDATE: Modify details of an existing person by ID
app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const { name, age, email } = req.body;

  // Validate the data (add your validation logic here)

  // Update the person's data in the SQLite database
  const sql = 'UPDATE persons SET name = ?, age = ?, email = ? WHERE id = ?';
  const params = [name, age, email, id];

  db.run(sql, params, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Person updated successfully' });
  });
});

// DELETE: Remove a person by ID
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  // Delete the person from the SQLite database
  db.run('DELETE FROM persons WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Person deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

