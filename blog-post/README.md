# 📸 Veb aplikacija za izložbe fotografija

**Naziv projekta:** Internet tehnologije - 2024  
**Repozitorijum:** [internet-tehnologije-2024-projekat-appzaizlozbefotografija_2022_1072](https://github.com/elab-development/internet-tehnologije-2024-projekat-appzaizlozbefotografija_2022_1072)

---

## 🎯 Opis aplikacije

Ova aplikacija omogućava pregled izložbi fotografija, registraciju korisnika i rezervaciju dolazaka. Posetioci se mogu prijaviti za izložbe, a automatski im se generiše QR kod koji se šalje mejlom kao potvrda o prijavi.  
Administrator upravlja izložbama i pregledom prijava, dok fotograf može da dodaje i briše fotografije.

---

## 🗃️ Backend (Laravel) – funkcionalnosti

- ✅ 3 modela: `Korisnik`, `Izlozba`, `Prijava` (povezani relacijama)
- ✅ 5+ tipova migracija: kreiranje tabela, dodavanje kolona, spoljni ključevi, ograničenja, izmena
- ✅ REST API rute za sve CRUD operacije
- ✅ JSON format odgovora i grešaka
- ✅ Jedna `resource` ruta + 3 tipa API ruta (`POST`, `GET`, `DELETE`)
- ✅ Autentifikacija: login, registracija, logout
- ✅ Zaštićene rute: samo autentifikovani korisnici imaju pristup kreiranju, izmeni i brisanju
- ✅ Paginacija i filtriranje izložbi po nazivu, lokaciji i datumu
- ✅ Uloge: `administrator`, `fotograf`, `posetilac`
- ✅ Upload fotografija (naslovna slika izložbe, galerija)
- ✅ Pretraga izložbi po nazivu

---

## 🌐 Frontend (React) – funkcionalnosti

- ✅ 3 stranice: `Izložbe`, `Galerija`, `Login/Registracija`, + `IzložbaDetalji`
- ✅ Reusable komponente:
  - `Button` (višenamenski dugmići)
  - `InputField` (različiti tipovi inputa)
  - `Modal` forma (za dodavanje/izmenu)
- ✅ Stilizacija preko CSS-a (custom dizajn, responsive grid)
- ✅ Korišćenje React hookova: `useState`, `useEffect`, `useNavigate`, `useParams`
- ✅ Paginacija i pretraga na stranici sa izložbama i galerijom
- ✅ Breadcrumbs navigacija (hijerarhijski prikaz kroz React Router)
- ✅ Povlačenje podataka sa Laravel API-ja i prikaz u realnom vremenu
- ✅ Custom hook `useKorisnik()` – za čuvanje i pristup informacijama o korisniku

---

## 👤 Uloge i ovlašćenja

| Uloga         | Funkcionalnosti                                                                 |
|---------------|----------------------------------------------------------------------------------|
| Administrator | Dodaje/menja/briše izložbe, vidi i briše prijave                               |
| Fotograf      | Dodaje i briše fotografije                                                      |
| Posetilac     | Prijavljuje se na izložbe, dobija QR kod mejlom                                |
| Gost          | Ima samo pregled izložbi i fotografija                                          |

---

## ✉️ Potvrda prijave + QR kod

- Pri prijavi posetioca, backend generiše jedinstveni `UUID` QR kod i šalje mejl sa potvrdom.
- QR kod je slika (`SVG`) generisana pomoću biblioteke `bacon/qr-code`.

---

## ⚙️ Tehnologije

- **Backend:** Laravel 11, PHP 8.0, MySQL, Sanctum
- **Frontend:** React 18 (Vite), Axios, React Router
- **Ostalo:** CSS (custom), Git, GitHub, Postman

---

## 🚀 Pokretanje projekta

1. Kloniraj oba repozitorijuma:
   - `blog-post` → Laravel backend
   - `frontend-izlozba` → React frontend

2. Backend:
   ```bash
   cd blog-post
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve

3. Frontend
   cd frontend-izlozba
   npm install
   npm run dev