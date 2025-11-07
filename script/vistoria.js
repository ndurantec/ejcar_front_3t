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
    
    // Centralizar o combobox e atualizar o termo quando uma opção for selecionada
    const comboboxContainer = document.querySelector('.combobox-container');
    if (comboboxContainer) {
        comboboxContainer.style.display = 'flex';
        comboboxContainer.style.flexDirection = 'column';
        comboboxContainer.style.alignItems = '';
        comboboxContainer.style.marginBottom = '10px';
    }
    
    const modalidadeSelect = document.getElementById('modalidade');
    if (modalidadeSelect) {
        modalidadeSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value) {
                document.getElementById('marcaModelo').textContent = selectedOption.text.trim();
            }
        });
    }
}); 

const botaoConcluir = document.getElementById('botaoconcluir');
    function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}





function limparErros() {
    mostrarErro('erro-step', '');
    mostrarErro('erro-macaco', '');
    mostrarErro('erro-chave', '');
    mostrarErro('erro-descricao', '');
    mostrarErro('erro-termo', '');
}



function validarCheckbox() {
    limparErros();

    let step = document.getElementById("boxstep").checked;
    let macaco = document.getElementById("boxmacaco").checked;
    let chave = document.getElementById("boxchave").checked;
    let descricao = document.getElementById("boxdescricao").value;
    let proprietario = document.getElementById("boxproprietario").value;
    let marcaModelo = document.getElementById("bxmarcaModelo").value;
    let placa = document.getElementById("boxplaca").value;
    let termo = document.getElementById("boxtermoAceite").checked;

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




function validarFormulario() {

    // Captura dos valores do formulário
    let step = document.getElementById("step").value;
    let macaco = document.getElementById("macaco").value;
    let chaveDeRoda = document.getElementById("chaveDeRoda").value;
    let equipamentos = document.getElementById("equipamentos").value;
    let outrosItens = document.getElementById("outrosItens").value;
    let termo = document.getElementById("termo").value;
    let assinatura = document.getElementById("assinatura").value;


    let ok = true;

    if (!step) { mostrarErro('erro-step', 'Verifique se possui step para continuar.'); ok = false; }
    if (!macaco) { mostrarErro('erro-macaco', 'Verifique se possui macaco para continuar.'); ok = false; }
    if (!chaveDeRoda) { mostrarErro('erro-chaveDeRoda', 'Verifique se possui chaveDeRoda para continuar.'); ok = false; }
    if (!equipamentos) { mostrarErro('erro-equipamentos', 'Verifique se possui equipamentos para continuar.'); ok = false; }
    if (!outrosItens) { mostrarErro('erro-outrosItens', 'Verifique se possui outrosItens para continuar.'); ok = false; }
    if (!termo) { mostrarErro('erro-termo', 'Verifique se aceitou o termo para continuar.'); ok = false; }
    if (!assinatura) { mostrarErro('erro-assinatura', 'Verifique se a assinatura está preenchida para continuar.'); ok = false; }
    return ok;
}



function coletarDados() {
  
    return {
        step: document.getElementById("boxstep").checked,
        chaveDeRoda: document.getElementById("boxchaveDeRoda").value.trim(),
        macaco: document.getElementById("boxmacaco").value.trim(),
        equipamentos: document.getElementById("boxequipamentos").value.trim(),
        outrosItens: document.getElementById("boxoutrosItens").value.trim(),
        termo: document.getElementById("boxtermo").value.trim(),
        imagemBase64:  document.getElementById('signaturePad').toDataURL(),// converte assinatura para Base64
        idUsuario: localStorage.getItem("id_usuario")
    };
}



function salvar() {

    function mostrarErro(idElemento, mensagem) {
        document.getElementById(idElemento).textContent = mensagem;
    }
    function limparErros() {
        let erros = document.querySelectorAll('.erro');
        erros.forEach(e => e.textContent = '');
    }

    console.log("A função 'salvar' foi chamada e está executando a lógica de salvar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/vistoria/insert', {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',

        body: JSON.stringify (dados),
    
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
        localStorage.setItem("id_usuario", data.id);
        mostrarMensagem(data.message || "✅ Vistoria cadastrada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));

}



function deletar() {


    function mostrarErro(idElemento, mensagem) {
        document.getElementById(idElemento).textContent = mensagem;
    }
    function limparErros() {
        let erros = document.querySelectorAll('.erro');
        erros.forEach(e => e.textContent = '');
    }

    console.log("A função 'deletar' foi chamada e está executando a lógica de deletar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/vistoria/id', {
        
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',

        body: JSON.stringify (dados),
    
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
        localStorage.setItem("id_usuario", data.id);
        mostrarMensagem(data.message || "✅ Vistoria deletada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));

}




function atualizar() {


     function mostrarErro(idElemento, mensagem) {
        document.getElementById(idElemento).textContent = mensagem;
    }
    function limparErros() {
        let erros = document.querySelectorAll('.erro');
        erros.forEach(e => e.textContent = '');
    }

    console.log("A função 'atualizar' foi chamada e está executando a lógica de atualizar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/vistoria/id', {
        
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',

        body: JSON.stringify (dados),
    
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
        localStorage.setItem("id_usuario", data.id);
        mostrarMensagem(data.message || "✅ Vistoria atualizada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));

}