const { Client } = require('@notionhq/client');

// Validate environment variables
if (!process.env.NOTION_API_KEY) {
  console.error('NOTION_API_KEY is not defined in environment variables');
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  } else {
    console.warn('Running without Notion API - some features will be disabled');
  }
}

if (!process.env.NOTION_PODCAST_DATABASE_ID) {
  console.error('NOTION_PODCAST_DATABASE_ID is not defined in environment variables');
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  } else {
    console.warn('Running without Notion Database ID - some features will be disabled');
  }
}

// Create Notion client with error handling
let notion = null;
if (process.env.NOTION_API_KEY) {
  try {
    notion = new Client({
      auth: process.env.NOTION_API_KEY,
      timeoutMs: 10000, // 10 second timeout
    });
  } catch (error) {
    console.error('Failed to initialize Notion client:', error.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

const PODCAST_DATABASE_ID = process.env.NOTION_PODCAST_DATABASE_ID;

module.exports = {
  notion,
  PODCAST_DATABASE_ID
}; 