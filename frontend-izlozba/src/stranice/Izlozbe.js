import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Izlozbe.css';
import InputField from '../komponente/InputField';
import { useNavigate } from 'react-router-dom';

export default function Izlozbe() {
  const [izlozbe, setIzlozbe] = useState([]);
  const [fotografije, setFotografije] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/izlozbe')
      .then(res => {
        setIzlozbe(res.data.data);
      })
      .catch(err => {
        console.error("Greška pri dohvatanju izložbi:", err);
      });

    axios.get('http://localhost:8000/api/fotografije')
      .then(res => {
        setFotografije(res.data);
      })
      .catch(err => {
        console.error("Greška pri dohvatanju fotografija:", err);
      });
  }, []);

  // Filtriranje po nazivu izložbe
  const filtriraneIzlozbe = izlozbe.filter((izl) =>
    izl.naziv.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginacija
  const totalPages = Math.ceil(filtriraneIzlozbe.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIzlozbe = filtriraneIzlozbe.slice(startIndex, startIndex + itemsPerPage);

  // Pronalazak naslovne slike po nazivu fotografije
  const getNaslovnaSlika = (izlozbaId) => {
    if (izlozbaId === 1) {
      const lampioni = fotografije.find(f => f.naziv === "Lampioni iznad Valete");
      return lampioni ? lampioni.putanja_slike : null;
    } else if (izlozbaId === 2) {
      const kapadokija = fotografije.find(f => f.naziv === "Kapadokijska stena");
      return kapadokija ? kapadokija.putanja_slike : null;
    }
    return null;
  };

  // Promena strane
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Klik na karticu izložbe
  const handleKlikNaIzlozbu = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Morate biti prijavljeni da biste videli detalje izložbe.");
    } else {
      navigate(`/izlozbe/${id}`);
    }
  };

  return (
    <div className="izlozbe-container">
      <h1 className="naslov-izlozbe">Pregled izložbi</h1>

      <InputField
        type="text"
        placeholder="Pretraži izložbe po nazivu..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="izlozbe-grid">
        {currentIzlozbe.map((izl) => {
          const naslovnaSlika = getNaslovnaSlika(izl.id);

          return (
            <div
              key={izl.id}
              className="izlozba-kartica"
              onClick={() => handleKlikNaIzlozbu(izl.id)}
            >
              {naslovnaSlika ? (
                <img
                  src={`http://localhost:8000/storage/${naslovnaSlika}`}
                  alt={izl.naziv}
                  className="izlozba-slika"
                />
              ) : (
                <div className="placeholder-slika">Nema slike</div>
              )}
              <div className="izlozba-tekst">
                <h2>{izl.naziv}</h2>
                <p>{izl.lokacija}</p>
                <p>{new Date(izl.datum).toLocaleDateString('sr-RS')}</p>
              </div>
            </div>
          );
        })}
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
