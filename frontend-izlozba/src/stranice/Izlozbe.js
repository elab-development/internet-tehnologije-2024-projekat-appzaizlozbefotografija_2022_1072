import React, { useState } from 'react';
import './Izlozbe.css';

export default function Izlozbe() {
  const izlozbe = [
    {
      id: 1,
      naziv: 'Izložba 1',
      lokacija: 'Beograd',
      datum: '2025-06-10',
      slika: '/izlozbe1.jpeg'
    },
    {
      id: 2,
      naziv: 'Izložba 2',
      lokacija: 'Novi Sad',
      datum: '2025-07-01',
      slika: '/izlozbe1.jpeg'
    },
    {
      id: 3,
      naziv: 'Izložba 3',
      lokacija: 'Niš',
      datum: '2025-08-15',
      slika: '/izlozbe1.jpeg'
    },
    {
      id: 4,
      naziv: 'Izložba 4',
      lokacija: 'Beograd',
      datum: '2025-06-10',
      slika: '/izlozbe1.jpeg'
    },
    {
      id: 5,
      naziv: 'Izložba 5',
      lokacija: 'Beograd',
      datum: '2025-06-10',
      slika: '/izlozbe1.jpeg'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filtriraneIzlozbe = izlozbe.filter((izl) =>
    izl.naziv.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtriraneIzlozbe.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIzlozbe = filtriraneIzlozbe.slice(startIndex, startIndex + itemsPerPage);

  const handleKlik = () => {
    alert("Morate biti prijavljeni da biste videli detalje izložbe.");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="izlozbe-container">
      <h1 className="naslov-izlozbe">Pregled izložbi</h1>

      <input
        type="text"
        placeholder="Pretraži izložbe po nazivu..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '300px' }}
      />

      <div className="izlozbe-grid">
        {currentIzlozbe.map((izl) => (
          <div key={izl.id} className="izlozba-kartica" onClick={handleKlik}>
            <img src={izl.slika} alt={izl.naziv} className="izlozba-slika" />
            <div className="izlozba-tekst">
              <h2>{izl.naziv}</h2>
              <p>{izl.lokacija}</p>
              <p>{new Date(izl.datum).toLocaleDateString('sr-RS')}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            style={{
              margin: '0 0.25rem',
              padding: '0.5rem 1rem',
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
