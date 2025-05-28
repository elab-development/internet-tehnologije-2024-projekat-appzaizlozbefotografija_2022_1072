import { useEffect, useState } from 'react';

export default function useKorisnik() {
  const [korisnik, setKorisnik] = useState(null);

  useEffect(() => {
    const korisnikStr = localStorage.getItem('korisnik');
    if (korisnikStr) {
      try {
        setKorisnik(JSON.parse(korisnikStr));
      } catch (e) {
        console.error("Nevalidan JSON u 'korisnik':", e);
        setKorisnik(null);
      }
    }
  }, []);

  return korisnik;
}
