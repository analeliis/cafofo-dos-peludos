
// Modelos de referência para padronizar os dados do sistema.
// Este arquivo não salva registros reais.
// Os dados principais dos CRUDs serão armazenados no MySQL.

// Modelo correspondente à tabela peludos.
export const modeloPeludo = {
  id: 1,
  nome: 'Mel',
  tipo: 'Gato',
  idade: '8 meses',
  descricao: 'Mel é alegre, delicada e carinhosa.',
  status: 'Disponível',
};

// Modelo correspondente à tabela interessados.
export const modeloInteressado = {
  id: 1,
  nome: 'Maria Souza',
  email: 'maria@email.com',
  telefone: '(61) 99999-9999',
  cidade: 'Brasília',
  endereco: 'Rua Exemplo, 123',
  perfil_adocao: 'Procura um pet calmo para apartamento.',
};

// Modelo correspondente à tabela pedidos_adocao.
export const modeloPedidoAdocao = {
  id: 1,
  interessado_id: 1,
  peludo_id: 1,
  data_solicitacao: '2026-06-10',
  status: 'Em análise',
  observacoes: 'Interessado demonstrou interesse em adoção responsável.',
};

// Modelo apenas para indicar a associação local da imagem.
// A imagem não será armazenada no MySQL.
export const modeloImagemLocalPeludo = {
  peludo_id: 1,
  imagem: 'imagem_convertida_ou_url_local',
};

