import React from 'react';
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
      id: 1,
      naziv: 'Izložba 4',
      lokacija: 'Beograd',
      datum: '2025-06-10',
      slika: '/izlozbe1.jpeg'
     
      
    },
    {
      id: 1,
      naziv: 'Izložba 5',
      lokacija: 'Beograd',
      datum: '2025-06-10',
      slika: '/izlozbe1.jpeg'
      
      
    },
  ];

  const handleKlik = () => {
    alert("Morate biti prijavljeni da biste videli detalje izložbe.");
  };

  return (
    <div className="izlozbe-container">
      <h1 className='naslov-izlozbe'>Pregled izložbi</h1>
      <div className="izlozbe-grid">
        {izlozbe.map((izl) => (
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
    </div>
  );
}
