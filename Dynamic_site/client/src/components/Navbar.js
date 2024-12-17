import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul className="menu">
        <li>
          <NavLink to="/" end>
            <span className="menu-number">01</span>
            <span className="menu-text">Projects</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/reads">
            <span className="menu-number">02</span>
            <span className="menu-text">Reads</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/writing">
            <span className="menu-number">03</span>
            <span className="menu-text">Writing</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/listens">
            <span className="menu-number">04</span>
            <span className="menu-text">Listens</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
