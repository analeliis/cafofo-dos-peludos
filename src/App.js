import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './paginas/Home';
import Login from './paginas/Login';
import Dashboard from './paginas/Dashboard';
import Pets from './paginas/Pets';
import Tutores from './paginas/Tutores';
import Solicitacoes from './paginas/Solicitacoes';
import Relatorio from './paginas/Relatorio';
import FAQ from './paginas/FAQ';

import PrivateRoute from './componentes/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Rota inicial do sistema */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rota pública */}
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/pets"
        element={
          <PrivateRoute>
            <Pets />
          </PrivateRoute>
        }
      />

      <Route
        path="/tutores"
        element={
          <PrivateRoute>
            <Tutores />
          </PrivateRoute>
        }
      />

      <Route
        path="/solicitacoes"
        element={
          <PrivateRoute>
            <Solicitacoes />
          </PrivateRoute>
        }
      />

      <Route
        path="/relatorio"
        element={
          <PrivateRoute>
            <Relatorio />
          </PrivateRoute>
        }
      />

      <Route
        path="/faq"
        element={
          <PrivateRoute>
            <FAQ />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;