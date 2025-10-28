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
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/agenda/cadagenda', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function alterarAgendamento() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/agenda/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function consultarAgendamento() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/agenda/agenda', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function deletarAgendamento() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/agenda/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}
