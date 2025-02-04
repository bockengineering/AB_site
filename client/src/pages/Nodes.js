import React from 'react';

function Nodes() {
  const nodes = [
    {
      title: "Nuclear Renaissance",
      subtitle: "Nuclear Power Is Making a Comeback: Background and New Tech.",
      heptabaseUrl: "https://app.heptabase.com/w/0570b1a0a8d845fa4588bfec2ae780471d7edacb33ee8bd69e38800e383c0b09?id=bc38ab97-4653-4946-921c-71c23bd3344b",
    },
    // Add more nodes here as you create them
  ];

  return (
    <div className="content-section">
      <h2 className="nodes-title" style={{ gridColumn: '1 / -1' }}>Nodes</h2>
      {nodes.map((node, index) => (
        <div key={index} className="content-item">
          <a
            href={node.heptabaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="article-link"
          >
            <div className="node-item">
              <h3 className="node-title">{node.title}</h3>
              <p className="node-subtitle">{node.subtitle}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Nodes; 