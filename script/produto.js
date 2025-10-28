



function salvarProduto() {

  document.addEventListener("DOMContentLoaded", function() {
  var form = document.querySelector("form");
  var valorCampo = document.getElementById("valor");
  var descricaoCampo = document.getElementById("descricao");
  var erroValor = document.querySelector(".erro-valor");
  var erroDescricao = document.querySelector(".erro-descricao");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Limpa mensagens anteriores
    erroValor.textContent = "";
    erroDescricao.textContent = "";

    var valor = valorCampo.value.trim();
    var descricao = descricaoCampo.value.trim();
    var valido = true;

    // Validação do campo valor
    if (valor === "" || isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) {
      erroValor.textContent = "Por favor, informe um valor maior que zero.";
      valido = false;
    }

    // Validação do campo descrição
    if (descricao === "") {
      erroDescricao.textContent = "Por favor, preencha a descrição.";
      valido = false;
    }

    // Se tudo estiver certo
    if (valido) {
      erroValor.textContent = "";
      erroDescricao.textContent = "";
      alert("Produto cadastrado com sucesso!");
      form.reset();
    }
  });
});
   


    // Envia os dados via fetch
    fetch("http://127.0.0.1:8080/responsaveis", { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
} 

function consultarProduto() {
   


    // Envia os dados via fetch
    fetch("http://127.0.0.1:8080/responsaveis", { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}  

function alterarProduto() {
   


    // Envia os dados via fetch
    fetch("http://127.0.0.1:8080/responsaveis", { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}  


function deletarProduto() {
   


    // Envia os dados via fetch
    fetch("http://127.0.0.1:8080/responsaveis", { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
} 


