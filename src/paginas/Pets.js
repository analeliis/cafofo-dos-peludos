import { useEffect, useRef, useState } from "react";
import {
  obterImagemPeludo,
  removerImagemPeludo,
  salvarImagemPeludo,
} from "../utilitarios/storage";

const API_PELUDOS = "http://localhost:3001/api/peludos";

const formularioInicial = {
  nome: "",
  tipo: "Cachorro",
  idade: "",
  descricao: "",
  status: "Disponível",
};

function Pets() {
  /* Aqui eu preparo todo o "terreno" do meu componente. 
    Uso múltiplos useState para separar as responsabilidades: dados, formulário e feedbacks visuais.
  */
  const [peludos, setPeludos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEdicao, setIdEdicao] = useState(null);
  const [imagemPreview, setImagemPreview] = useState("");
  const [imagemFoiAlterada, setImagemFoiAlterada] = useState(false);
  
  // Estados para dar feedback ao usuário sobre o que está acontecendo
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // Estados exclusivos para a área de busca e filtros
  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [statusFiltro, setStatusFiltro] = useState("Todos");

  /* Crio essa referência para conseguir manipular diretamente o input de arquivo (foto).
    Como inputs 'file' não podem ser controlados via 'value' no React por segurança, 
    eu uso a ref para limpá-lo manualmente depois que salvo ou cancelo a edição.
  */
  const inputImagemRef = useRef(null);

  /*
    Meu gatilho inicial: assim que a tela abre, eu peço para o React executar 
    a função de buscar os dados lá no servidor.
  */
  useEffect(() => {
    carregarPeludos();
  }, []);

  // Função responsável por buscar os dados da API
  async function carregarPeludos() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(API_PELUDOS);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os peludos.");
      }

      const dados = await resposta.json();
      setPeludos(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false); // Garanto que o loading suma, dando certo ou errado
    }
  }

  // Função genérica para atualizar qualquer campo de texto/select do meu formulário
  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  /*
    Quando o usuário escolhe uma foto, eu não mando para o servidor na hora.
    Eu pego o arquivo, uso o FileReader do navegador para lê-lo como Base64
    e salvo no estado para gerar um preview instantâneo na tela.
  */
  function selecionarImagem(evento) {
    const arquivo = evento.target.files[0];

    if (!arquivo) {
      return;
    }

    const leitor = new FileReader();

    leitor.onloadend = () => {
      setImagemPreview(leitor.result); // O resultado da leitura vira a imagem de preview
      setImagemFoiAlterada(true); // Marco que a imagem sofreu alteração
    };

    leitor.readAsDataURL(arquivo);
  }

  // Volto o formulário para o estado zerado original
  function limparFormulario() {
    setFormulario(formularioInicial);
    setIdEdicao(null);
    setImagemPreview("");
    setImagemFoiAlterada(false);

    // Limpo o input de arquivo fisicamente usando a referência que criei
    if (inputImagemRef.current) {
      inputImagemRef.current.value = "";
    }
  }

  // Volto os filtros de busca para o padrão
  function limparFiltros() {
    setBusca("");
    setTipoFiltro("Todos");
    setStatusFiltro("Todos");
  }

  /*
    O coração do meu CRUD: a função que decide se estou criando ou editando um registro.
  */
  async function salvarPeludo(evento) {
    evento.preventDefault(); // Evito o recarregamento padrão da página

    // Validação básica para não enviar dados incompletos
    if (
      !formulario.nome ||
      !formulario.tipo ||
      !formulario.idade ||
      !formulario.status
    ) {
      setErro("Preencha nome, tipo, idade e status.");
      return;
    }

    try {
      setSalvando(true);
      setErro("");
      setMensagem("");

      /* Aqui está a minha lógica condicional: 
        Se tenho um idEdicao, monto a URL apontando para ele e uso o método PUT.
        Se não tenho, uso a URL base e o método POST para criar um novo.
      */
      const url = idEdicao ? `${API_PELUDOS}/${idEdicao}` : API_PELUDOS;
      const metodo = idEdicao ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });

      const dadosResposta = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dadosResposta.mensagem || "Não foi possível salvar o peludo."
        );
      }

      // Descubro qual ID usar para atrelar a imagem (o que editei ou o que acabei de criar)
      const idParaImagem = idEdicao || dadosResposta.id;

      // Se a imagem foi alterada durante esse processo, eu a salvo
      if (imagemFoiAlterada && imagemPreview && idParaImagem) {
        salvarImagemPeludo(idParaImagem, imagemPreview);
      }

      setMensagem(
        idEdicao
          ? "Peludo atualizado com sucesso!"
          : "Peludo cadastrado com sucesso!"
      );

      limparFormulario();
      await carregarPeludos(); // Recarrego a lista para mostrar a tabela atualizada
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  /*
    Quando clico no botão "Editar" na tabela, eu executo essa função para preencher
    o formulário no topo da página com os dados daquela linha específica.
  */
  function editarPeludo(peludo) {
    setIdEdicao(peludo.id);

    setFormulario({
      nome: peludo.nome || "",
      tipo: peludo.tipo || "Cachorro",
      idade: peludo.idade || "",
      descricao: peludo.descricao || "",
      status: peludo.status || "Disponível",
    });

    // Pego a imagem atual para mostrar no preview
    setImagemPreview(obterImagemPeludo(peludo.id));
    setImagemFoiAlterada(false);
    setMensagem("");
    setErro("");

    // Rolo a tela suavemente para o topo para o usuário ver o formulário
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Função para deletar o registro após confirmação do usuário
  async function excluirPeludo(id) {
    const confirmarExclusao = window.confirm(
      "Tem certeza que deseja excluir este peludo?"
    );

    if (!confirmarExclusao) {
      return;
    }

    try {
      setErro("");
      setMensagem("");

      const resposta = await fetch(`${API_PELUDOS}/${id}`, {
        method: "DELETE",
      });

      const dadosResposta = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dadosResposta.mensagem || "Não foi possível excluir o peludo."
        );
      }

      removerImagemPeludo(id);

      // Se eu estava editando justamente o pet que acabei de excluir, eu limpo o form
      if (idEdicao === id) {
        limparFormulario();
      }

      setMensagem("Peludo excluído com sucesso!");
      await carregarPeludos();
    } catch (error) {
      setErro(error.message);
    }
  }

  /*
    Aqui eu calculo a lista filtrada em tempo real, "on the fly". 
    Em vez de criar um useState só para resultados de busca, eu processo a lista 
    original a cada renderização, cruzando os dados digitados e selecionados.
  */
  const peludosFiltrados = peludos.filter((peludo) => {
    const textoBusca = busca.trim().toLowerCase();

    const nome = (peludo.nome || "").toLowerCase();
    const tipo = (peludo.tipo || "").toLowerCase();
    const idade = (peludo.idade || "").toLowerCase();
    const descricao = (peludo.descricao || "").toLowerCase();
    const status = (peludo.status || "").toLowerCase();

    // Vejo se o texto digitado bate com algum dos campos
    const combinaBusca =
      textoBusca === "" ||
      nome.includes(textoBusca) ||
      tipo.includes(textoBusca) ||
      idade.includes(textoBusca) ||
      descricao.includes(textoBusca) ||
      status.includes(textoBusca);

    const combinaTipo = tipoFiltro === "Todos" || peludo.tipo === tipoFiltro;

    const combinaStatus =
      statusFiltro === "Todos" || peludo.status === statusFiltro;

    return combinaBusca && combinaTipo && combinaStatus;
  });

  return (
    <section className="crud-admin-page">
      <div className="crud-admin-header">
        <div>
          <h1>Gestão de Peludos</h1>
          <p>
            Cadastre, edite, liste e exclua os peludos disponíveis para adoção.
          </p>
        </div>

        <button type="button" onClick={carregarPeludos}>
          Atualizar lista
        </button>
      </div>

      {/* Renderização condicional das mensagens de feedback */}
      {mensagem && <div className="crud-alerta sucesso">{mensagem}</div>}
      {erro && <div className="crud-alerta erro">{erro}</div>}

      <div className="crud-admin-grid">
        <form className="crud-form-card" onSubmit={salvarPeludo}>
          <div className="crud-form-title">
            <span>{idEdicao ? "Editando registro" : "Novo cadastro"}</span>
            <h2>{idEdicao ? "Editar peludo" : "Cadastrar peludo"}</h2>
          </div>

          <label>
            Nome do peludo
            <input
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={atualizarCampo}
              placeholder="Ex: Luna"
            />
          </label>

          <label>
            Tipo
            <select
              name="tipo"
              value={formulario.tipo}
              onChange={atualizarCampo}
            >
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>
          </label>

          <label>
            Idade
            <input
              type="text"
              name="idade"
              value={formulario.idade}
              onChange={atualizarCampo}
              placeholder="Ex: 2 anos"
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={formulario.status}
              onChange={atualizarCampo}
            >
              <option value="Disponível">Disponível</option>
              <option value="Em análise">Em análise</option>
              <option value="Adotado">Adotado</option>
            </select>
          </label>

          <label>
            Descrição
            <textarea
              name="descricao"
              value={formulario.descricao}
              onChange={atualizarCampo}
              placeholder="Descreva o comportamento do peludo"
              rows="4"
            />
          </label>

          <label>
            Foto do peludo
            <input
              ref={inputImagemRef}
              type="file"
              accept="image/*"
              onChange={selecionarImagem}
            />
          </label>

          {/* Se a imagem foi selecionada/carregada, exibo o preview aqui */}
          {imagemPreview && (
            <div className="crud-preview-imagem">
              <img src={imagemPreview} alt="Prévia do peludo" />
              <span>Prévia da imagem selecionada</span>
            </div>
          )}

          <div className="crud-form-actions">
            <button type="submit" disabled={salvando}>
              {salvando
                ? "Salvando..."
                : idEdicao
                ? "Salvar alterações"
                : "Cadastrar peludo"}
            </button>

            {/* Só exibo o botão de cancelar edição se houver de fato um ID em edição */}
            {idEdicao && (
              <button
                type="button"
                className="secundario"
                onClick={limparFormulario}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>

        <div className="crud-list-card">
          <div className="crud-list-title">
            <div>
              <span>Registros do banco</span>
              <h2>Peludos cadastrados</h2>
            </div>

            <strong>
              {peludosFiltrados.length} de {peludos.length} registros
            </strong>
          </div>

          <div className="pets-admin-filtros">
            <input
              type="text"
              placeholder="Buscar por nome, idade, descrição ou status"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />

            <select
              value={tipoFiltro}
              onChange={(evento) => setTipoFiltro(evento.target.value)}
            >
              <option value="Todos">Todos os tipos</option>
              <option value="Cachorro">Cachorros</option>
              <option value="Gato">Gatos</option>
            </select>

            <select
              value={statusFiltro}
              onChange={(evento) => setStatusFiltro(evento.target.value)}
            >
              <option value="Todos">Todos os status</option>
              <option value="Disponível">Disponível</option>
              <option value="Em análise">Em análise</option>
              <option value="Adotado">Adotado</option>
            </select>

            <button
              type="button"
              className="btn-buscar-peludo"
              onClick={limparFiltros}
            >
              Limpar filtros
            </button>
          </div>

          {/* Lógica de renderização da tabela, estados vazios e carregamento */}
          {carregando ? (
            <div className="crud-vazio">Carregando peludos...</div>
          ) : peludosFiltrados.length === 0 ? (
            <div className="crud-vazio">
              Nenhum peludo encontrado para os filtros selecionados.
            </div>
          ) : (
            <div className="crud-table-wrapper">
              <table className="crud-table">
                <thead>
                  <tr>
                    <th>Peludo</th>
                    <th>Tipo</th>
                    <th>Idade</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Utilizo os peludos filtrados, e não a lista inteira, para gerar as linhas */}
                  {peludosFiltrados.map((peludo) => (
                    <tr key={peludo.id}>
                      <td>
                        <div className="crud-pet-cell">
                          <img
                            src={obterImagemPeludo(peludo.id)}
                            alt={peludo.nome}
                          />

                          <div>
                            <strong>{peludo.nome}</strong>
                            <small>{peludo.descricao || "Sem descrição"}</small>
                          </div>
                        </div>
                      </td>

                      <td>{peludo.tipo}</td>
                      <td>{peludo.idade}</td>

                      <td>
                        <span className="crud-status">{peludo.status}</span>
                      </td>

                      <td>
                        <div className="crud-acoes">
                          <button
                            type="button"
                            onClick={() => editarPeludo(peludo)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="excluir"
                            onClick={() => excluirPeludo(peludo.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Pets;
