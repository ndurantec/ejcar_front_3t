
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
    fetch('http://localhost:8080/responsavel/cadresp', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
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

