import React, { useState } from 'react';
import InputField from '../komponente/InputField';
import Button from '../komponente/Button';
import { Link, useNavigate } from 'react-router-dom';
import './Prijava.css';
import Breadcrumbs from '../komponente/Breadcrumbs';

export default function Registracija() {
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');
  const [potvrdaLozinke, setPotvrdaLozinke] = useState('');
  const navigate = useNavigate();

  const handleRegistracija = () => {
    if (lozinka !== potvrdaLozinke) {
      alert('Lozinke se ne poklapaju!');
      return;
    }

    const korisnik = {
      ime: ime,
      prezime: prezime,
      email: email,
      lozinka: lozinka,
      lozinka_confirmation: potvrdaLozinke,
      uloga: 'posetilac'
    };

    fetch('http://127.0.0.1:8000/api/registracija', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(korisnik)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.message || 'Greška pri registraciji');
          });
        }
        return res.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        alert('Uspešna registracija! Prijavite se.');
        navigate('/prijava');
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert('Greška: ' + err.message);
      });
  };

  return (
    <div className="stranica-wrapper">
      <Breadcrumbs />
      <div className="prijava-container">
        <div className="prijava-forma">
          <h2 style={{ textAlign: 'center' }}>Registracija korisnika</h2>

          <InputField
            label="Ime"
            type="text"
            placeholder="Unesite ime"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
          />

          <InputField
            label="Prezime"
            type="text"
            placeholder="Unesite prezime"
            value={prezime}
            onChange={(e) => setPrezime(e.target.value)}
          />

          <InputField
            label="E-mail"
            type="email"
            placeholder="Unesite e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Lozinka"
            type="password"
            placeholder="Unesite lozinku"
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
          />

          <InputField
            label="Potvrda lozinke"
            type="password"
            placeholder="Potvrdite lozinku"
            value={potvrdaLozinke}
            onChange={(e) => setPotvrdaLozinke(e.target.value)}
          />

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Button text="Registruj se" onClick={handleRegistracija} />
          </div>

          <div className="link-registracija">
            <Link to="/prijava">Već imate nalog? Prijavite se ovde</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
