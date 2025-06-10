import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

export default function Breadcrumbs() {
  const location = useLocation();

  const ruta = location.pathname.split('/').filter(Boolean);

  const buildPath = (index) => '/' + ruta.slice(0, index + 1).join('/');

  const nazivStranica = {
    pocetna: 'Početna',
    izlozbe: 'Izložbe',
    galerija: 'Galerija',
    prijava: 'Prijava',
    registracija: 'Registracija',
  };

  return (
    <nav className="breadcrumbs">
      <Link to="/">Početna</Link>
      {ruta.map((segment, index) => {
        const path = buildPath(index);
        const naslov = nazivStranica[segment] || (segment.charAt(0).toUpperCase() + segment.slice(1));

        return (
          <span key={path}>
            {' > '}
            {index === ruta.length - 1 ? (
              <span>{naslov}</span>
            ) : (
              <Link to={path}>{naslov}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
