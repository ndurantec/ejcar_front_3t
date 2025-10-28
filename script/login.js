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
