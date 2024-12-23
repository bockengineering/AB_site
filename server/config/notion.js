const { Client } = require('@notionhq/client');

if (!process.env.NOTION_API_KEY) {
  console.error('NOTION_API_KEY is not defined in environment variables');
  process.exit(1);
}

if (!process.env.NOTION_PODCAST_DATABASE_ID) {
  console.error('NOTION_PODCAST_DATABASE_ID is not defined in environment variables');
  process.exit(1);
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const PODCAST_DATABASE_ID = process.env.NOTION_PODCAST_DATABASE_ID;

module.exports = {
  notion,
  PODCAST_DATABASE_ID
}; 