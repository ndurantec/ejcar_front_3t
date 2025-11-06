function cadastrar() {
    const dataEntrada = document.getElementById("entradaVeiculo").value;

    const dataSaida = document.getElementById("saidaVeiculo").value;

    const seguradoraSim = document.getElementById("seguradoraSim").value;

    const seguradoraNao= document.getElementById("seguradoraNao").value;


            if(dataEntrada == ""){
                alert("Você precisa preencher a entrada do veiculo");
            }

            if(dataSaida == ""){
                alert("Você precisa preencher a saida do veiculo");
            }

             if(seguradoraSim, seguradoraNao == ""){
                alert("Você precisa preencher o campo endereco");
            }


                alert(dataEntrada + " - " + dataSaida + " - " + seguradoraSim + " - " + seguradoraNao )
}


function salvarAgendamento() {

     const dataEntrada = document.getElementById("entradaVeiculo").value;

    const dataSaida = document.getElementById("saidaVeiculo").value;

    const seguradoraSim = document.getElementById("seguradoraSim").value;

    const seguradoraNao= document.getElementById("seguradoraNao").value;


            if(dataEntrada == ""){
                alert("Você precisa preencher a entrada do veiculo");
            }

            if(dataSaida == ""){
                alert("Você precisa preencher a saida do veiculo");
            }

             if(seguradoraSim, seguradoraNao == ""){
                alert("Você precisa preencher o campo endereco");
            }


                alert(dataEntrada + " - " + dataSaida + " - " + seguradoraSim + " - " + seguradoraNao )
   
    // // Envia os dados via fetch
    // fetch('http://localhost:8080/agenda/cadagenda', { // altere a URL conforme seu endpoint
       
    // }).then(response => {
           
    // }).then(data => {
       
    // }).catch(error => {
       
    // });
}


// function alterarAgendamento() {
   
//     // Envia os dados via fetch
//     fetch('http://localhost:8080/agenda/{id}', { // altere a URL conforme seu endpoint
       
//     }).then(response => {
           
//     }).then(data => {
       
//     }).catch(error => {
       
//     });
// }


// function consultarAgendamento() {
   
//     // Envia os dados via fetch
//     fetch('http://localhost:8080/agenda/agenda', { // altere a URL conforme seu endpoint
       
//     }).then(response => {
           
//     }).then(data => {
       
//     }).catch(error => {
       
//     });
// }


// function deletarAgendamento() {
   
//     // Envia os dados via fetch
//     fetch('http://localhost:8080/agenda/{id}', { // altere a URL conforme seu endpoint
       
//     }).then(response => {
           
//     }).then(data => {
       
//     }).catch(error => {
       
//     });
// }

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
    let entradaVeiculo = document.getElementById("entradaVeiculo").value;
    let saidaVeiculo = document.getElementById("saidaVeiculo").value;
    let seguradoraSim = document.getElementById("seguradoraSim").value;
    let seguradoraNao = document.getElementById("seguradoraNao").value;
    let nomeSeguradora = document.getElementById("nomeSeguradora").value;
    let numeroSeguradora = document.getElementById("numeroSeguradora").value;

    let ok = true;

    if (!entradaVeiculo) { mostrarErro('erro-nome', 'Verifique se possui entrada do Veiculo para continuar.'); ok = false; }
    if (!saidaVeiculo) { mostrarErro('erro-telefone', 'Verifique se possui a saida do Veiculo para continuar.'); ok = false; }
    if (!nomeSeguradora) { mostrarErro('erro-endereco', 'Verifique se possui o nome da Seguradora para continuar.'); ok = false; }
    if (!numeroSeguradora) { mostrarErro('erro-cep', 'Verifique se possui o numero da Seguradora para continuar.'); ok = false; }
    
    
    return ok;
}

function coletarDados() {
    const canvas = document.getElementById('signaturePad');
  
    return {
        entradaVeiculo: document.getElementById("entradaVeiculo").value.trim(),
        saidaVeiculo: document.getElementById("saidaVeiculo").value.trim(),
        nomeSeguradora: document.getElementById("nomeSeguradora").value.trim(),
        numeroSeguradora: document.getElementById("numeroSeguradora").value.trim(),
        idUsuario: localStorage.getItem("id_usuario")
    };
}


function concluirAgendamento() {

    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/agenda/cadagenda', {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


    })
    .then(async response => {
      let data = await response.data();

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
        localStorage.setItem("id_agenda", data.id);
         //mostrarMensagem(data.message || "✅ Agendamento feito com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}

