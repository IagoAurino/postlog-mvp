// =========================================
// LÓGICA EXCLUSIVA DO LOGIN
// =========================================

const formLogin = document.querySelector('.form-postlog');
const inputMatricula = document.getElementById('matricula');
const inputSenha = document.getElementById('senha');
const btnLogin = document.querySelector('.btn-login');
const toggleSenha = document.getElementById('togglePassword'); // ID alinhado com o novo HTML

// =========================================
// LÓGICA DE MOSTRAR/OCULTAR SENHA
// =========================================
if (toggleSenha && inputSenha) {
    toggleSenha.addEventListener('click', function() {
        // Verifica se atualmente está como password ou texto
        const tipoAtual = inputSenha.getAttribute('type');
        
        if (tipoAtual === 'password') {
            // Mostra a senha e muda o ícone para o "olho aberto" (Minimalista)
            inputSenha.setAttribute('type', 'text');
            toggleSenha.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
            toggleSenha.style.color = '#5AB9A8'; // Fica verde
        } else {
            // Esconde a senha e volta ao "olho fechado com traço" (Minimalista)
            inputSenha.setAttribute('type', 'password');
            toggleSenha.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
            toggleSenha.style.color = 'rgba(255, 255, 255, 0.4)'; // Volta à cor original
        }
    });
}

// =========================================
// LÓGICA DA PASSAGEM DE TURNO E MODAL
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    // Captura os elementos
    const formPassagem = document.querySelector('.form-postlog');
    const modal = document.getElementById('modal-sucesso');
    const btnFecharModal = document.getElementById('btn-fechar-modal');

    // Se estivermos na tela de passagem de turno, ativa o código
    if (formPassagem && modal && btnFecharModal) {
        
        formPassagem.addEventListener('submit', function(event) {
            // Impede o formulário de recarregar a página imediatamente
            event.preventDefault();
            
            // Aqui, no futuro, ficará o código para enviar os dados para o Firebase
            // ...
            
            // Ativa o visual do modal adicionando a classe "ativo"
            modal.classList.add('ativo');
        });

        // O que acontece quando o utilizador clica em "OK, CONTINUAR"
        btnFecharModal.addEventListener('click', function() {
            // Oculta o modal
            modal.classList.remove('ativo');
            
            // Opcional: Limpa os campos do formulário para o próximo turno
            formPassagem.reset();
            
            // Se quiser que volte para a tela de login após fechar, descomente a linha abaixo:
            // window.location.href = 'login.html';
        });
    }
});