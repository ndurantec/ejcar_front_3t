document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signaturePad');
    const clearBtn = document.getElementById('clearSignature');
    const ctx = canvas.getContext('2d');
    
    function initCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 200;
        
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#000';
        ctx.fillStyle = '#f9f9f9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    initCanvas();
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    function startDrawing(e) {
        isDrawing = true;
        const pos = getPosition(e);
        [lastX, lastY] = [pos.x, pos.y];
        
        e.preventDefault();
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        [lastX, lastY] = [pos.x, pos.y];
        
        e.preventDefault();
    }
    
    function stopDrawing() {
        isDrawing = false;
    }

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        
        if (e.type.includes('touch')) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    
    function clearSignature() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f9f9f9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000'; 
    }
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    
                   // Botão limpar//
    clearBtn.addEventListener('click', clearSignature);
    
    window.addEventListener('resize', initCanvas);
    
    const concluirBtn = document.getElementById('concluirBtn');
    concluirBtn.addEventListener('click', function() {
        alert('Vistoria registrada com sucesso! Obrigado.');
    });
}); 

const botaoConcluir = document.getElementById('botaoconcluir');
    function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}

function limparErros() {
    mostrarErro('erro-step', '');
    mostrarErro('erro-macaco', '');
    mostrarErro('erro-chave', '');
}

function validarCheckbox() {
    limparErros();

    let step = document.getElementById("boxstep").checked;
    let macaco = document.getElementById("boxmacaco").checked;
    let chave = document.getElementById("boxchave").checked;
    let descricao = document.getElementById("descricao").value;
    let proprietario = document.getElementById("proprietario").value;
    let marcaModelo = document.getElementById("marcaModelo").value;
    let placa = document.getElementById("placa").value;
    let termo = document.getElementById("termoAceite").checked;

    console.log("Step:", step);
    console.log("Macaco:", macaco);
    console.log("Chave de Roda:", chave);
    console.log("Outros itens:", descricao);
    console.log("Proprietário:", proprietario);
    console.log("Marca/Modelo:", marcaModelo);
    console.log("Placa:", placa);
    console.log("Termo aceito:", termo);

    let ok = true;

    if (!step) {
        mostrarErro('erro-step', 'Verifique se possui step para continuar.');
        ok = false;
    } 

    if (!macaco) {
        mostrarErro('erro-macaco', 'Verifique se possui macaco para continuar.');
        ok = false;
    } 

    if (!chave) {
        mostrarErro('erro-chave', 'Verifique se possui chave para continuar.');
        ok = false;
    } 

        if (descricao.trim() === '') {
        mostrarErro('erro-descricao', 'Descreva os outros itens!');
        ok = false;
    }

    if (ok) {
        alert('Formulário enviado com sucesso!');
    }

    if (!termo) {
        mostrarErro('erro-termo', 'Aceite os termos para continuar!');
        ok = false;
    }

    if (ok) {
        alert('✅ Vistoria concluída com sucesso!');
    }

    return ok;
}
botaoConcluir.addEventListener('click', validarCheckbox);



function concluir() {
    function concluirVistoria() {

        if (!validarFormulario()) return;
    
        const dados = coletarDados();
        //console.log("Enviando criar conta:", dados);
    
        console.log(JSON.stringify(dados));
    
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
    
        fetch('http://localhost:8080/usuario/insert', {
            
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
            localStorage.setItem("id_professor", data.id);
            // mostrarMensagem(data.message || "✅ Professor cadastrado com sucesso!", "sucesso");
          }
        })
        .catch(error => console.error(error));
    }
    
}



function validarFormulario() {
    //limparErros();
    // Captura dos valores do formulário
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirme = document.getElementById("confirme").value;


    let ok = true;

    if (!nome) { mostrarErro('erro-nome', 'Verifique se possui nome para continuar.'); ok = false; }
    if (!cpf) { mostrarErro('erro-cpf', 'Verifique se possui cpf para continuar.'); ok = false; }
    if (!telefone) { mostrarErro('erro-telefone', 'Verifique se possui nome para continuar.'); ok = false; }
    if (!email) { mostrarErro('erro-email', 'Verifique se possui email para continuar.'); ok = false; }
    if (!senha) { mostrarErro('erro-senha', 'Verifique se possui senha para continuar.'); ok = false; }
    if (!confirme) { mostrarErro('erro-confirme', 'Verifique se possui confirme senha para continuar.'); ok = false; }

    return ok;
}



function coletarDados() {
  
    return {
        nome: document.getElementById("nome").value.trim(),
        cpf: document.getElementById("cpf").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        email: document.getElementById("email").value.trim(),
        user: document.getElementById("usuario").value.trim(),
        password: document.getElementById("senha").value.trim(),
        confirmarSenha: document.getElementById("confirme").value.trim(),
        imagemBase64:  document.getElementById('signaturePad').toDataURL(),// converte assinatura para Base64

    };
}


function salvar() {
limparErros();

    let step = document.getElementById("boxstep").checked;
    let macaco = document.getElementById("boxmacaco").checked;
    let chave = document.getElementById("boxchave").checked;
    let descricao = document.getElementById("descricao").value;
    let proprietario = document.getElementById("proprietario").value;
    let marcaModelo = document.getElementById("marcaModelo").value;
    let placa = document.getElementById("placa").value;
    let termo = document.getElementById("termoAceite").checked;

    console.log("Step:", step);
    console.log("Macaco:", macaco);
    console.log("Chave de Roda:", chave);
    console.log("Outros itens:", descricao);
    console.log("Proprietário:", proprietario);
    console.log("Marca/Modelo:", marcaModelo);
    console.log("Placa:", placa);
    console.log("Termo aceito:", termo);

    let ok = true;

    if (!step) {
        mostrarErro('erro-step', 'Verifique se possui step para continuar.');
        ok = false;
    } 

    if (!macaco) {
        mostrarErro('erro-macaco', 'Verifique se possui macaco para continuar.');
        ok = false;
    } 

    if (!chave) {
        mostrarErro('erro-chave', 'Verifique se possui chave para continuar.');
        ok = false;
    } 

        if (descricao.trim() === '') {
        mostrarErro('erro-descricao', 'Descreva os outros itens!');
        ok = false;
    }

    if (ok) {
        alert('Formulário enviado com sucesso!');
    }

    if (!termo) {
        mostrarErro('erro-termo', 'Aceite os termos para continuar!');
        ok = false;
    }

    if (ok) {
        alert('✅ Vistoria concluída com sucesso!');
    }


    fetch('http://localhost:8080/vistoria/insert', {
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}




function deletar() {
    fetch('http://localhost:8080/vistoria/{id}', {
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}



function atualizar() {
    fetch('http://localhost:8080/vistoria/{id}', {
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}
