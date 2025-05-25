import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './IzlozbaDetalji.css';
import Button from '../komponente/Button';

export default function IzlozbaDetalji() {
  const { id } = useParams();
  const [izlozba, setIzlozba] = useState(null);
  const [greska, setGreska] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/izlozbe/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setIzlozba(res.data);
        setGreska('');
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          alert('Morate biti prijavljeni da biste videli detalje izložbe.');
          setGreska('Niste autorizovani.');
        } else {
          console.error("Greška pri dohvatanju izložbe:", err);
          setGreska('Došlo je do greške pri učitavanju izložbe.');
        }
      });
  }, [id]);

  if (greska) return null;
  if (!izlozba) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Učitavanje...</p>;

  return (
    <div className="detalji-container">
      <div className="detalji-tekst">
        <h1 className="naslov-izlozbe">{izlozba.naziv}</h1>
        <p className="opis">{izlozba.opis}</p>
        <p><strong>Lokacija:</strong> {izlozba.lokacija}</p>
        <p><strong>Datum:</strong> {new Date(izlozba.datum).toLocaleDateString('sr-RS')}</p>
        <Button
          text="Rezerviši svoje mesto"
          onClick={() => alert('Prijava')}
        />
      </div>
    </div>
  );
}
