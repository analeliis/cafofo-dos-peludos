import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './paginas/Home';
import Login from './paginas/Login';
import Dashboard from './paginas/Dashboard';
import Pets from './paginas/Pets';
import Tutores from './paginas/Tutores';
import Solicitacoes from './paginas/Solicitacoes';
import Relatorio from './paginas/Relatorio';
import FAQ from './paginas/FAQ';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/tutores" element={<Tutores />} />
      <Route path="/solicitacoes" element={<Solicitacoes />} />
      <Route path="/relatorio" element={<Relatorio />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}

export default App;