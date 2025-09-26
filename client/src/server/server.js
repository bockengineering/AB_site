const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET
});

app.use(express.json());
app.use(cors());

app.get('/api/podcasts', async (req, res) => {
  try {
    console.log('Fetching podcasts from Notion...');
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    console.log('Raw response:', response);

    const podcasts = response.results.map(page => {
      return {
        title: page.properties.Title.title[0]?.plain_text,
        date: page.properties.Date.date.start,
        show: page.properties.Show.rich_text[0]?.plain_text,
        link: page.properties.Link.url,
        snips: page.properties.Snips.number
      };
    });

    console.log('Processed podcasts:', podcasts);
    res.json(podcasts);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Failed to fetch podcasts', details: error.message });
  }
});

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment variables loaded:');
  console.log('DATABASE_ID:', process.env.NOTION_DATABASE_ID);
  console.log('SECRET exists:', !!process.env.NOTION_SECRET);
}); 