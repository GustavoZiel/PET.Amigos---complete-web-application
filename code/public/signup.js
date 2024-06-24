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

function selectCityByState() {
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const selectedState = stateSelect.value;
    const cities = citiesByState[selectedState] || [];

    citySelect.innerHTML = '';

    if (cities.length > 0) {
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Selecione uma Cidade';
        citySelect.appendChild(option);
    }
}

const citiesByState = {
    SP: ["São Carlos", "Araraquara", "São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "São José dos Campos", "Sorocaba", "Ribeirão Preto", "Santos", "Osasco"],
    RJ: ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "Campos dos Goytacazes", "São João de Meriti", "Petrópolis", "Volta Redonda"],
    MG: ["Araxá", "Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba", "Governador Valadares", "Ipatinga"],
    ES: ["Serra", "Vila Velha", "Cariacica", "Vitória", "Linhares", "Colatina", "São Mateus", "Cachoeiro de Itapemirim", "Aracruz", "Guarapari"],
    DF: ["Brasília", "Taguatinga", "Ceilândia", "Samambaia", "Planaltina", "Gama", "Santa Maria", "Recanto das Emas", "Guará", "São Sebastião"],
    GO: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás", "Valparaíso de Goiás", "Trindade", "Formosa", "Novo Gama"],
    MT: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Sorriso", "Lucas do Rio Verde", "Primavera do Leste", "Cáceres", "Barra do Garças"],
    MS: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Naviraí", "Nova Andradina", "Paranaíba", "Sidrolândia", "Maracaju"],
    PR: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava", "Paranaguá"],
    SC: ["Joinville", "Florianópolis", "Blumenau", "São José", "Chapecó", "Itajaí", "Criciúma", "Jaraguá do Sul", "Lages", "Palhoça"],
    RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo", "Rio Grande"]
};
