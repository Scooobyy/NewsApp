const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// API route to fetch news from NewsAPI
app.get('/api/news', async (req, res) => {
  const { q, page, pageSize } = req.query;

  const apiKey = '3f906f326f62466b937ed1e947ef6e54'; // Replace with your NewsAPI key
 const url = `https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=${pageSize}&apiKey=3f906f326f62466b937ed1e947ef6e54`;


  try {
    const response = await axios.get(url);
    const articles = response.data.articles;
    res.json({ articles, totalResults: response.data.totalResults });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
