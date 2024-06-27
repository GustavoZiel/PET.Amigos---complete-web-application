document.addEventListener('DOMContentLoaded', function () {

    const statesSelect = document.querySelector('#stateSelect');
    statesSelect.addEventListener('change', selectCityByState);
    selectCityByState();

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
        const ongFields = document.querySelectorAll('.ong-fields');
        const ongInput = document.querySelectorAll('.ong-input');
        const userInput = document.querySelectorAll('.user-input');
        const userFields = document.querySelector('.user-fields');

        if (accountType === 'ong') {
            ongFields.forEach(field => {
                field.style.display = 'block';
            });
            userInput.forEach(field => {
                field.required = false;
            });
            ongInput.forEach(field => {
                field.required = true;
            });
            userFields.style.display = 'none';
        } else if (accountType === 'user') {
            ongFields.forEach(field => {
                field.style.display = 'none';
            });
            userInput.forEach(field => {
                field.required = true;
            });
            ongInput.forEach(field => {
                field.required = false;
            });
            userFields.style.display = 'block';
        } else {
            userFields.style.display = 'none';
        }
    }

    // Função para enviar o formulário
    async function submitForm(event) {
        event.preventDefault();
        const form = document.getElementById('signupForm');
        const formData = new FormData(form);
        const accountType = document.getElementById('accountType').value;

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
                localStorage.setItem('token', data.token);
                const token_test = localStorage.getItem('token');
                if (accountType === 'ong') {
                    localStorage.setItem('role', "ONG");
                } else if (accountType === 'user') {
                    localStorage.setItem('role', "USER");
                }
                window.location.href = 'home.html';
            } else {
                var myModal = new bootstrap.Modal(document.getElementById('errorsigning'), {
                    keyboard: false
                });
                const text = await response.text()
                document.getElementById('errorMessage').textContent = text;
                myModal.show();
                event.preventDefault();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Adiciona os event listeners
    document.getElementById('accountType').addEventListener('change', toggleFields);
    document.getElementById('signupForm').addEventListener('submit', function (event) {
        validateForm(event);
        if (!event.defaultPrevented) { // If form validation is successful
            submitForm(event);
        }
    });

    // Chama toggleFields na carga da página para definir os campos corretos com base na opção selecionada por padrão
    toggleFields();
});

async function selectCityByState() {
    const statesSelect = document.querySelector('#stateSelect');
    const citySelect = document.querySelector('#citySelect');
    
    const selectedState = statesSelect.value;
    const cities = await fetchCitiesByState(selectedState);

    citySelect.innerHTML = '';

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

async function fetchCitiesByState(state) {
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`);
        const data = await response.json();
        return data.map(distrito => distrito.nome);
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        return [];
    }
}