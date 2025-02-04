import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <ul className="menu">
      <li>
        <Link to="/" className={`menu-link ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="menu-number">01</span>ABOUT ME
        </Link>
      </li>
      <li>
        <Link to="/nodes" className={`menu-link ${location.pathname === '/nodes' ? 'active' : ''}`}>
          <span className="menu-number">02</span>NODES
        </Link>
      </li>
      <li>
        <Link to="/projects" className={`menu-link ${location.pathname === '/projects' ? 'active' : ''}`}>
          <span className="menu-number">03</span>PROJECTS
        </Link>
      </li>
      <li>
        <Link to="/reads" className={`menu-link ${location.pathname === '/reads' ? 'active' : ''}`}>
          <span className="menu-number">04</span>READS
        </Link>
      </li>
      <li>
        <Link to="/writing" className={`menu-link ${location.pathname === '/writing' ? 'active' : ''}`}>
          <span className="menu-number">05</span>WRITING
        </Link>
      </li>
      <li>
        <Link to="/listens" className={`menu-link ${location.pathname === '/listens' ? 'active' : ''}`}>
          <span className="menu-number">06</span>LISTENS
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
