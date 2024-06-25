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

    

    // Função para enviar o formulário
    async function submitForm(event) {
        event.preventDefault();
        const form = document.getElementById('changePasswordForm');
        const formData = new FormData(form);
        const accountType = document.getElementById('accountType').value;

        console.log(formData);

        let url = '';
        if (accountType === 'ong') {
            url = 'http://localhost:3000/user_password';
        } else if (accountType === 'user') {
            url = 'http://localhost:3000/ong_password';
        }

        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: formData,

            });


            if (response.ok) {
                const data = await response.json();
                console.log(data.token)
                localStorage.setItem('token', data.token);
                const token_test = localStorage.getItem('token');
                console.log(token_test);
                window.location.href = 'login.html';
            } else {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Adiciona os event listeners
    document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
        validateForm(event);
        if (!event.defaultPrevented) { // If form validation is successful
            submitForm(event);
        }
    });

    // Chama toggleFields na carga da página para definir os campos corretos com base na opção selecionada por padrão
    toggleFields();
});
