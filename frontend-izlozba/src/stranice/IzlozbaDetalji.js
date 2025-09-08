import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import './IzlozbaDetalji.css';
import Button from '../komponente/Button';

export default function IzlozbaDetalji() {
  const { id } = useParams();
  const location = useLocation();

  const [izlozba, setIzlozba] = useState(null);
  const [greska, setGreska] = useState('');
  const [uspeh, setUspeh] = useState('');
  const [prikaziPrijave, setPrikaziPrijave] = useState(false);
  const [prijave, setPrijave] = useState([]);
  const [slikaUrl, setSlikaUrl] = useState(location.state?.slika || null);

  const korisnik = JSON.parse(localStorage.getItem('korisnik'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const ucitaj = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/izlozbe/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIzlozba(res.data);
        setGreska('');
      } catch (err) {
        if (err.response?.status === 401) {
          alert('Morate biti prijavljeni da biste videli detalje izložbe.');
          setGreska('Niste autorizovani.');
        } else {
          console.error('Greška pri dohvatanju izložbe:', err);
          setGreska('Došlo je do greške pri učitavanju izložbe.');
        }
      }
    };

    const ucitajSliku = async () => {
      if (slikaUrl) return;
      try {
        const r1 = await axios.get(`http://localhost:8000/api/izlozbe/${id}/fotografije`);
        const lista1 = Array.isArray(r1.data) ? r1.data : [];
        if (lista1.length) {
          let putanja = lista1[0].putanja_slike;
          if (!/^https?:\/\//i.test(putanja)) putanja = `http://localhost:8000/${putanja}`;
          setSlikaUrl(putanja);
          return;
        }
      } catch (_) { /* fallback niže */ }

      try {
        const r2 = await axios.get('http://localhost:8000/api/fotografije');
        const lista2 = Array.isArray(r2.data) ? r2.data : [];
        const prva = lista2.find(f => String(f.izlozba_id) === String(id));
        if (prva) {
          let putanja = prva.putanja_slike;
          if (!/^https?:\/\//i.test(putanja)) putanja = `http://localhost:8000/${putanja}`;
          setSlikaUrl(putanja);
        }
      } catch (e) {
        console.error('Greška pri dohvatanju fotografija:', e);
      }
    };

    ucitaj();
    ucitajSliku();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const handleRezervacija = async () => {
    if (!korisnik || korisnik.uloga !== 'posetilac' || !token) {
      alert('Morate biti prijavljeni kao posetilac da biste rezervisali mesto.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/prijave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          korisnik_id: korisnik.id,
          izlozba_id: parseInt(id, 10)
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.poruka || data?.message || 'Greška pri rezervaciji.';
        alert(`Greška: ${msg}`);
        return;
      }

      const poruka = data?.poruka || 'Uspešno ste rezervisali mesto! Potvrda je poslata na mejl.';
      alert(poruka);
      setUspeh('Uspešno rezervisano.');

      const novo = Number.isFinite(data?.preostaloMesta)
        ? data.preostaloMesta
        : Math.max((izlozba?.dostupnaMesta ?? 0) - 1, 0);

      setIzlozba(prev => (prev ? { ...prev, dostupnaMesta: novo } : prev));
    } catch (err) {
      console.error(err);
      alert('Greška mreže: ' + err.message);
    }
  };

  const ucitajPrijave = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/izlozbe/${id}/prijave`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrijave(res.data);
    } catch (err) {
      console.error('Greška pri dohvatanju prijava:', err);
    }
  };

  const handleObrisiPrijavu = async (prijavaId) => {
    const potvrda = window.confirm('Da li ste sigurni da želite da obrišete prijavu?');
    if (!potvrda) return;

    try {
      const res = await axios.delete(`http://localhost:8000/api/prijave/${prijavaId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res?.data || {};
      alert(data?.poruka || 'Prijava uspešno obrisana.');

      setPrijave(prev => prev.filter(p => p.id !== prijavaId));

      if (Number.isFinite(data?.preostaloMesta)) {
        setIzlozba(prev => (prev ? { ...prev, dostupnaMesta: data.preostaloMesta } : prev));
      } else {
        setIzlozba(prev => (prev ? { ...prev, dostupnaMesta: (prev.dostupnaMesta ?? 0) + 1 } : prev));
      }
    } catch (err) {
      alert('Greška pri brisanju.');
      console.error(err);
    }
  };

  const togglePrikaziPrijave = () => {
    setPrikaziPrijave(v => {
      const novi = !v;
      if (novi) ucitajPrijave();
      return novi;
    });
  };

  if (greska) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>{greska}</p>;
  if (!izlozba) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Učitavanje...</p>;

  const nemaMesta = (izlozba?.dostupnaMesta ?? 0) <= 0;

  return (
    <div className="detalji-container">
      <div className="detalji-slika">
        {slikaUrl ? (
          <img src={slikaUrl} alt={izlozba?.naziv || 'Naslovna slika'} />
        ) : (
          <div className="placeholder-slika">Nema slike</div>
        )}
      </div>

      <div className="detalji-tekst">
        <h1 className="naslov-izlozbe">{izlozba.naziv}</h1>
        <p className="opis">{izlozba.opis}</p>

        <p className="lokacija">
          <strong>Lokacija:</strong>
          <span> {izlozba.lokacija}</span>
        </p>

        <p className="datum">
          <strong>Datum:</strong>
          <span> {new Date(izlozba.datum).toLocaleDateString('sr-RS')}</span>
        </p>

        <p className="slobodna-mesta">
          <strong>Broj slobodnih mesta:</strong>
          <span> {izlozba?.dostupnaMesta ?? 0}</span>
        </p>

        {nemaMesta && <p style={{ color: 'crimson' }}>Nema više slobodnih mesta.</p>}

        {korisnik?.uloga === 'posetilac' && (
          <div className="dugme-rezervacija">
            <Button
              text="Rezerviši svoje mesto"
              onClick={handleRezervacija}
              disabled={nemaMesta}
            />
          </div>
        )}

        {korisnik?.uloga === 'administrator' && (
          <div className="dugme-rezervacija">
            <Button
              text={prikaziPrijave ? 'Sakrij prijave' : 'Prikaži sve prijave'}
              onClick={togglePrikaziPrijave}
            />
          </div>
        )}

        {uspeh && <p style={{ color: 'green', marginTop: '1rem' }}>{uspeh}</p>}

        {prikaziPrijave && korisnik?.uloga === 'administrator' && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Prijave za izložbu:</h3>
            {prijave.length === 0 ? (
              <p>Nema prijava.</p>
            ) : (
              <ul>
                {prijave.map((prijava) => (
                  <li key={prijava.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>
                      {prijava.korisnik?.ime} ({prijava.korisnik?.email})
                    </span>
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
