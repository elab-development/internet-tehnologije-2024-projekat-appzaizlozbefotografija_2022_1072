import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../komponente/InputField';
import Button from '../komponente/Button';
import { Link } from 'react-router-dom';
import './Prijava.css';

export default function Prijava() {
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');
  const navigate = useNavigate();

  const handlePrijava = () => {
    const korisnik = {
      email: email,
      lozinka: lozinka
    };

    fetch('http://127.0.0.1:8000/api/prijava', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(korisnik)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.poruka || 'Greška pri prijavi.');
          });
        }
        return res.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('uloga', data.korisnik.uloga);
        localStorage.setItem('korisnik', JSON.stringify(data.korisnik));
        alert('Uspešna prijava!');
        navigate('/izlozbe');
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert('Greška: ' + err.message);
      });
  };

  return (
    <div className="prijava-container">
      <div className="prijava-forma">
        <h2 style={{ textAlign: 'center' }}>Prijava korisnika</h2>
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
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Button text="Prijavi se" onClick={handlePrijava} />
        </div>
        <div className="link-registracija">
          <Link to="/registracija">Nemate nalog? Registrujte se ovde</Link>
        </div>
      </div>
    </div>
  );
}
