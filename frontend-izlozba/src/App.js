import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './stranice/Pocetna';
import Prijava from './stranice/Prijava';
import Izlozbe from './stranice/Izlozbe';
import Galerija from './stranice/Galerija';
import Navbar from './komponente/Navbar'; 

function App() {
  return (
    <Router>
      <Navbar /> {}
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/prijava" element={<Prijava />} />
        <Route path="/izlozbe" element={<Izlozbe />} />
        <Route path="/galerija" element={<Galerija />} />
      </Routes>
    </Router>
  );
}

export default App;
