document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const select = document.getElementById("modalidade");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio real do formulário

    const tipoServico = select.value;

    if (tipoServico) {
      alert("Você selecionou: " + tipoServico);
      // Aqui você pode redirecionar ou salvar a escolha
    } else {
      alert("Por favor, selecione um tipo de serviço.");
    }
  });
});
