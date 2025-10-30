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

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


      fetch('http://127.0.0.1:8080/login/autenticar', { 

         method: "GET",
         mode: "cors",
         cache: "no-cache",

         body: JSON.stringify({

            user: usuario,
            email: email,
            password: senha
        }),
         

      headers: headers

   }).then(response => {
      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }
      return response.json(); // <- converte o corpo da resposta em JSON
    }).then(  data =>  {
  
      const usuario_id = data.id;
      console.log("Id do registro buscado: ", usuario_id);
  
      localStorage.setItem('id_usuario', usuario_id);
  
    }).catch(error => console.error('Erro!:', error));




   //  fetch("http://localhost:8080/login/1" , {
 
   //    method: "DELETE",
   //    mode: "cors",
   //    cache: "no-cache",
 
   //    body: JSON.stringify({
   //      fluxo: "entrada",
   //      step: "n",
   //      chaveDeRoda: "n",
   //      macaco: "n",
   //      outro: "outro",
   //      termo: "false",
   //      equipamentos: "S",
   //      idUsuario : 1,
   //      servico : {
   //          id : 1
   //      }
   //  }),
       
   //    headers: headers

   //  }).then(response => {
   //    if (!response.ok) {
   //      throw new Error("Erro ao excluir");
   //    }
   //    return response.json(); // <- converte o corpo da resposta em JSON
   //  }).then(  data =>  {
 
   //    const vistoria_id = data.id;
   //    console.log("excluído com sucesso: ", vistoria_id);
 
   //    localStorage.setItem('id_vistoria', vistoria_id);
 
   //  }).catch(error => console.error('Erro ao excluir!:', error));
  
}

<<<<<<< HEAD
=======

>>>>>>> 80961fff9bd3e494311e0e1ae1f5a9954815831a
function buscarVistoria() {

   var headers = new Headers();
   headers.append("Content-Type", "application/json");
   headers.append("Access-Control-Allow-Origin", "*");

   fetch("http://localhost:8080/vistoria/autenticar" , {

     method: "GET",
     mode: "cors",
     cache: "no-cache",
<<<<<<< HEAD


     body: JSON.stringify({

      //     fluxo: "entrada",
      //     step: "n",
      //     chaveDeRoda: "n",
      //     macaco: "n",
      //     outro: "outro",
      //     termo: "false",
      //     equipamentos: "S",
      //     idUsuario : 1,
      //     servico : {
      //         id : 1
      //     }

   }),

     headers: headers


=======
     
      
     headers: headers

>>>>>>> 80961fff9bd3e494311e0e1ae1f5a9954815831a
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


<<<<<<< HEAD
=======

>>>>>>> 80961fff9bd3e494311e0e1ae1f5a9954815831a
