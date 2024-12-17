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
    <div>
      <h2>Writing</h2>
      <ul className="writing-list">
        {writings.map((post, index) => (
          <li key={index} className="article-box">
            <div className="substack-post-embed">
              <p lang="en">{post.title} by {post.author}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" data-post-link>
                Read on Substack
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Writing;
