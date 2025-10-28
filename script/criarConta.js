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
        alert('Conta registrada com sucesso!');
    });
}); 

//function criarconta() {
    //const nome = document.getElementById("usuario").value;
    //const senha = document.getElementById("senha").value;
    //const email = document.querySelector('input[type="email"]').value;

    //if(nome === ""){
        //alert("Você precisa preencher o campo nome");
    //}

    //if(senha === ""){
      //alert("Você precisa preencher o campo senha");
    //}

    //if(email === ""){
        //alert("Você precisa preencher o campo email");
    //}

    //alert(nome + " - " + senha + " - " + email);
//}


function concluir() {
    fetch('http://127.0.0.1:8080/responsaveis', {
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}

function salvar() {
    fetch('http://127.0.0.1:8080/responsaveis', {
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}

function deletar() {
    fetch('http://127.0.0.1:8080/responsaveis', {
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}
