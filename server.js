// Simple Express server that proxies requests to NASA's APOD API
const express = require('express');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const NASA_KEY = process.env.NASA_API_KEY;

app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint: /api/apod
// Query params forwarded: date (YYYY-MM-DD), count (for random), thumbs (true/false)
app.get('/api/apod', async (req, res) => {
  if (!NASA_KEY) {
    return res.status(500).json({ error: 'NASA_API_KEY not set on the server. Set it in .env or environment variables.' });
  }

  try {
    const params = new URLSearchParams();
    params.set('api_key', NASA_KEY);

    if (req.query.date) params.set('date', req.query.date);
    if (req.query.count) params.set('count', req.query.count);
    if (req.query.thumbs) params.set('thumbs', req.query.thumbs);

    const url = `https://api.nasa.gov/planetary/apod?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    // Forward NASA response (could be object or array when count is used)
    res.json(data);
  } catch (err) {
    console.error('Error fetching APOD:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch APOD' });
  }
});

// Fallback to index.html for any other route (SPA-friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});