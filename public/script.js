// Alternar entre Login e Registro
const showLoginButton = document.getElementById('show-login');
const showRegisterButton = document.getElementById('show-register');
const loginFormContainer = document.getElementById('login-form-container');
const registerFormContainer = document.getElementById('register-form-container');

// Mostrar formulário de Login por padrão
loginFormContainer.classList.add('active');

// Alternar para o formulário de Login
showLoginButton.addEventListener('click', () => {
    loginFormContainer.classList.add('active');
    registerFormContainer.classList.remove('active');
    showLoginButton.classList.add('active');
    showRegisterButton.classList.remove('active');
});

// Alternar para o formulário de Registro
showRegisterButton.addEventListener('click', () => {
    loginFormContainer.classList.remove('active');
    registerFormContainer.classList.add('active');
    showLoginButton.classList.remove('active');
    showRegisterButton.classList.add('active');
});

// Função de Registro
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirm_password) {
        alert("As senhas não coincidem!");
        return;
    }

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        showMessage(data.message);
        if (data.message === "Usuário registrado com sucesso!") {
            this.reset();
        }
    });
});

// Função de Login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        showMessage(data.message);
    });
});

// Exibir mensagem temporária no centro da tela
function showMessage(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.innerText = message;
    messageBox.style.display = 'block';

    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 2000);
}

// Mostrar/Ocultar senha
document.querySelectorAll('.toggle-password').forEach(item => {
    item.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);

        this.innerHTML = type === 'password' ? '<i class="fa fa-eye"></i>' : '<i class="fa fa-eye-slash"></i>';
    });
});
