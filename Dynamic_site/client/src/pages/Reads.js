import React from 'react';

function Reads() {
  const reads = [
    {
      title: "The Future of AI",
      author: "John Doe",
      publication: "Tech Review",
      description: "An in-depth look at artificial intelligence trends",
      date: "2024-03-15",
      link: "https://example.com/article1"
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <h2>What I'm Reading:</h2>
      <ul className="reads-list">
        {reads.map((article, index) => (
          <li key={index} className="article-box">
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="article-link">
              <h3>{article.title}</h3>
              <p className="article-meta">By {article.author} in {article.publication}</p>
              <p className="article-description">{article.description}</p>
              <p className="article-date">{formatDate(article.date)}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reads;
