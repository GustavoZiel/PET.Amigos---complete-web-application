document.addEventListener('DOMContentLoaded', function() {
    // Função para validar o formulário
    function validateForm(event) {
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("senha_conf").value;
        if (password !== confirmPassword) {
            var myModal = new bootstrap.Modal(document.getElementById('errorModal'), {
                keyboard: false
            });
            myModal.show();
            event.preventDefault();
        }
    }

    // Função para alternar campos com base no tipo de conta
    function toggleFields() {
        const accountType = document.getElementById('accountType').value;
        const ongFields = document.querySelector('.ong-fields');
        const userFields = document.querySelector('.user-fields');
        const form = document.getElementById('signupForm');

        if (accountType === 'ong') {
            ongFields.style.display = 'block';
            userFields.style.display = 'none';
            form.action = '/ongs'; // Alterar o action do formulário para /ongs
        } else if (accountType === 'user') {
            ongFields.style.display = 'none';
            userFields.style.display = 'block';
            form.action = '/users'; // Alterar o action do formulário para /users
        } else {
            ongFields.style.display = 'none';
            userFields.style.display = 'none';
        }
    }

    // Adiciona os event listeners
    document.getElementById('accountType').addEventListener('change', toggleFields);
    document.getElementById('signupForm').addEventListener('submit', validateForm);

    // Chama toggleFields na carga da página para definir os campos corretos com base na opção selecionada por padrão
    toggleFields();
});
