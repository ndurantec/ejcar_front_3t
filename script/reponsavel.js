
// cadastrar
function cadastrar() {
    const nome = document.getElementById("name").value;

    const telefone = document.getElementById("telefone").value;

    const endereco = document.getElementById("endereco").value;

    const cep= document.getElementById("cep").value;


            if(nome == ""){
                alert("Você precisa preencher o campo nome");
            }

            if(telefone == ""){
                alert("Você precisa preencher o campo telefone");
            }

             if(endereco == ""){
                alert("Você precisa preencher o campo endereco");
            }

             if(cep == ""){
                alert("Você precisa preencher o campo CEP");
            }

                  alert(nome + " - " + telefone + " - " + endereco + " - " + cep);

                  alert("Sucesso! Operação concluída.");
}


function salvarResponsavel() {
   
     const nome = document.getElementById("name").value;

    const telefone = document.getElementById("telefone").value;

    const endereco = document.getElementById("endereco").value;

    const cep= document.getElementById("cep").value;


            if(nome == ""){
                alert("Você precisa preencher o campo nome");
            }

            if(telefone == ""){
                alert("Você precisa preencher o campo telefone");
            }

             if(endereco == ""){
                alert("Você precisa preencher o campo endereco");
            }

             if(cep == ""){
                alert("Você precisa preencher o campo CEP");
            }

                  alert(nome + " - " + telefone + " - " + endereco + " - " + cep);

                  alert("Sucesso! Operação concluída.");

    // Envia os dados via fetch
    // fetch('http://localhost:8080/responsavel/cadresp', { // altere a URL conforme seu endpoint
       
    // }).then(response => {
           
    // }).then(data => {
       
    // }).catch(error => {
       
    // });
}


function alterarResponsavel() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/responsavel/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function consultarResponsavel() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/responsavel/listaresponsavel', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function deletarResponsavel() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/responsavel/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}
function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}

function validarFormulario() {
    //limparErros();

    // Captura dos valores do formulário
    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let endereco = document.getElementById("endereco").value;
    let cep = document.getElementById("cep").value;
    let cpf = document.getElementById("cpf").value;

    let ok = true;

    if (!nome) { mostrarErro('erro-nome', 'Verifique se possui nome para continuar.'); ok = false; }
    if (!telefone) { mostrarErro('erro-telefone', 'Verifique se possui telefone para continuar.'); ok = false; }
    if (!endereco) { mostrarErro('erro-endereco', 'Verifique se possui endereço para continuar.'); ok = false; }
    if (!cep) { mostrarErro('erro-cep', 'Verifique se possui cep para continuar.'); ok = false; }
    if (!cpf) { mostrarErro('erro-cpf', 'Verifique se possui cpf para continuar.'); ok = false; }
    
    return ok;
}

function coletarDados() {
    const canvas = document.getElementById('signaturePad');
  
    return {
        nome: document.getElementById("nome").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        endereco: document.getElementById("endereco").value.trim(),
        cep: document.getElementById("cep").value.trim(),
        cpf: document.getElementById("cpf").value.trim(),
        idUsuario: localStorage.getItem("id_usuario")
    };
}


function concluirResponsavel() {

    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/responsavel/cadresp', {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


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
        localStorage.setItem("id_responsavel", data.id);
        // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}
