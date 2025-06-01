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
  const [prikaziPrijave, setPrikaziPrijave] = useState(false);
  const [prijave, setPrijave] = useState([]);

  const korisnik = JSON.parse(localStorage.getItem('korisnik'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/izlozbe/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
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
  }, [id, token]);

  const handleRezervacija = () => {
    if (!korisnik || korisnik.uloga !== 'posetilac' || !token) {
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
      .then(() => {
        alert('Uspešno ste rezervisali mesto! Potvrda je poslata na mejl.');
        setUspeh('Uspešno rezervisano.');
      })
      .catch(err => {
        console.error(err);
        alert('Greška: ' + err.message);
      });
  };

  const ucitajPrijave = () => {
    axios.get(`http://localhost:8000/api/izlozbe/${id}/prijave`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setPrijave(res.data))
      .catch(err => console.error('Greška pri dohvatanju prijava:', err));
  };

  const handleObrisiPrijavu = async (prijavaId) => {
    const potvrda = window.confirm('Da li ste sigurni da želite da obrišete prijavu?');
    if (!potvrda) return;

    try {
      await axios.delete(`http://localhost:8000/api/prijave/${prijavaId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Prijava uspešno obrisana.');
      ucitajPrijave();
    } catch (err) {
      alert('Greška pri brisanju.');
      console.error(err);
    }
  };

  const togglePrikaziPrijave = () => {
    setPrikaziPrijave(!prikaziPrijave);
    if (!prikaziPrijave) ucitajPrijave();
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

        {korisnik?.uloga === 'posetilac' && (
          <Button text="Rezerviši svoje mesto" onClick={handleRezervacija} />
        )}

        {korisnik?.uloga === 'administrator' && (
          <Button text={prikaziPrijave ? "Sakrij prijave" : "Prikaži sve prijave"} onClick={togglePrikaziPrijave} />
        )}

        {uspeh && <p style={{ color: 'green', marginTop: '1rem' }}>{uspeh}</p>}

        {prikaziPrijave && korisnik?.uloga === 'administrator' && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Prijave za izložbu:</h3>
            {prijave.length === 0 ? (
              <p>Nema prijava.</p>
            ) : (
              <ul>
                {prijave.map(prijava => (
                  <li key={prijava.id}>
                    <span>{prijava.korisnik?.ime} ({prijava.korisnik?.email})</span>
                    <Button text="Obriši" onClick={() => handleObrisiPrijavu(prijava.id)} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
