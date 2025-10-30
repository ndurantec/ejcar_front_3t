function logar() {
   
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;

     
    console.log("Usuário:", usuario);
    console.log("Senha:", senha);
    console.log("Email:", email);

    document.getElementById('erro-usuario').textContent = '';
    document.getElementById('erro-senha').textContent = '';
    document.getElementById('erro-email').textContent = '';

   
    if (usuario === '') {
       document.getElementById('erro-usuario').textContent = 'Preencha o usuário!';
    }

    if (senha === '') {
       document.getElementById('erro-senha').textContent = 'Preencha a senha!';
    }

    if (email === '') {
       document.getElementById('erro-email').textContent = 'Preencha o email!';
    }

       fetch('http://127.0.0.1:8080/responsaveis', { 
         
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function buscarVistoria() {

   var headers = new Headers();
   headers.append("Content-Type", "application/json");
   headers.append("Access-Control-Allow-Origin", "*");

   fetch("http://localhost:8080/vistoria/autenticar" , {

     method: "GET",
     mode: "cors",
     cache: "no-cache",
     
      
     headers: headers

   }).then(response => {
     if (!response.ok) {
       throw new Error("dados lidos!");
     }
     return response.json(); // <- converte o corpo da resposta em JSON
   }).then(  data =>  {

     const vistoria_id = data.id;
     console.log("dados lidos com sucesso: ", vistoria_id);

     localStorage.setItem('id_vistoria', vistoria_id);

   }).catch(error => console.error('Erro ao ler os dados!:', error));

}



