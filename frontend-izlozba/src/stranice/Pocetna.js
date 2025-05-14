import React from 'react';
import './Pocetna.css';

export default function Pocetna() {
  return (
    <div
      className="pozadina"
      style={{ backgroundImage: "url('/pocetna5.jpeg')" }} 
    >
      <div className="blur-sloj"></div>
      <div className="naslov">
        <h1>Dobrodošli u svet objektiva</h1>
      </div>
    </div>
  );
}
