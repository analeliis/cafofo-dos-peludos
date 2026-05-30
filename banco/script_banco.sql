-- Cria o banco de dados do sistema, caso ele ainda não exista.
CREATE DATABASE IF NOT EXISTS cafofo_dos_peludos;

-- Seleciona o banco que será utilizado pelos comandos abaixo.
USE cafofo_dos_peludos;

-- Tabela responsável por armazenar os pets/peludos cadastrados.
-- As imagens não serão armazenadas no banco; ficarão no localStorage.
CREATE TABLE IF NOT EXISTS peludos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    idade VARCHAR(30) NOT NULL,
    descricao TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'Disponível'
);

-- Tabela responsável por armazenar os tutores/interessados em adoção.
CREATE TABLE IF NOT EXISTS interessados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    endereco VARCHAR(200),
    perfil_adocao TEXT
);

-- Tabela responsável por armazenar os pedidos de adoção.
-- Ela relaciona um interessado a um peludo.
CREATE TABLE IF NOT EXISTS pedidos_adocao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    interessado_id INT NOT NULL,
    peludo_id INT NOT NULL,
    data_solicitacao DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Em análise',
    observacoes TEXT,

    FOREIGN KEY (interessado_id) REFERENCES interessados(id),
    FOREIGN KEY (peludo_id) REFERENCES peludos(id)
);