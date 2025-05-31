import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './IzlozbaDetalji.css';
import Button from '../komponente/Button';

export default function IzlozbaDetalji() {
  const { id } = useParams();
  const [izlozba, setIzlozba] = useState(null);
  const [greska, setGreska] = useState('');
  const [uspeh, setUspeh] = useState('');

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

  const handleRezervacija = () => {
    const token = localStorage.getItem('token');
    const korisnik = JSON.parse(localStorage.getItem('korisnik'));

    if (!korisnik || !token) {
      alert('Morate biti prijavljeni kao posetilac da biste rezervisali mesto.');
      return;
    }

    fetch('http://localhost:8000/api/prijave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        korisnik_id: korisnik.id,
        izlozba_id: parseInt(id)
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Greška pri rezervaciji.');
        return res.json();
      })
      .then(data => {
        alert('Uspešno ste rezervisali mesto! Potvrda je poslata na mejl.');
        setUspeh('Uspešno rezervisano.');
      })
      .catch(err => {
        console.error(err);
        alert('Greška: ' + err.message);
      });
  };

  if (greska) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>{greska}</p>;
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
          onClick={handleRezervacija}
        />
        {uspeh && <p style={{ color: 'green', marginTop: '1rem' }}>{uspeh}</p>}
      </div>
    </div>
  );
}
