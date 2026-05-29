import { Link, useNavigate } from 'react-router-dom';
import { CHAVES_STORAGE } from '../utilitarios/storage';

function Navbar() {
  const navigate = useNavigate();

  function sairDoSistema() {
    localStorage.removeItem(CHAVES_STORAGE.USUARIO_LOGADO);
    navigate('/login');
  }

  return (
    <nav>
      <h2>Cafofo dos Peludos</h2>

      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <Link to="/pets">Pets</Link>
        </li>

        <li>
          <Link to="/tutores">Tutores</Link>
        </li>

        <li>
          <Link to="/solicitacoes">Solicitações</Link>
        </li>

        <li>
          <Link to="/relatorio">Relatório</Link>
        </li>

        <li>
          <Link to="/faq">FAQ</Link>
        </li>

        <li>
          <Link to="/voluntariado">Voluntariado</Link>
        </li>
        
      </ul>

      <button onClick={sairDoSistema}>
        Sair
      </button>
    </nav>
  );
}

export default Navbar;