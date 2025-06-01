import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Izlozbe.css';
import InputField from '../komponente/InputField';
import Button from '../komponente/Button';
import useKorisnik from '../hooks/useKorisnik';
import { useNavigate } from 'react-router-dom';

export default function Izlozbe() {
  const [izlozbe, setIzlozbe] = useState([]);
  const [fotografije, setFotografije] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const korisnik = useKorisnik();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [naziv, setNaziv] = useState('');
  const [lokacija, setLokacija] = useState('');
  const [datum, setDatum] = useState('');
  const [opis, setOpis] = useState('');
  const [dostupnaMesta, setDostupnaMesta] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    ucitajIzlozbe();
    axios.get('http://localhost:8000/api/fotografije')
      .then(res => setFotografije(res.data))
      .catch(err => console.error("Greška pri dohvatanju fotografija:", err));
  }, []);

  const ucitajIzlozbe = () => {
    axios.get('http://localhost:8000/api/izlozbe')
      .then(res => setIzlozbe(res.data.data))
      .catch(err => console.error("Greška pri dohvatanju izložbi:", err));
  };

  const handleDodaj = async () => {
    const formData = new FormData();
    formData.append('naziv', naziv);
    formData.append('lokacija', lokacija);
    formData.append('datum', datum);
    formData.append('opis', opis);
    formData.append('dostupnaMesta', dostupnaMesta);
    if (file) {
      formData.append('naslovna_slika', file);
    }

    try {
      await axios.post('http://localhost:8000/api/izlozbe', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Izložba uspešno dodata!');
      setShowForm(false);
      setNaziv('');
      setLokacija('');
      setDatum('');
      setOpis('');
      setDostupnaMesta('');
      setFile(null);
      ucitajIzlozbe();
    } catch (err) {
      alert('Greška pri dodavanju izložbe.');
      console.error(err);
    }
  };

  const handleObrisi = async (id) => {
    const potvrda = window.confirm('Da li ste sigurni da želite da obrišete izložbu?');
    if (!potvrda) return;

    try {
      await axios.delete(`http://localhost:8000/api/izlozbe/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Izložba obrisana.');
      ucitajIzlozbe();
    } catch (err) {
      alert('Greška pri brisanju.');
      console.error(err);
    }
  };

  const filtriraneIzlozbe = izlozbe.filter((izl) =>
    izl.naziv.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtriraneIzlozbe.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIzlozbe = filtriraneIzlozbe.slice(startIndex, startIndex + itemsPerPage);

  const getNaslovnaSlika = (izlozbaId) => {
    const foto = fotografije.find(f => f.izlozba_id === izlozbaId);
    return foto ? foto.putanja_slike : null;
  };

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

      {korisnik?.uloga === 'administrator' && (
        <div className="izlozbe-dugmad-horizontalno">
          <Button text="Dodaj izložbu" onClick={() => setShowForm(true)} />
        </div>
      )}

      {showForm && (
        <div className="modal-container">
          <div className="overlay" onClick={() => setShowForm(false)}></div>
          <div className="modal-forma" onClick={(e) => e.stopPropagation()}>
            <h3>Dodaj novu izložbu</h3>
            <input type="text" placeholder="Naziv" value={naziv} onChange={e => setNaziv(e.target.value)} />
            <input type="text" placeholder="Lokacija" value={lokacija} onChange={e => setLokacija(e.target.value)} />
            <input type="date" value={datum} onChange={e => setDatum(e.target.value)} />
            <input type="text" placeholder="Opis (opciono)" value={opis} onChange={e => setOpis(e.target.value)} />
            <input type="number" placeholder="Dostupna mesta" value={dostupnaMesta} onChange={e => setDostupnaMesta(e.target.value)} />
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <div style={{ marginTop: '10px' }}>
              <Button text="Pošalji" onClick={handleDodaj} />
              <Button text="Otkaži" onClick={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="izlozbe-grid">
        {currentIzlozbe.map((izl) => {
          const naslovnaSlika = getNaslovnaSlika(izl.id);
          return (
            <div key={izl.id} className="izlozba-kartica" onClick={() => handleKlikNaIzlozbu(izl.id)}>
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
                {korisnik?.uloga === 'administrator' && (
                  <Button text="Obriši" onClick={(e) => {
                    e.stopPropagation();
                    handleObrisi(izl.id);
                  }} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="paginacija-strelice">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="strelica-levo">‹</button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="strelica-desno">›</button>
      </div>
    </div>
  );
}
