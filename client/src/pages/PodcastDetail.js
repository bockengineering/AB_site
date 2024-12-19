import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PodcastDetail.css';

const PodcastDetail = () => {
  const [podcastData, setPodcastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPodcastNotes = async () => {
      try {
        const response = await fetch(`/api/podcasts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch podcast notes');
        const data = await response.json();
        setPodcastData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastNotes();
  }, [id]);

  const renderMetadata = (metadata) => {
    return (
      <div className="podcast-metadata">
        {metadata.icon?.type === 'emoji' ? (
          <div className="podcast-icon">{metadata.icon.emoji}</div>
        ) : metadata.icon?.type === 'file' || metadata.icon?.type === 'external' ? (
          <img 
            src={metadata.icon.type === 'file' ? metadata.icon.file.url : metadata.icon.external.url}
            alt=""
            className="podcast-icon"
          />
        ) : null}
        <div className="podcast-info">
          <h1 className="podcast-title">{metadata.title}</h1>
          <div className="podcast-details">
            <span className="podcast-show">{metadata.show}</span>
            {metadata.date && (
              <span className="podcast-date">
                {new Date(metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderBlock = (block) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case 'heading_1':
        if (value.rich_text[0].plain_text.toLowerCase() === "episode show notes") {
          return (
            <details key={id} className="episode-notes">
              <summary>
                <span>▸ Episode show notes</span>
              </summary>
              {block.children && (
                <div className="episode-content">
                  {block.children.map(child => renderBlock(child))}
                </div>
              )}
            </details>
          );
        }
        if (value.rich_text[0].plain_text.toLowerCase() === "your snips") {
          return (
            <h1 key={id} className="podcast-heading-1">
              Your Snips
            </h1>
          );
        }
        return null;

      case 'heading_3':
        if (value.rich_text[0].plain_text.match(/\[\d{2}:\d{2}\]/)) {
          const timestamp = value.rich_text[0].plain_text;
          const title = value.rich_text[1]?.plain_text || '';
          
          return (
            <details key={id} className="timestamp-section">
              <summary>
                <span className="timestamp-wrapper">
                  ▸ {timestamp}
                  {title && <span className="timestamp-title">{title}</span>}
                </span>
              </summary>
              {block.children && (
                <div className="timestamp-content">
                  {block.children.map(child => renderBlock(child))}
                </div>
              )}
            </details>
          );
        }
        return null;

      case 'paragraph':
        if (value.rich_text.length === 0) return null;
        const text = value.rich_text[0].plain_text;
        
        if (text.includes('Play snip')) {
          return (
            <div key={id} className="play-snip">
              {text}
            </div>
          );
        }

        return (
          <p key={id} className="podcast-paragraph">
            {text}
          </p>
        );

      case 'bulleted_list_item':
        return (
          <li key={id} className="podcast-list-item">
            {value.rich_text[0].plain_text}
          </li>
        );

      case 'toggle':
        const toggleText = value.rich_text[0].plain_text;
        if (toggleText.includes('Transcript')) {
          return (
            <details key={id} className="podcast-toggle transcript">
              <summary>
                {toggleText}
              </summary>
              {block.children && (
                <div className="toggle-content">
                  {block.children.map(child => renderBlock(child))}
                </div>
              )}
            </details>
          );
        }
        return null;

      default:
        return null;
    }
  };

  if (loading) return <div className="content-item">Loading...</div>;
  if (error) return <div className="content-item">Error: {error}</div>;
  if (!podcastData) return <div className="content-item">No data found</div>;

  const { metadata, content } = podcastData;

  return (
    <div className="podcast-detail">
      <div className="content-item">
        {renderMetadata(metadata)}
        <div className="podcast-content">
          {content.results.map((block) => renderBlock(block))}
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail; 