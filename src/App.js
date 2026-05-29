import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './paginas/Home';
import Login from './paginas/Login';
import Dashboard from './paginas/Dashboard';
import Pets from './paginas/Pets';
import Tutores from './paginas/Tutores';
import Solicitacoes from './paginas/Solicitacoes';
import Relatorio from './paginas/Relatorio';
import FAQ from './paginas/FAQ';
import Voluntariado from './paginas/Voluntariado';

import PrivateRoute from './componentes/PrivateRoute';
import Layout from './componentes/Layout';

function App() {
  return (
    <Routes>
      {/* Rota inicial do sistema */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rota pública */}
      <Route path="/login" element={<Login />} />

      <Route path="/voluntariado" element={<Voluntariado />} />

      {/* Rotas protegidas */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/pets"
        element={
          <PrivateRoute>
            <Layout>
              <Pets />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/tutores"
        element={
          <PrivateRoute>
            <Layout>
              <Tutores />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/solicitacoes"
        element={
          <PrivateRoute>
            <Layout>
              <Solicitacoes />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/relatorio"
        element={
          <PrivateRoute>
            <Layout>
              <Relatorio />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/faq"
        element={
          <PrivateRoute>
            <Layout>
              <FAQ />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;