import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="menu">
      <Link to="/" className="menu-item">Home</Link>
      <Link to="/projects" className="menu-item">Projects</Link>
      <Link to="/reads" className="menu-item">Reads</Link>
      <Link to="/writing" className="menu-item">Writing</Link>
      <Link to="/listens" className="menu-item">Listens</Link>
    </nav>
  );
}

export default Menu; 