import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../komponente/Button'; 
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const korisnik = localStorage.getItem('korisnik') ? JSON.parse(localStorage.getItem('korisnik')) : null;

  const handleLogout = () => {
    fetch('http://127.0.0.1:8000/api/odjava', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).finally(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('uloga');
      localStorage.removeItem('korisnik');
      navigate('/prijava');
      window.location.reload();
    });
  };

  const links = [
    { text: 'Početna', path: '/' },
    { text: 'Izložbe', path: '/izlozbe' },
    { text: 'Galerija', path: '/galerija' },
    ...(token ? [] : [
      { text: 'Prijava', path: '/prijava' },
      { text: 'Registracija', path: '/registracija' }
    ])
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

      {korisnik && (
        <div className="navbar-right">
          <span className="user-greeting">Zdravo, {korisnik.ime}!</span>
          <Button text="Odjava" onClick={handleLogout} variant="primary" />
        </div>
      )}
    </nav>
  );
}
