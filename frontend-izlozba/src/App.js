import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './stranice/Pocetna';
import Prijava from './stranice/Prijava';
import Izlozbe from './stranice/Izlozbe';
import Galerija from './stranice/Galerija';
import Registracija from './stranice/Registracija';
import IzlozbaDetalji from './stranice/IzlozbaDetalji';
import Navbar from './komponente/Navbar'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/prijava" element={<Prijava />} />
        <Route path="/izlozbe" element={<Izlozbe />} />
        <Route path="/galerija" element={<Galerija />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/izlozbe/:id" element={<IzlozbaDetalji />} />
      </Routes>
    </Router>
  );
}

export default App;
