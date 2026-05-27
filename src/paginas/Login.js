import { useNavigate } from 'react-router-dom';
import { CHAVES_STORAGE } from '../utilitarios/storage';

function Login() {
  const navigate = useNavigate();

  function entrarNoSistema() {
    const usuarioTeste = {
      email: 'teste@cafofo.com',
      nome: 'Usuário Teste',
    };

    localStorage.setItem(
      CHAVES_STORAGE.USUARIO_LOGADO,
      JSON.stringify(usuarioTeste)
    );

    navigate('/dashboard');
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Tela de acesso ao sistema.</p>

      <button onClick={entrarNoSistema}>
        Entrar no sistema
      </button>
    </div>
  );
}

export default Login;