async function carregarVeiculos(modeloSelecionado = '') {
        try {
          const response = await fetch('http://localhost:8080/veiculo/listarVeiculo');
          if (!response.ok) throw new Error('Erro ao buscar veículos');
          const veiculos = await response.json();
      
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
    
    async function finalizarOrcamento() {
      const veiculoId = getValueOrWarn('#selectVeiculo', 'Veículo');
      const codigoOrcamento = getValueOrWarn('#codigoOrcamento', 'Código do Orçamento');
      const produto = getValueOrWarn('#produto', 'Produto');
      const maoDeObraStr = getValueOrWarn('#maoDeObra', 'Mão de obra');
    
      // Se algum campo não existir ou estiver vazio, sai da função
      if (!veiculoId || !codigoOrcamento || !produto) {
        alert("Preencha todos os campos obrigatórios!");
        return;
      }
    
      const maoDeObra = parseFloat(maoDeObraStr) || 0;
    
      const orcamentoData = {
        maoDeObra: maoDeObra,
        produto: produto,
        codigoOrcamento: codigoOrcamento,
        idUsuario: 1,
        veiculoDto: {
          id: parseInt(veiculoId)
        }
      };
    
      try {
        const response = await fetch("http://localhost:8080/orcamento/cadorca", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orcamentoData)
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log(" Orçamento salvo:", result);
          alert("Orçamento finalizado com sucesso!");
        } else {
          const error = await response.json();
          console.error(" Erro ao salvar:", error);
          alert("Erro ao finalizar orçamento: " + (error.message || "Verifique os dados."));
        }
      } catch (error) {
        console.error(" Erro de conexão:", error);
        alert("Erro de conexão com o servidor.");
      }
    }
    