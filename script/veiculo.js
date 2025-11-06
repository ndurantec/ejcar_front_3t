// =========================
//  FUNÇÃO CADASTRAR (teste local)
// =========================
function cadastrar() {
    const responsavel = document.getElementById("nomeResponsavel").value;
    const modelo = document.getElementById("modelo").value;
    const placa = document.getElementById("placa").value;
    const ano = document.getElementById("ano").value;
    const cor = document.getElementById("cor").value;
    const chassi = document.getElementById("chassi").value;

    if (responsavel === "") alert("Você precisa preencher o campo Responsável");
    if (modelo === "") alert("Você precisa preencher o campo Modelo");
    if (placa === "") alert("Você precisa preencher o campo Placa");
    if (ano === "") alert("Você precisa preencher o campo Ano");
    if (cor === "") alert("Você precisa preencher o campo Cor");
    if (chassi === "") alert("Você precisa preencher o campo Chassi");

    alert(responsavel + " - " + modelo + " - " + placa + " - " + ano + " - " + cor + " - " + chassi);
    alert("Sucesso! Operação concluída.");
}

// =========================
//  FUNÇÃO SALVAR VEÍCULO
// =========================
function salvarVeiculo() {
    const responsavel = document.getElementById("nomeResponsavel").value;
    const modelo = document.getElementById("modelo").value;
    const placa = document.getElementById("placa").value;
    const ano = document.getElementById("ano").value;
    const cor = document.getElementById("cor").value;
    const chassi = document.getElementById("chassi").value;

    if (responsavel === "" || modelo === "" || placa === "" || ano === "" || cor === "" || chassi === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    alert("Sucesso! Operação concluída.");
}

// =========================
//  FUNÇÃO ALTERAR VEÍCULO
// =========================
function alterarVeiculo() {
    fetch('http://localhost:8080/veiculo/{id}', {
        method: 'PUT',
    })
    .then(response => response.json())
    .then(data => {
        alert("Veículo alterado com sucesso!");
    })
    .catch(error => console.error("Erro ao alterar veículo:", error));
}

// =========================
//  FUNÇÃO CONSULTAR VEÍCULOS
// =========================
function consultarVeiculo() {
    fetch('http://localhost:8080/veiculo/listarveiculo', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log("Lista de veículos:", data);
        alert("Consulta realizada com sucesso! Verifique no console.");
    })
    .catch(error => console.error("Erro ao consultar veículos:", error));
}

// =========================
//  FUNÇÃO DELETAR VEÍCULO
// =========================
function deletarVeiculo() {
    fetch('http://localhost:8080/veiculo/{id}', {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert("Veículo deletado com sucesso!");
        } else {
            alert("Erro ao deletar veículo.");
        }
    })
    .catch(error => console.error("Erro ao deletar veículo:", error));
}

// =========================
//  VALIDAÇÃO DO FORMULÁRIO
// =========================
function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}

function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}

function validarFormulario() {
    let responsavel = document.getElementById("responsavel").value;
    let modelo = document.getElementById("modelo").value;
    let placa = document.getElementById("placa").value;
    let ano = document.getElementById("ano").value;
    let cor = document.getElementById("cor").value;
    let chassi = document.getElementById("chassi").value;

    let ok = true;

    if (!responsavel) { mostrarErro('erro-responsavel', 'Informe o responsável.'); ok = false; }
    if (!modelo) { mostrarErro('erro-modelo', 'Informe o modelo.'); ok = false; }
    if (!placa) { mostrarErro('erro-placa', 'Informe a placa.'); ok = false; }
    if (!ano) { mostrarErro('erro-ano', 'Informe o ano.'); ok = false; }
    if (!cor) { mostrarErro('erro-cor', 'Informe a cor.'); ok = false; }
    if (!chassi) { mostrarErro('erro-chassi', 'Informe o chassi.'); ok = false; }

    return ok;
}

// =========================
//  COLETA DOS DADOS
// =========================
function coletarDados() {
  return {
    placa: document.getElementById("placa").value,
    modelo: document.getElementById("modelo").value,
    ano: document.getElementById("ano").value,
    cor: document.getElementById("cor").value,
    chassi: document.getElementById("chassi").value,
    idUsuario: localStorage.getItem("id_usuario"), // ou como você armazena o ID do usuário

    // objeto aninhado igual ao esperado pelo backend
    seguroDto: {
        nome: document.getElementById("nomeSeguradora").checked,
        telefone: document.getElementById("telefoneSeguradora").value,
        idUsuario: localStorage.getItem("id_usuario")
    }
  };
}

// =========================
//  CONCLUSÃO DO CADASTRO
// =========================
function concluirVeiculo() {

    if (!validarFormulario());

    const dados = coletarDados();

    console.log(JSON.stringify(dados)); // Log para conferência

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch("http://localhost:8080/veiculo/cadveiculo", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(dados),
        headers: headers
    })
    .then(async response => {
        let  = await response.text();
        let text;

        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }

        console.log("Resposta do servidor:", data);

        if (!response.ok) {
            if (typeof data === "object") {
                for (const [campo, mensagem] of Object.entries(data)) {
                    const idErro = "erro-" + campo;
                    if (document.getElementById(idErro)) {
                        mostrarErro(idErro, mensagem);
                    }
                }
            } else {
                alert("⚠️ Erro ao cadastrar veículo!");
            }
            throw new Error("Erro de validação");
        }

        return data;
    })
    .then(data => {
        if (data.id) {
            localStorage.setItem("id_veiculo", data.id);
            alert("✅ Veículo cadastrado com sucesso!");
        } else {
            alert("Cadastro concluído, mas o ID não foi retornado.");
        }
    })
    .catch(error => console.error("Erro ao cadastrar veículo:", error));
}
