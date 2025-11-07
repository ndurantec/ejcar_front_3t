async function carregarVeiculos(modeloSelecionado = '') {
        try {
          const response = await fetch('http://localhost:8080/veiculo/listarVeiculo');
          if (!response.ok) throw new Error('Erro ao buscar veículos');
          const veiculos = await response.json();
          console.log(veiculos); 
      
          const select = document.getElementById('veiculo');
          select.innerHTML = '<option value="">Selecione o Veículo</option>'; // limpa antes
      
          veiculos.forEach(v => {
            const option = document.createElement('option');
            option.value = v.id;
            option.textContent = v.modelo; // ou v.modelo, se preferir exibir o modelo
      
            // 🔹 Se o modelo bater, marca como selecionado
            if (v.modelo === modeloSelecionado) {
              option.selected = true;
            }
      
            select.appendChild(option);
          });
        } catch (err) {
          console.error(err);
          alert('Erro ao carregar veículos');
        }
      }
      // Carrega os veículos assim que a página abrir
      document.addEventListener('DOMContentLoaded', carregarVeiculos);

async function carregarProduto(modeloSelecionado = '') {
        try {
          const response = await fetch('http://localhost:8080/produto/listarProduto');
          if (!response.ok) throw new Error('Erro ao buscar produtos');
          const produtos = await response.json();
          console.log(produtos); 
      
          const select = document.getElementById('produto');
          select.innerHTML = '<option value="">Selecione o Produto</option>'; // limpa antes
      
          produtos.forEach(v => {
            const option = document.createElement('option');
            option.value = v.id;
            option.textContent = v.descricao; // ou v.modelo, se preferir exibir o modelo
      
            // 🔹 Se o modelo bater, marca como selecionado
            if (v.descricao === modeloSelecionado) {
              option.selected = true;
            }
      
            select.appendChild(option);
          });
        } catch (err) {
          console.error(err);
          alert('Erro ao carregar produtos');
        }
      }
      // Carrega os veículos assim que a página abrir
      document.addEventListener('DOMContentLoaded', carregarProduto);

      // Adiciona uma nova linha com botão de remover
