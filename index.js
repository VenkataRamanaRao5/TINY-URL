import express from 'express';
import pool from './db.js';
import crypto from 'crypto';

const app = express();
app.use(express.json());

const BASE_URL = "http://localhost:3000/"; 


function generateShortCode(length = 6) {
  return crypto.randomBytes(length).toString('base64url').slice(0, length);
}

// POST: Create a new short URL
app.post('/shorten', async (req, res) => {
  try {
    const { long_url } = req.body;

    // Check if the URL already exists
    const existing = await pool.query('SELECT * FROM urls WHERE long_url = $1', [long_url]);
    if (existing.rows.length > 0) {
      return res.json(existing.rows[0]);
    }

    // Generate unique short URL
    let short_url = generateShortCode();
    // Ensure uniqueness
    let exists = await pool.query('SELECT * FROM urls WHERE short_url = $1', [short_url]);
    while (exists.rows.length > 0) {
      short_url = generateShortCode();
      exists = await pool.query('SELECT * FROM urls WHERE short_url = $1', [short_url]);
    }

    const result = await pool.query(
      'INSERT INTO urls (long_url, short_url) VALUES ($1, $2) RETURNING *',
      [long_url, short_url]
    );

    res.json({ ...result.rows[0], short_url: BASE_URL + result.rows[0].short_url });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET: Optional - list all URLs
app.get('/urls', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM urls ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// GET: Redirect short URL to long URL
app.get('/:short_url', async (req, res) => {
  try {
    const { short_url } = req.params;
    const result = await pool.query('SELECT * FROM urls WHERE short_url = $1', [short_url]);

    if (result.rows.length === 0) {
      return res.status(404).send('URL not found');
    }

    res.redirect(result.rows[0].long_url);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


app.listen(3000, () => console.log('Server running on port 3000'));
