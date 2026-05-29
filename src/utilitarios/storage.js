// Chaves usadas apenas para dados locais do navegador.
// Os dados principais dos CRUDs serão armazenados no MySQL.
export const CHAVES_STORAGE = {
  USUARIO_LOGADO: 'cafofo_sessao_usuario',
  IMAGENS_PELUDOS: 'cafofo_imagens_peludos',
};

export function buscarDadosLocais(chave, valorPadrao = null) {
  const dados = localStorage.getItem(chave);

  if (!dados) {
    return valorPadrao;
  }

  return JSON.parse(dados);
}

export function salvarDadosLocais(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

export function removerDadosLocais(chave) {
  localStorage.removeItem(chave);
}