import React, { useState } from 'react';
import './Galerija.css';
import Button from '../komponente/Button';
import useKorisnik from '../hooks/useKorisnik'; // NOVO

export default function Galerija() {
  const korisnik = useKorisnik(); // NOVO

  const sveFotografije = [
    {
      id: 1,
      naziv: 'Fotografija 1',
      izlozba: 'Izložba 1',
      slika: '/galerija1.jpeg',
    },
    {
      id: 2,
      naziv: 'Fotografija 2',
      izlozba: 'Izložba 1',
      slika: '/galerija1.jpeg',
    },
    {
      id: 3,
      naziv: 'Fotografija 3',
      izlozba: 'Izložba 2',
      slika: '/galerija1.jpeg',
    },
    {
      id: 4,
      naziv: 'Fotografija 4',
      izlozba: 'Izložba 4',
      slika: '/galerija1.jpeg',
    },
    {
      id: 5,
      naziv: 'Fotografija 5',
      izlozba: 'Izložba 5',
      slika: '/galerija1.jpeg',
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(sveFotografije.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFotografije = sveFotografije.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="galerija-wrapper">
      <h1 className="galerija-naslov">Pregled fotografija</h1>

      {korisnik?.uloga === 'fotograf' && (
        <div className="galerija-dugmad-horizontalno">
          <Button text="Dodaj fotografiju" onClick={() => alert("Dodaj")} />
          <Button text="Obriši fotografiju" onClick={() => alert("Obriši")} />
        </div>
      )}

      <div className="galerija-grid">
        {currentFotografije.map((foto) => (
          <div key={foto.id} className="galerija-item">
            <img src={foto.slika} alt={foto.naziv} className="galerija-slika" />
            <div className="galerija-opis">
              <p className="naziv-fotografije">{foto.naziv}</p>
              <p className="naziv-izlozbe">{foto.izlozba}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="paginacija-strelice">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="strelica-levo"
        >
          ‹
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="strelica-desno"
        >
          ›
        </button>
      </div>
    </div>
  );
}
