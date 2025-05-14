import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { text: 'Početna', path: '/' },
    { text: 'Izložbe', path: '/izlozbe' },
    { text: 'Galerija', path: '/galerija' },
    { text: 'Prijava', path: '/prijava' },
  ];

  return (
    <nav className="custom-navbar">
      <div className="navbar-left">
        {links
          .filter(link => link.path !== pathname)
          .map((link, index, arr) => (
            <React.Fragment key={link.path}>
              <Link to={link.path}>{link.text}</Link>
              {index < arr.length - 1 && <span className="separator">|</span>}
            </React.Fragment>
          ))}
      </div>
    </nav>
  );
}
