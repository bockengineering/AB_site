const { notion, PODCAST_DATABASE_ID } = require('../config/notion');

// Add error checking for environment variables
if (!PODCAST_DATABASE_ID) {
  throw new Error('NOTION_PODCAST_DATABASE_ID is not defined in environment variables');
}

// Clean the database ID by removing any query parameters
const cleanDatabaseId = PODCAST_DATABASE_ID.split('?')[0];

// First get database structure
const getDatabaseStructure = async () => {
  try {
    const response = await notion.databases.retrieve({
      database_id: cleanDatabaseId
    });
    console.log('Database structure:', response.properties);
    return response.properties;
  } catch (error) {
    console.error('Error retrieving database structure:', error);
    throw error;
  }
};

const getBlockChildren = async (blockId) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100, // Get maximum number of blocks
    });

    const blocks = response.results;
    
    // Recursively get children for each block that has children
    const blocksWithChildren = await Promise.all(
      blocks.map(async (block) => {
        if (block.has_children) {
          // Get the children of this block
          const children = await getBlockChildren(block.id);
          // Return the block with its children attached
          return {
            ...block,
            children
          };
        }
        return block;
      })
    );

    return blocksWithChildren;
  } catch (error) {
    console.error('Error getting block children:', error);
    throw error;
  }
};

const getPodcasts = async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: cleanDatabaseId,
      sorts: [
        {
          property: 'Last edit date',
          direction: 'descending',
        },
      ],
    });

    const podcasts = await Promise.all(response.results.map(async page => {
      const pageDetails = await notion.pages.retrieve({ page_id: page.id });
      const properties = page.properties;
      
      return {
        id: page.id,
        title: properties.Episode?.title[0]?.plain_text || '',
        date: properties['Episode publish date']?.date?.start || '',
        show: properties.Show?.rich_text[0]?.plain_text || '',
        notes: properties.Warning?.rich_text[0]?.plain_text || '',
        link: properties['Episode Link']?.url || '',
        showNotesLink: properties['Show notes link']?.url || '',
        snips: properties.Snips?.number || 0,
        icon: pageDetails.icon?.type === 'emoji' ? 
          { type: 'emoji', emoji: pageDetails.icon.emoji } :
          pageDetails.icon?.type === 'file' ? 
          { type: 'file', url: pageDetails.icon.file.url } :
          pageDetails.icon?.type === 'external' ?
          { type: 'external', url: pageDetails.icon.external.url } :
          null
      };
    }));

    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch podcasts' });
  }
};

const getPodcastNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await notion.pages.retrieve({ page_id: id });
    const blocks = await getBlockChildren(id);
    
    // Get metadata from page properties
    const metadata = {
      title: page.properties.Episode?.title[0]?.plain_text || '',
      date: page.properties['Episode publish date']?.date?.start || '',
      show: page.properties.Show?.rich_text[0]?.plain_text || '',
      icon: page.icon
    };

    res.json({
      metadata,
      content: { results: blocks }
    });
  } catch (error) {
    console.error('Error in getPodcastNotes:', error);
    res.status(500).json({ error: 'Failed to fetch podcast notes' });
  }
};

module.exports = {
  getPodcasts,
  getPodcastNotes
}; 