// Aqui no storage.js ficam apenas dados locais do navegador,
// como sessão do usuário e imagens dos peludos.
// Os dados principais dos CRUDs são armazenados no MySQL.

export const CHAVES_STORAGE = {
  USUARIO_LOGADO: 'cafofo_sessao_usuario',
  IMAGENS_PELUDOS: 'cafofo_imagens_peludos',
};

// A relação é feita pelo id do peludo.

export const IMAGENS_FIXAS_PELUDOS = {
  1: '/img/peludos/peludo1.jpg',
  2: '/img/peludos/peludo2.png',
  3: '/img/peludos/peludo3.jpg',
  4: '/img/peludos/peludo4.jpg',
  5: '/img/peludos/peludo5.jpeg',
  6: '/img/peludos/peludo6.jpeg',
  7: '/img/peludos/peludo7.jpg',
  8: '/img/peludos/peludo8.jpg',
  9: '/img/peludos/peludo9.jpeg',
  10: '/img/peludos/peludo10.jpeg',
  11: '/img/peludos/peludo11.jpeg',
  12: '/img/peludos/peludo12.jpeg',
  13: '/img/peludos/peludo13.png',
  14: '/img/peludos/peludo14.jpeg',
  15: '/img/peludos/peludo15.jpeg',
  16: '/img/peludos/peludo16.jpg',
  17: '/img/peludos/peludo17.jpeg',
  18: '/img/peludos/peludo18.jpeg',
  19: '/img/peludos/peludo19.jpeg',
  20: '/img/peludos/peludo20.jpg',
};

// função para buscar os dados dentro do localStroge
//Busque as imagens dos peludos. Se não tiver nada salvo, retorne um objeto vazio.
export function buscarDadosLocais(chave, valorPadrao = null) { 
  try {
    const dados = localStorage.getItem(chave); //Aqui ele procura no localStorage se existe algo salvo naquela chave.

    if (!dados) {
      return valorPadrao;
    }

    return JSON.parse(dados); //transforma esse texto de volta em objeto/array.
  } catch (error) { //Evita que aplicação quebre se tiver algum dado invalido 
    return valorPadrao;
  }
}

export function salvarDadosLocais(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

// Ela recebe a chave e apaga o conteúdo salvo naquela chave.
export function removerDadosLocais(chave) {
  localStorage.removeItem(chave);
}

// Se não tiver nenhuma imagem salva, retorna um objeto vazio {}.
export function buscarImagensPeludos() {
  return buscarDadosLocais(CHAVES_STORAGE.IMAGENS_PELUDOS, {});
}

// Função responsável por decidir qual imagem será exibida para um peludo.
// recebe o id do peludo que vem do MySQL
export function obterImagemPeludo(id) {

  // Busca as imagens que já existem no localStorage.
  const imagensSalvas = buscarImagensPeludos();

  // Tenta encontrar uma imagem salva para o id recebido. 
  const imagemSalva = imagensSalvas[id];

  // Se existir uma imagem salva para esse peludo, retorna ela.
  if (imagemSalva) {
    return imagemSalva;
  }

  // Se não tiver imagem salva, tenta pegar uma imagem fixa pelo id.
  const imagemFixa = IMAGENS_FIXAS_PELUDOS[id];

  if (imagemFixa) {
    return imagemFixa;
  }

  return '/img/peludos/peludo1.jpg';
}

export function salvarImagemPeludo(id, imagem) {
  // Busca as imagens que já existem no localStorage.
  const imagensSalvas = buscarImagensPeludos();

  // Adiciona ou atualiza a imagem do peludo usando o id.
  imagensSalvas[id] = imagem;

  // Salva novamente o objeto atualizado no localStorage.
  salvarDadosLocais(CHAVES_STORAGE.IMAGENS_PELUDOS, imagensSalvas);
}

export function removerImagemPeludo(id) {
  // Busca as imagens salvas no localStorage.
  const imagensSalvas = buscarImagensPeludos();

  // Remove a imagem associada ao id recebido.
  delete imagensSalvas[id];

  salvarDadosLocais(CHAVES_STORAGE.IMAGENS_PELUDOS, imagensSalvas);
}