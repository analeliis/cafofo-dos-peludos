import { Navigate } from 'react-router-dom';
import { CHAVES_STORAGE } from '../utilitarios/storage';

function PrivateRoute({ children }) { //{ PROPS : children: <Layout><Dashboard /></Layout>}
  const usuarioLogado = localStorage.getItem(CHAVES_STORAGE.USUARIO_LOGADO);  /*Ele usa o nome da caixinha para buscar o conteúdo que está dentro dela. */

  // Se não houver usuário logado, redireciona para o login.
  if (!usuarioLogado) {
    return <Navigate to="/login" />; /*serve para redirecionar o usuário para outra rota. , ou seja para dentro da aplicação */
  }

  return children; // permitindo a gente mostrar o conteúdo que esta dentro do privateroute
}

export default PrivateRoute;