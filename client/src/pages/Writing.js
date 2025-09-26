import React from 'react';

function Writing() {
  const writings = [
    {
      type: 'substack',
      title: 'State of Venture: Q3 2024',
      author: 'Alex Bock',
      url: 'https://alexbock.substack.com/p/state-of-venture-q3-2024'
    }
  ];

  return (
    <>
      <h2 className="section-header">Writing</h2>
      <div className="content-section">
        {writings.map((post, index) => (
          <div key={index} className="content-item">
            <h3 className="listen-title">{post.title}</h3>
            <div className="listen-subtitle">by {post.author}</div>
            <a 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="article-link"
            >
              Read on Substack
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default Writing;
