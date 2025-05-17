import React from 'react';
import './IzlozbaDetalji.css';
import Button from '../komponente/Button';

export default function IzlozbaDetalji() {
  const izlozba = {
    naziv: 'Izložba 1',
    opis: 'Ova izložba prikazuje svetlost kroz uličnu umetnost malih gradova.',
    lokacija: 'Galerija ŠTAB, Beograd',
    datum: '20.06.2025.',
    vreme: '19:00',
    slika: '/izlozbe1.jpeg',
  };

  return (
    <div className="detalji-container">
      <div className="detalji-tekst">
        <div>
          <h1 className="naslov-izlozbe">{izlozba.naziv}</h1>
          <p className="opis">{izlozba.opis}</p>
          <p><strong>Lokacija:</strong> {izlozba.lokacija}</p>
          <p><strong>Datum i vreme:</strong> {izlozba.datum} u {izlozba.vreme}</p>
        </div>

        <Button
          text="Rezerviši svoje mesto"
          className="prijava-dugme"
          onClick={() => alert('Prijava')}
        />
      </div>

      <div className="detalji-slika">
        <img src={izlozba.slika} alt={izlozba.naziv} />
      </div>
    </div>
  );
}