function adicionarLinha() {
    const container = document.getElementById("orcamento-linhas");
  
    const novaLinha = document.createElement("div");
    novaLinha.classList.add("linha-orcamento");
  
    novaLinha.innerHTML = `
      <input type="text" class="form-control produto" placeholder="Produto">
      <input type="number" class="form-control mao-obra" placeholder="Mão de obra (R$)" min="0" step="0.01">
      <button type="button" class="btn btn-add" onclick="adicionarLinha()">
        <i class="fas fa-plus"></i>
      </button>
      <button type="button" class="btn btn-remove" onclick="removerLinha(this)">
        <i class="fas fa-trash"></i>
      </button>
    `;
  
    container.appendChild(novaLinha);
  
    atualizarBotoes();
    atualizarTotal();
  }
  
  // Remove uma linha (com confirmação)
  function removerLinha(botao) {
    const confirmar = confirm("Deseja realmente remover esta linha?");
    if (!confirmar) return;
  
    const linha = botao.closest(".linha-orcamento");
    linha.remove();
  
    atualizarBotoes();
    atualizarTotal();
  }
  
  // Exibe o botão "+" apenas na última linha e o "🗑️" só nas linhas extras
  function atualizarBotoes() {
    const linhas = document.querySelectorAll(".linha-orcamento");
  
    linhas.forEach((linha, index) => {
      const btnAdd = linha.querySelector(".btn-add");
      const btnRemove = linha.querySelector(".btn-remove");
  
      // Só a última linha mostra o botão "+"
      if (btnAdd) btnAdd.style.display = index === linhas.length - 1 ? "inline-flex" : "none";
  
      // Primeira linha (índice 0) nunca mostra o botão remover
      if (btnRemove) btnRemove.style.display = index === 0 ? "none" : "inline-flex";
    });
  }
  
  // Atualiza o total da mão de obra em tempo real
  function atualizarTotal() {
    const campos = document.querySelectorAll(".mao-obra");
    let total = 0;
  
    campos.forEach((campo) => {
      const valor = parseFloat(campo.value) || 0;
      total += valor;
  
      campo.removeEventListener("input", atualizarTotal);
      campo.addEventListener("input", atualizarTotal);
    });
  
    document.getElementById("totalMaoObra").value = total.toFixed(2);
  }
  
  // Quando a página carrega
  window.addEventListener("load", () => {
    atualizarBotoes();
    atualizarTotal();
  });
  
    function mostrarErro(idElemento, mensagem) {
        document.getElementById(idElemento).textContent = mensagem;
    }
    function limparErros() {
        let erros = document.querySelectorAll('.erro');
        erros.forEach(e => e.textContent = '');
    }


    function getValueOrWarn(selector, nomeCampo) {
      const el = document.querySelector(selector);
      if (!el) {
        console.warn(`Elemento não encontrado: ${selector} (${nomeCampo})`);
        return null;
      }
      return el.value;
    }
    

    //CRUD

    function validarOrcamento() {
      //limparErros();
  
      // Captura dos valores do formulário
      let veiculo = document.getElementById("veiculo").value;
      let codigoOrcamento = document.getElementById("codigoOrcamento").value;
      let produto = document.getElementById("produto").value;
      let maoObra = document.getElementById("maoObra").value;
  
  
      let ok = true;
  
      if (!veiculo) { mostrarErro('erro-veiculo', 'Verifique se possui veiculo para continuar.'); ok = false; }
      if (!codigoOrcamento) { mostrarErro('erro-codigoOrcamento', 'Verifique se possui codigo de Orcamento para continuar.'); ok = false; }
      if (!produto) { mostrarErro('erro-produto', 'Verifique se possui produto para continuar.'); ok = false; }
      if (!maoObra) { mostrarErro('erro-maoObra', 'Verifique se possui Mao de Obra para continuar.'); ok = false; }
  
      return ok;
  }
  
  function coletarDados() {
      const canvas = document.getElementById('signaturePad');
    
      return {
        veiculo: document.getElementById("veiculo").value.trim(),
        codigoOrcamento: document.getElementById("codigoOrcamento").value.trim(),
        produto: document.getElementById("produto").value.trim(),
        maoObra: document.getElementById("maoObra").value.trim(),
      };
  }

    function finalizarOrcamento() {

      if (!validarOrcamento()) return;
  
      const dados = {
        idVeiculo: document.getElementById("veiculo").value,
        idProduto: document.getElementById("produto").value,
        codigo: document.getElementById("codigoOrcamento").value,
        maoDeObra: document.getElementById("maoObra").value
      };
  
      console.log(JSON.stringify(dados));
      console.log("JSON enviado ao backend:", JSON.stringify(dados, null, 2));
  
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Access-Control-Allow-Origin", "*");
  
      fetch('http://localhost:8080/orcamento/cadorca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })

      .then(async response => {
        let data = await response.json();
  
        console.log(data);
        
  
        if (!response.ok) {
          // Caso sejam erros de validação no DTO
          if (typeof data === "object") {
            let mensagens = Object.values(data).join("<br>");
  
            console.log("Entrou dento do if data ==== object");
            console.log("----------------------------------------------");
            console.log(mensagens);
            console.log("----------------------------------------------");
  
              let mensagensGlobais = []; // Para erros que não mapeiam para um campo específico
  
              for (const [campo, mensagem] of Object.entries(data)) {
                  // Mapeia o nome do campo do backend ('cpf', 'email', etc.) para o ID do elemento no HTML
                  const idElementoErro = "erro-" + campo; // Ex: 'cpf_error_message'
  
                  console.log("========================================================");
                  console.log(idElementoErro);
                  console.log("========================================================");
                  // Tenta exibir o erro no elemento específico
                  if (document.getElementById(idElementoErro)) {
                      //CHAMANDO A SUA FUNÇÃO mostrarErro(idElemento, mensagem)
                      mostrarErro(idElementoErro, mensagem);
                                          
                  } 
  
  
  
              }
  
            
          } else {
            mostrarMensagem("⚠️ Erro desconhecido", "erro");
          }
          throw new Error("Erro de validação");
        }
  
        return data;
      })
      .then(data => {
        if (data.id) {
          localStorage.setItem("id_orcamento", data.id);
          // mostrarMensagem(data.message || "✅ Professor cadastrado com sucesso!", "sucesso");
        }
      })
      .catch(error => console.error(error));
  }