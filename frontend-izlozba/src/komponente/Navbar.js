import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo"></h2>
      <ul className="nav-links">
        <li><Link to="/">Početna</Link></li>
        <li><Link to="/izlozbe">Izložbe</Link></li>
        <li><Link to="/galerija">Galerija</Link></li>
        <li><Link to="/prijava">Prijava</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
