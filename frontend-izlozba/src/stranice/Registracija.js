import React, { useState } from 'react';
import InputField from '../komponente/InputField';
import Button from '../komponente/Button';
import { Link } from 'react-router-dom';
import './Prijava.css'; // koristimo isti stil!

export default function Registracija() {
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');
  const [potvrdaLozinke, setPotvrdaLozinke] = useState('');

  const handleRegistracija = () => {
    if (lozinka !== potvrdaLozinke) {
      alert('Lozinke se ne poklapaju!');
      return;
    }

    alert(`Ime: ${ime}\nPrezime: ${prezime}\nEmail: ${email}`);
    // Ovde će kasnije ići poziv backendu
  };

  return (
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
  );
}
