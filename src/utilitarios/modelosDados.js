// Este arquivo serve como referência para o grupo.
// Ele mostra o formato padrão dos dados que serão usados no sistema.

// Modelo de pet/peludo usado no CRUD de Pets.
export const modeloPeludo = {
  id: 1,
  nome: 'Mel',
  tipo: 'Gato',
  idade: '8 meses',
  descricao: 'Mel é alegre, delicada e carinhosa.',
  status: 'Disponível',
  imagem: 'mel.png',
};

// Modelo de tutor/interessado usado no CRUD de Tutores.
export const modeloInteressado = {
  id: 1,
  nome: 'Maria Souza',
  email: 'maria@email.com',
  telefone: '(61) 99999-9999',
  cidade: 'Brasília',
  endereco: 'Rua Exemplo, 123',
  perfilAdocao: 'Procura um pet calmo para apartamento.',
};

// Modelo de pedido de adoção usado no CRUD de Solicitações.
export const modeloPedidoAdocao = {
  id: 1,
  tutorId: 1,
  petId: 1,
  dataSolicitacao: '2026-06-10',
  status: 'Em análise',
  observacoes: 'Tutor demonstrou interesse em adoção responsável.',
};