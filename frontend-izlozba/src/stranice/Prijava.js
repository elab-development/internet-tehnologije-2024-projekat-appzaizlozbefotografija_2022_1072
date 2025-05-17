import React, { useState } from 'react';
import InputField from '../komponente/InputField';
import Button from '../komponente/Button';
import { Link } from 'react-router-dom';
import './Prijava.css';

export default function Prijava() {
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');

  const handlePrijava = () => {
    alert(`Email: ${email}\nLozinka: ${lozinka}`);
    // Ovaj alert ćemo kasnije zameniti pozivom backendu
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
