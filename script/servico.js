document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let funcionario = document.getElementById("funcionario").value.trim();
    let dataServico = document.getElementById("data").value;
    let realizado = document.querySelector('input[name="realizado"]:checked');

    if (funcionario === "") {
      alert("Você precisa preencher o nome do funcionário");
      return;
    }

    if (dataServico === "") {
      alert("Por favor, selecione uma data");
      return;
    }

    if (!realizado) {
      alert("Por favor, selecione se o serviço foi realizado");
      return;
    }

    alert("Sucesso! Operação concluída.");

    form.reset();
  });
});



function consultar() {
   


    // Envia os dados via fetch
    fetch('http://localhost:8080/servico/listarServico', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function salvar() {
   

   let funcionario = document.getElementById("funcionario").value.trim();
    let dataServico = document.getElementById("data").value;
    let realizado = document.querySelector('input[name="realizado"]:checked');

    if (funcionario === "") {
      alert("Você precisa preencher o nome do funcionário");
      return;
    }

    if (dataServico === "") {
      alert("Por favor, selecione uma data");
      return;
    }

    if (!realizado) {
      alert("Por favor, selecione se o serviço foi realizado");
      return;
    }

    alert("Sucesso! Operação concluída.");

    form.reset();

    // Envia os dados via fetch
    fetch('http://localhost:8080/servico/cadservico', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function alterar() {
   


    // Envia os dados via fetch
    fetch('http://localhost:8080/servico/{id}', { // altere a URL conforme seu endpoint
        
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function deletar() {
   


    // Envia os dados via fetch
    fetch('http://localhost:8080/servico/{id}' , { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


