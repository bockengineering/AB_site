import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul className="menu">
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            <span className="menu-number">01</span>
            <span className="menu-text">About Me</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/thesis"
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            <span className="menu-number">02</span>
            <span className="menu-text">Thesis</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            <span className="menu-number">03</span>
            <span className="menu-text">Projects</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/reads"
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            <span className="menu-number">04</span>
            <span className="menu-text">Reads</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/writing"
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            <span className="menu-number">05</span>
            <span className="menu-text">Writing</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/listens"
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            <span className="menu-number">06</span>
            <span className="menu-text">Listens</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
