import { useEffect, useState } from 'react';

export default function useKorisnik() {
  const [korisnik, setKorisnik] = useState(null);

  useEffect(() => {
    try {
      const korisnikStr = localStorage.getItem('korisnik');
      if (korisnikStr) {
        const parsed = JSON.parse(korisnikStr);
        if (parsed?.uloga) {
          setKorisnik(parsed);
        } else {
          console.warn('Nema uloge u korisnik objektu.');
        }
      }
    } catch (e) {
      console.error("Greška pri parsiranju korisnika iz localStorage:", e);
    }
  }, []);

  return korisnik;
}
