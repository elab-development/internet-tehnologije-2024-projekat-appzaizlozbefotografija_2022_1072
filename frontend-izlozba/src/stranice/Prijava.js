import React, { useState } from 'react';
import InputField from '../komponente/InputField';
import Button from '../komponente/Button';
import Modal from '../komponente/Modal';

export default function Prijava() {
  const [email, setEmail] = useState('');
  const [sifra, setSifra] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handlePrijava = () => {
    if (email.trim() && sifra.trim()) {
      setModalOpen(true);
    } else {
      alert('Popunite sva polja.');
    }
  };

  return (
    <div style={{ paddingTop: '80px', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
      <h1>Prijava korisnika</h1>

      <InputField
        label="Email"
        type="email"
        placeholder="Unesite email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Šifra"
        type="password"
        placeholder="Unesite šifru"
        value={sifra}
        onChange={(e) => setSifra(e.target.value)}
      />

      <Button
        text="Prijavi se"
        onClick={handlePrijava}
        variant="primary"
      />

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Uneti email:</strong> {email}</p>
        <p><strong>Uneta šifra:</strong> {sifra}</p>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Uspešna prijava"
      >
        <p>Uspešno ste se prijavili sa emailom: <strong>{email}</strong></p>
      </Modal>
    </div>
  );
}
