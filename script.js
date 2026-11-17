// =========================================
// LÓGICA EXCLUSIVA DA PASSAGEM DE TURNO
// =========================================

const inputAvaria = document.getElementById('avaria');
const textoUpload = document.querySelector('.upload-text');
const textoOriginal = textoUpload ? textoUpload.textContent : '';
const iconesDireita = document.querySelector('.upload-icons'); 
const btnRemover = document.querySelector('.btn-remover');

if (inputAvaria) {
    inputAvaria.addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            const arquivo = event.target.files[0];
            const nomeArquivo = arquivo.name;
            const tipoMime = arquivo.type;
            const estiloSVG = 'width="16" height="16" style="vertical-align: middle; margin-right: 6px; margin-bottom: 2px;" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

            let iconeSVG = `<svg ${estiloSVG} viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
            
            if (tipoMime.startsWith('image/')) {
                iconeSVG = `<svg ${estiloSVG} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
            } else if (tipoMime.startsWith('video/')) {
                iconeSVG = `<svg ${estiloSVG} viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`;
            }

            let tamanho = (arquivo.size / 1024).toFixed(1) + ' KB';
            if (arquivo.size > 1024 * 1024) {
                tamanho = (arquivo.size / (1024 * 1024)).toFixed(1) + ' MB';
            }
            
            textoUpload.innerHTML = `${iconeSVG} ${nomeArquivo} - ${tamanho}`;
            textoUpload.style.color = '#FFFFFF'; 
            iconesDireita.style.display = 'none';
            btnRemover.style.display = 'flex'; 
        }
    });
}

if (btnRemover) {
    btnRemover.addEventListener('click', function(event) {
        event.preventDefault(); 
        inputAvaria.value = ''; 
        textoUpload.textContent = textoOriginal;
        textoUpload.style.color = 'rgba(255, 255, 255, 0.4)';
        iconesDireita.style.display = 'flex';
        btnRemover.style.display = 'none';
    });
}

const caixaRelatorio = document.getElementById('relatorio');
let tempoRolagem;

if (caixaRelatorio) {
    caixaRelatorio.addEventListener('scroll', function() {
        caixaRelatorio.classList.add('em-movimento');
        clearTimeout(tempoRolagem);
        tempoRolagem = setTimeout(function() {
            caixaRelatorio.classList.remove('em-movimento');
        }, 1000); 
    });
}

const formulario = document.querySelector('.form-postlog');
const inputControlador = document.getElementById('controlador');
const btnPassagem = document.querySelector('.btn-passagem'); 

if (formulario && inputControlador && btnPassagem) {
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const nomeControlador = inputControlador.value.trim();

        if (nomeControlador === '') {
            alert('⚠️ ATENÇÃO: É obrigatório identificar o Controlador Assumindo antes de iniciar o plantão.');
            inputControlador.style.borderColor = '#ff4a4a';
            inputControlador.focus();
            inputControlador.addEventListener('input', function() {
                inputControlador.style.borderColor = ''; 
            }, { once: true });
            return; 
        }

        const conteudoOriginalBotao = btnPassagem.innerHTML;
        const iconeSucesso = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-left: 8px; margin-bottom: 2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        
        btnPassagem.innerHTML = `PASSAGEM REGISTRADA ${iconeSucesso}`;
        btnPassagem.style.backgroundColor = '#5AB9A8'; 
        btnPassagem.style.color = '#FFFFFF'; 
        btnPassagem.style.border = '1px solid #5AB9A8'; 
        btnPassagem.style.transform = 'scale(0.98)'; 

        setTimeout(function() {
            alert(`Até o próximo plantão, ${nomeControlador}! Registos guardados com sucesso no sistema.`);
            formulario.reset(); 
            textoUpload.textContent = textoOriginal;
            textoUpload.style.color = 'rgba(255, 255, 255, 0.4)';
            iconesDireita.style.display = 'flex';
            btnRemover.style.display = 'none';
            btnPassagem.innerHTML = conteudoOriginalBotao;
            btnPassagem.style.backgroundColor = ''; 
            btnPassagem.style.color = '';
            btnPassagem.style.border = '';
            btnPassagem.style.transform = '';
        }, 1500); 
    });
}