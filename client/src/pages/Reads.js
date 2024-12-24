import React, { useState, useEffect } from 'react';
import './Reads.css';

const Reads = () => {
  const [reads, setReads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReads = async () => {
      try {
        const response = await fetch('/api/reads');
        if (!response.ok) throw new Error('Failed to fetch reads');
        const data = await response.json();
        setReads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReads();
  }, []);

  const handleRowClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  if (loading) return <div className="content-item">Loading...</div>;
  if (error) return <div className="content-item">Error: {error}</div>;

  return (
    <>
      <h2 className="section-header">Reads</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table className="reads-table">
          <thead>
            <tr className="reads-header">
              <th className="reads-cell">Title</th>
              <th className="reads-cell">Author</th>
              <th className="reads-cell">Publication</th>
              <th className="reads-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {reads.map((read) => (
              <tr 
                key={read.id} 
                className="reads-row"
                onClick={() => handleRowClick(read.url)}
                style={{ cursor: read.url ? 'pointer' : 'default' }}
              >
                <td className="reads-cell">{read.title}</td>
                <td className="reads-cell">{read.author}</td>
                <td className="reads-cell">{read.publication}</td>
                <td className="reads-cell">
                  {new Date(read.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reads;
