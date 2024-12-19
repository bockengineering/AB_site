import React, { useState, useEffect } from 'react';
import config from '../utils/config';

function Reads() {
  const [reads, setReads] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `${config.apiUrl}/api/reads`;
    console.log('Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setReads(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reads:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <h2 className="section-header">Reads</h2>
      <table className="reads-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reads.map((article, index) => (
            <tr key={index}>
              <td>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
              </td>
              <td>{article.author}</td>
              <td>{article.publication}</td>
              <td>{formatDate(article.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Reads;
