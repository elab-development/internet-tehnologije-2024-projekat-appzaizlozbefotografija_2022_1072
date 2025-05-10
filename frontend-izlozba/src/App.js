import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pocetna from './stranice/Pocetna';
import Prijava from './stranice/Prijava';
import Izlozbe from './stranice/Izlozbe';
import Galerija from './stranice/Galerija';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
            <li><Link to="/">Početna</Link></li>
            <li><Link to="/prijava">Prijava</Link></li>
            <li><Link to="/izlozbe">Izložbe</Link></li>
            <li><Link to="/galerija">Galerija</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/prijava" element={<Prijava />} />
          <Route path="/izlozbe" element={<Izlozbe />} />
          <Route path="/galerija" element={<Galerija />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
