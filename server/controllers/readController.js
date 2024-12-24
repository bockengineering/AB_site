const { notion } = require('../config/notion');

const READS_DATABASE_ID = "162d90c26114807e83d8f3f3eaa3c1d2";

const getReads = async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: READS_DATABASE_ID,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    const reads = await Promise.all(response.results.map(async page => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: properties['Article Name']?.title[0]?.plain_text || '',
        date: properties.Date?.date?.start || '',
        author: properties.Author?.rich_text[0]?.plain_text || '',
        publication: properties.Publication?.rich_text[0]?.plain_text || '',
        url: properties.URL?.url || '',
      };
    }));

    res.json(reads);
  } catch (error) {
    console.error('Error fetching reads:', error);
    res.status(500).json({ error: 'Failed to fetch reads' });
  }
};

module.exports = {
  getReads
}; 