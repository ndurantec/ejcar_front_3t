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

      function adicionarLinha() {
        const container = document.getElementById("orcamento-linhas");
        const novaLinha = document.createElement("div");
        novaLinha.classList.add("linha-orcamento");
      
        novaLinha.innerHTML = `
          <select class="form-control veiculo">
            <option value="">Selecione o veículo</option>
          </select>
          <input type="text" class="form-control codigo" placeholder="Código do Orçamento">
          <input type="text" class="form-control produto" placeholder="Produto ou serviço">
          <input type="number" class="form-control mao-obra" placeholder="Mão de obra (R$)" min="0" step="0.01">
          <button type="button" class="btn btn-remove" onclick="removerLinha(this)"><i class="fas fa-minus"></i></button>
        `;
      
        container.appendChild(novaLinha);
      }
      
      function removerLinha(botao) {
        botao.parentElement.remove();
      }
      

      function mostrarErro(idElemento, mensagem) {
        document.getElementById(idElemento).textContent = mensagem;
    }
    function limparErros() {
        let erros = document.querySelectorAll('.erro');
        erros.forEach(e => e.textContent = '');
    }




function tabelaOrcamento() {
    fetch("http://localhost:8080/orcamento/tabelaOrcamento", {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    })
    .then(response => response.json())
    .then(data => {
        let tabela = "<table border='1'><tr><th>ID</th><th>Código</th><th>Produto</th><th>Mão de Obra</th><th>ID Usuário</th><th>ID Veículo</th></tr>";
        data.forEach(o => {
            tabela += `<tr>
                <td>${o.id}</td>
                <td>${o.codigoOrcamento}</td>
                <td>${o.produto}</td>
                <td>${o.maoDeObra}</td>
                <td>${o.idUsuario}</td>
                <td>${o.veiculoDto ? o.veiculoDto.id : "-"}</td>
            </tr>`;
        });
        tabela += "</table>";
        document.getElementById("resultado").innerHTML = tabela;
    })
    .catch(error => {
        document.getElementById("resultado").innerText =
            "Erro ao listar orçamentos: " + JSON.stringify(error);
    });
}

function atualizarOrcamento() {
    const id = parseInt(document.getElementById("idOrcamento").value.trim());
    const maoDeObra = document.getElementById("maoDeObra").value.trim();
    const produto = document.getElementById("produto").value.trim();
    const codigoOrcamento = document.getElementById("codigoOrcamento").value.trim();

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const corpo = JSON.stringify({
        maoDeObra: maoDeObra,
        produto: produto,
        codigoOrcamento: codigoOrcamento
    });

    fetch("http://localhost:8080/orcamento/${id}", {
        method: "PUT",
        mode: "cors",
        headers: headers,
        body: corpo
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("resultado").innerText =
            "Orçamento atualizado com sucesso! ID: " + data.id;
    })
    .catch(error => {
        document.getElementById("resultado").innerText =
            "Erro ao atualizar orçamento: " + JSON.stringify(error);
    });
}

function deletarOrcamento() {
    const id = parseInt(document.getElementById("idOrcamento").value.trim());

    fetch("http://localhost:8080/orcamento/${id}", {
        method: "DELETE",
        mode: "cors"
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err });
        }
        document.getElementById("resultado").innerText =
            "Orçamento deletado com sucesso! ID: " + id;
    })
    .catch(error => {
        document.getElementById("resultado").innerText =
            "Erro ao deletar orçamento: " + JSON.stringify(error);
    });
}