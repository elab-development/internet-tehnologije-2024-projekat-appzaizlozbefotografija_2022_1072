import React from 'react';
import './Galerija.css';
import Button from '../komponente/Button';

export default function Galerija() {
  const fotografije = [
    {
      id: 1,
      naziv: 'Fotografija 1',
      izlozba: 'Izlozba 1',
      slika: '/galerija1.jpeg',
    },
    {
      id: 2,
      naziv: 'Fotografija 2',
      izlozba: 'Izlozba 1',
      slika: '/galerija1.jpeg',
    },
    {
      id: 3,
      naziv: 'Fotografija 3',
      izlozba: 'Izlozba 2',
      slika: '/galerija1.jpeg',
    },
    {
      id: 4,
      naziv: 'Fotografija 4',
      izlozba: 'Izlozba 4',
      slika: '/galerija1.jpeg',
    },
    {
      id: 5,
      naziv: 'Fotografija 5',
      izlozba: 'Izlzoba 5',
      slika: '/galerija1.jpeg',
    }
  ];

  const korisnik = { uloga: 'fotograf' };

  return (
    <div className="galerija-wrapper">
      <h1 className="naslov-izlozbe">Pregled fotografija</h1>


      {korisnik.uloga === 'fotograf' && (
        <div className="galerija-dugmad-horizontalno">
          <Button text="Dodaj fotografiju" onClick={() => alert("Dodaj")} />
          <Button text="Obriši fotografiju" onClick={() => alert("Obriši")} />

        </div>
      )}

      <div className="galerija-grid">
        {fotografije.map((foto) => (
          <div key={foto.id} className="galerija-item">
            <img src={foto.slika} alt={foto.naziv} className="galerija-slika" />
            <div className="galerija-opis">
              <p className="naziv-fotografije">{foto.naziv}</p>
              <p className="naziv-izlozbe">{foto.izlozba}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
