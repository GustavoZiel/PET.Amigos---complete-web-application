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

        console.log(accountType)
        console.log(ongFields)
        console.log(userFields)
        

        if (accountType === 'ong') {
            ongFields.style.display = 'block';
            userFields.style.display = 'none';
        } else if (accountType === 'user') {
            ongFields.style.display = 'none';
            userFields.style.display = 'block';
        } else {
            ongFields.style.display = 'none';
            userFields.style.display = 'none';
        }
    }

    // Função para enviar o formulário
    async function submitForm(event) {
        event.preventDefault();
        const form = document.getElementById('signupForm');
        const formData = new FormData(form);
        const accountType = document.getElementById('accountType').value;

        console.log(formData);

        let url = '';
        if (accountType === 'ong') {
            formData.append('role', 'ONG');
            url = 'http://localhost:3000/signup_ongs';
        } else if (accountType === 'user') {
            formData.append('role', 'USER');
            url = 'http://localhost:3000/signup_users';
        }

        //formData.set('photo', 'foto aqui');

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,

            });

            /* axios.post(url, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            }).then(res => {
                const data = res;
                console.log(data.token)
                localStorage.setItem('token', data.token);
                const token_test = localStorage.getItem('token');
                console.log(token_test);
                window.location.href = 'home.html';
            }) */

            if (response.ok) {
                const data = await response.json();
                console.log(data.token)
                localStorage.setItem('token', data.token);
                const token_test = localStorage.getItem('token');
                console.log(token_test);
                window.location.href = 'home.html';
            } else {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Adiciona os event listeners
    document.getElementById('accountType').addEventListener('change', toggleFields);
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        validateForm(event);
        if (!event.defaultPrevented) { // If form validation is successful
            submitForm(event);
        }
    });

    // Chama toggleFields na carga da página para definir os campos corretos com base na opção selecionada por padrão
    toggleFields();
});
