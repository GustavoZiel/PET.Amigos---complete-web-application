
document.addEventListener('DOMContentLoaded', function() {
    // Função para enviar o formulário
    async function submitForm(event) {
        event.preventDefault();
        const form = document.getElementById('signinForm');
        const formData = new FormData(form);
        const accountType = document.getElementById('accountType').value;

        console.log(formData);

        let url = '';
        if (accountType === 'ong') {
            formData.append('role', 'ONG');
            url = 'http://localhost:3000/signin_ongs';
        } else if (accountType === 'user') {
            formData.append('role', 'USER');
            url = 'http://localhost:3000/signin_users';
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.token);
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

    // Adiciona o event listener para o formulário de inscrição
    document.getElementById('signinForm').addEventListener('submit', submitForm);
});










