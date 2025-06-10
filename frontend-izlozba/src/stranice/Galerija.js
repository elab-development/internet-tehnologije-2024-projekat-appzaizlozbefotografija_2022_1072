import React, { useState, useEffect } from 'react';
import './Galerija.css';
import Button from '../komponente/Button';
import useKorisnik from '../hooks/useKorisnik';
import axios from 'axios';
import Breadcrumbs from '../komponente/Breadcrumbs';

export default function Galerija() {
  const korisnik = useKorisnik();

  const [sveFotografije, setSveFotografije] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(sveFotografije.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFotografije = sveFotografije.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [showForm, setShowForm] = useState(false);
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [izlozbaId, setIzlozbaId] = useState('');
  const [file, setFile] = useState(null);

  const ucitajFotografije = () => {
    axios.get('http://localhost:8000/api/fotografije')
      .then(res => setSveFotografije(res.data))
      .catch(err => console.error('Greška pri dohvatanju fotografija:', err));
  };

  useEffect(() => {
    ucitajFotografije();
  }, []);

  const handleDodaj = async () => {
    const formData = new FormData();
    formData.append('naziv', naziv);
    formData.append('opis', opis);
    formData.append('izlozba_id', izlozbaId);
    if (file) {
      formData.append('slika', file);
    }

    try {
      await fetch('http://localhost:8000/api/fotografije', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      alert('Fotografija uspešno dodata!');
      setShowForm(false);
      setNaziv('');
      setOpis('');
      setIzlozbaId('');
      setFile(null);
      ucitajFotografije();
    } catch (err) {
      alert('Greška pri dodavanju fotografije.');
      console.error(err);
    }
  };

  const handleObrisi = async (id) => {
    const potvrda = window.confirm('Da li ste sigurni da želite da obrišete fotografiju?');
    if (!potvrda) return;

    try {
      await fetch(`http://localhost:8000/api/fotografije/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Fotografija uspešno obrisana!');
      ucitajFotografije();
    } catch (err) {
      alert('Greška pri brisanju.');
      console.error(err);
    }
  };

  return (
    <div className="stranica-wrapper">
      <Breadcrumbs />
      <div className="galerija-container">
       

        {korisnik?.uloga === 'fotograf' && (
          <div className="galerija-dugmad-horizontalno">
            <Button text="Dodaj fotografiju" onClick={() => setShowForm(true)} />
          </div>
        )}

        {showForm && (
          <div className="modal-container">
            <div className="overlay" onClick={() => setShowForm(false)}></div>
            <div className="modal-forma" onClick={(e) => e.stopPropagation()}>
              <h3>Dodaj novu fotografiju</h3>
              <input
                type="text"
                placeholder="Naziv"
                value={naziv}
                onChange={e => setNaziv(e.target.value)}
              />
              <input
                type="text"
                placeholder="Opis"
                value={opis}
                onChange={e => setOpis(e.target.value)}
              />
              <input
                type="text"
                placeholder="ID izložbe"
                value={izlozbaId}
                onChange={e => setIzlozbaId(e.target.value)}
              />
              <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
              />
              <div style={{ marginTop: '10px' }}>
                <Button text="Pošalji" onClick={handleDodaj} />
                <Button text="Otkaži" onClick={() => setShowForm(false)} />
              </div>
            </div>
          </div>
        )}

        <div className="galerija-grid">
          {currentFotografije.map((foto) => (
            <div key={foto.id} className="galerija-item">
              <img
                src={`http://localhost:8000/storage/${foto.putanja_slike}`}
                alt={foto.naziv}
                className="galerija-slika"
              />
              <div className="galerija-opis">
                <p className="naziv-fotografije">{foto.naziv}</p>
                <p className="naziv-izlozbe">{foto.izlozba?.naziv}</p>
                {korisnik?.uloga === 'fotograf' && (
                  <Button text="Obriši" onClick={() => handleObrisi(foto.id)} />
                )}
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
    </div>
  );
}
