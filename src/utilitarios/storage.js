// Arquivo responsável por centralizar o uso do localStorage.
// O localStorage será usado como um "banco de dados simulado" no navegador.

// Chaves usadas para salvar os dados do sistema Cafofo dos Peludos.
export const CHAVES_STORAGE = {
  PELUDOS: 'cafofo_peludos',
  INTERESSADOS: 'cafofo_interessados_adocao',
  PEDIDOS_ADOCAO: 'cafofo_pedidos_adocao',
  USUARIO_LOGADO: 'cafofo_sessao_usuario',
};

// Função para buscar dados no localStorage.
// Se não existir nada salvo, retorna um valor padrão.
export function buscarDados(chave, valorPadrao = []) {
  const dados = localStorage.getItem(chave);

  if (!dados) {
    return valorPadrao;
  }

  return JSON.parse(dados);
}

// Função para salvar dados no localStorage.
// Como o localStorage só salva texto, usamos JSON.stringify.
export function salvarDados(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

// Função para remover uma chave específica do localStorage.
export function removerDados(chave) {
  localStorage.removeItem(chave);
}

// Função para limpar todos os dados do sistema.
// Usar com cuidado, porque apaga pets, tutores, solicitações e login.
export function limparDadosDoSistema() {
  localStorage.removeItem(CHAVES_STORAGE.PETS);
  localStorage.removeItem(CHAVES_STORAGE.TUTORES);
  localStorage.removeItem(CHAVES_STORAGE.SOLICITACOES);
  localStorage.removeItem(CHAVES_STORAGE.USUARIO_LOGADO);
}