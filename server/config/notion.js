const { Client } = require('@notionhq/client');

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not defined in environment variables');
}

if (!process.env.NOTION_PODCAST_DATABASE_ID) {
  throw new Error('NOTION_PODCAST_DATABASE_ID is not defined in environment variables');
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const PODCAST_DATABASE_ID = process.env.NOTION_PODCAST_DATABASE_ID;

module.exports = {
  notion,
  PODCAST_DATABASE_ID
}; 