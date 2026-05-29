// Modelos de referência para padronizar os dados do sistema.
// Os dados principais serão armazenados no MySQL.

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
  perfilAdocao: 'Procura um pet calmo para apartamento.',
};

// Modelo correspondente à tabela pedidos_adocao.
export const modeloPedidoAdocao = {
  id: 1,
  interessadoId: 1,
  peludoId: 1,
  dataSolicitacao: '2026-06-10',
  status: 'Em análise',
  observacoes: 'Interessado demonstrou interesse em adoção responsável.',
};

// A imagem será tratada localmente no navegador,
// associada ao id do peludo, e não armazenada no MySQL.
export const modeloImagemLocalPeludo = {
  peludoId: 1,
  imagem: 'imagem_convertida_ou_url_local',
};