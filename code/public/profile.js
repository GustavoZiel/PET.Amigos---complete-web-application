const getParameterByName = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

document.addEventListener('DOMContentLoaded', async () => {
    const userId = getParameterByName('id'); // Extrai o ID da URL
    if (userId) {
        try {
            const response = await fetch(`/users/${userId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do usuário');
            }
            const user = await response.json();
            // Discovering if the owner of the account is the one logged
            let owner = 0;
            token = localStorage.getItem('token')
            if (token) {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const parts = token.split('.');
                    const payload = parts[1];
                    const decodedPayload = atob(payload);
                    const attributes = JSON.parse(decodedPayload);
                    const userIDFromToken = attributes.sub;
                    const userEmailFromToken = attributes.email;
                    if (userId == userIDFromToken && userEmailFromToken === user.email) {
                        owner = 1;
                    }
                    role = localStorage.getItem('role')
                    if (role === "USER") {
                        isuser = userIDFromToken;
                    }
                }
            }
            const userimage = await fetchImage(user.photo);
            const profileSection = document.getElementById('profile-section');
            const profileCard = createProfileCard(user, userimage, owner);
            const botaoremove = profileCard.querySelectorAll(".btn-remove");
            const botaoedit = profileCard.querySelectorAll(".btn-edit");
            const logout = profileCard.querySelectorAll('.btn-logout')
            logout.forEach(log => {
                log.addEventListener('click', function () {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    window.location.href = 'home.html';
                });
            }
            )
            botaoremove.forEach(botao => {
                if (!owner) {
                    botao.style.display = 'none';
                }
            });
            botaoedit.forEach(botao => {
                if (!owner) {
                    botao.style.display = 'none';
                }
            });

            profileSection.appendChild(profileCard);

            const likedSection = document.getElementById('liked-section');
            const likedPetsCard = await createLikedPetsCard(isuser, userId);
            likedSection.appendChild(likedPetsCard);
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    } else {
        console.error('ID do usuário não encontrado na URL.');
    }
});
async function fetchImage(url) {
    try {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}
function createProfileCard(user, userimage, owner) {
    const idade = calculateAge(user.birthDate)
    const profileCard = document.createElement('div');
    profileCard.innerHTML = `
        <section>
            <!-- Foto e informações do Usuário -->
            <div class="container-fluid row bg-light pt-4">
                <!-- Informações (Mobile) -->
                <div class="col-12 order-1">
                    <!-- Nome do Usuário -->
                    <div class="font-name d-flex d-md-none justify-content-center">${user.userName}</div>
                    <div class="font-name d-flex d-md-none zjustify-content-center">
                        <button type="button" class="btn-logout ms-2 text-nowrap owner" data-bs-toggle="modal" data-bs-target="#logoutOng"><i class="fa fa-power-off"></i></button>
                        <button type="button" class="btn-edit ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#petAdotar"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button type="button" class="btn-remove ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#removeUser"><i class="fa-solid fa-trash-can"></i></button>
                    </div>

                    <!-- Dados -->
                    <div class="container-fluid d-sm-flex justify-content-start pt-4">
                        <!-- Localização -->
                        <div class="d-md-none pb-2 pe-5 pb-sm-0">
                            <div class="font-type-info">LOCALIZAÇÃO</div>
                            <div class="font-info">${user.city}, ${user.state}</div>
                        </div>

                        <!-- Idade -->
                        <div class="d-md-none pb-sm-0">
                            <div class="font-type-info">Idade</div>
                            <div class="font-info">${idade} anos</div>
                        </div>
                    </div>
                    <div class="container-fluid d-sm-flex justify-content-start">
                        <!-- Animais -->
                        <div class="d-md-none pb-2 pe-5 pb-sm-0">
                            <div class="font-type-info">ANIMAIS PREFERIDOS</div>
                            <div id="preferences" class="font-info"></div>
                        </div>

                        <!-- Moradia -->
                        <div class="d-md-none pb-sm-0">
                            <div class="font-type-info">Moradia</div>
                            <div class="font-info">Prédio</div>
                        </div>
                    </div>

                    <!-- Sobre -->
                    <div class="container-fluid d-block d-md-none py-2">
                        <div class="font-type-info">SOBRE</div>
                        <div class="font-info">${user.about}</div>
                    </div>
                </div>

                <!-- Foto -->

                <div class="d-flex justify-content-center">
                    <div class="m-4">
                        <img src="${userimage}" alt="${user.userName}" id="foto" class="h-100 rounded-4 img-border imgPerfil-standard-size">
                    </div>
                    

                    <!-- Informações (Desktop) -->
                    <div class="m-4">
                        <!-- Nome do usuário -->
                        <div class="font-ong-name d-none d-md-flex align-items-center">
                            ${user.userName}
                            <div class="ps-5">
                                <button type="button" class="btn-logout ms-2 text-nowrap owner" data-bs-toggle="modal" data-bs-target="#logoutOng"><i class="fa fa-power-off"></i></button>
                                <button type="button" class="btn-edit ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#editUserModal"><i class="fa-regular fa-pen-to-square"></i></button>
                                <button type="button" class="btn-remove ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#removeUser"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>

                        <!-- Modal - Editar Usuário -->
                        <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="editUserModalLabel">Editar Usuário</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form enctype="multipart/form-data" id="editUserForm">


                                            <div class="form-group">
                                                <label for="email">E-mail</label>
                                                <input type="text" id="email" name="email" class="form-control" value="${user.email}" required>
                                            </div>

                                            <div class="form-group pt-3">
                                                <label for="userName">Nome completo</label>
                                                <input type="text" id="userName" name="userName" class="form-control user-input" value="${user.userName}" required>
                                            </div>

                                            <div class="form-group pt-3">
                                                <label for="birthDate">Data de nascimento</label>
                                                <input type="date" id="birthDate" name="birthDate" class="form-control user-input" value="${user.birthDate.substring(0, 10)}" required>
                                            </div>
                                            <div class="row pt-3 align-items-end">
                                                <span>Pets preferidos: </span>

                                                <div class="col-auto pt-2">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="preferences" value="Cachorros" ${user.preferences.includes('Cachorro') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="inlineCheckbox1">Cachorros</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="preferences" value="Gatos" ${user.preferences.includes('Gato') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="inlineCheckbox2">Gatos</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="preferences" value="Roedores" ${user.preferences.includes('Roedores') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="inlineCheckbox3">Roedores</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox4" name="preferences" value="Pássaros" ${user.preferences.includes('Pássaros') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="inlineCheckbox4">Pássaros</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="preferences" value="Outros" ${user.preferences.includes('Outros') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="inlineCheckbox5">Outros</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row pt-3 align-items-end">
                                                <span>Tipo moradia: </span>

                                                <div class="col-auto pt-2">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" id="moradiaRadio1" name="home" value="Casa" ${user.home.includes('Casa') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="moradiaRadio1">Casa</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" id="moradiaRadio2" name="home" value="Apartamento espaçoso" ${user.home.includes('Apartamento espaçoso') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="moradiaRadio2">Apartamento espaçoso</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" id="moradiaRadio3" name="home" value="Kitnet" ${user.home.includes('Kitnet') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="moradiaRadio3">Kitnet</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" id="moradiaRadio4" name="home" value="Sítio" ${user.home.includes('Sítio') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="moradiaRadio4">Sítio</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class=" pt-3">
                                                <label for="cidade" class="form-label">Cidade</label>
                                                <select class="form-select" id="citySelect" name="city" required>
                                                </select>
                                            </div>
                                            <div class=" pt-3">
                                                <label for="estado" class="form-label">Estado</label>
                                                <select class="form-select" id="stateSelect" name="state" required>
                                                    <option value="AC" ${user.state === 'AC' ? 'selected' : ''}>Acre</option>
                                                    <option value="AL" ${user.state === 'AL' ? 'selected' : ''}>Alagoas</option>
                                                    <option value="AP" ${user.state === 'AP' ? 'selected' : ''}>Amapá</option>
                                                    <option value="AM" ${user.state === 'AM' ? 'selected' : ''}>Amazonas</option>
                                                    <option value="BA" ${user.state === 'BA' ? 'selected' : ''}>Bahia</option>
                                                    <option value="CE" ${user.state === 'CE' ? 'selected' : ''}>Ceará</option>
                                                    <option value="DF" ${user.state === 'DF' ? 'selected' : ''}>Distrito Federal</option>
                                                    <option value="ES" ${user.state === 'ES' ? 'selected' : ''}>Espírito Santo</option>
                                                    <option value="GO" ${user.state === 'GO' ? 'selected' : ''}>Goiás</option>
                                                    <option value="MA" ${user.state === 'MA' ? 'selected' : ''}>Maranhão</option>
                                                    <option value="MT" ${user.state === 'MT' ? 'selected' : ''}>Mato Grosso</option>
                                                    <option value="MS" ${user.state === 'MS' ? 'selected' : ''}>Mato Grosso do Sul</option>
                                                    <option value="MG" ${user.state === 'MG' ? 'selected' : ''}>Minas Gerais</option>
                                                    <option value="PA" ${user.state === 'PA' ? 'selected' : ''}>Pará</option>
                                                    <option value="PB" ${user.state === 'PB' ? 'selected' : ''}>Paraíba</option>
                                                    <option value="PR" ${user.state === 'PR' ? 'selected' : ''}>Paraná</option>
                                                    <option value="PE" ${user.state === 'PE' ? 'selected' : ''}>Pernambuco</option>
                                                    <option value="PI" ${user.state === 'PI' ? 'selected' : ''}>Piauí</option>
                                                    <option value="RJ" ${user.state === 'RJ' ? 'selected' : ''}>Rio de Janeiro</option>
                                                    <option value="RN" ${user.state === 'RN' ? 'selected' : ''}>Rio Grande do Norte</option>
                                                    <option value="RS" ${user.state === 'RS' ? 'selected' : ''}>Rio Grande do Sul</option>
                                                    <option value="RO" ${user.state === 'RO' ? 'selected' : ''}>Rondônia</option>
                                                    <option value="RR" ${user.state === 'RR' ? 'selected' : ''}>Roraima</option>
                                                    <option value="SC" ${user.state === 'SC' ? 'selected' : ''}>Santa Catarina</option>
                                                    <option value="SP" ${user.state === 'SP' ? 'selected' : ''}>São Paulo</option>
                                                    <option value="SE" ${user.state === 'SE' ? 'selected' : ''}>Sergipe</option>
                                                    <option value="TO" ${user.state === 'TO' ? 'selected' : ''}>Tocantins</option>
                                                </select>
                                            </div>
                                                                                    
                                            <div class="form-group pt-3">
                                                <label for="about">Descrição</label>
                                                <input type="text" id="about" name="about" class="form-control" value="${user.about}" required>
                                            </div>
                                            
                                            <div class="form-group pt-3">
                                                <label for="phoneNumber">Número de telefone</label>
                                                <input type="text" id="phoneNumber" name="phoneNumber" class="form-control" value="${user.phoneNumber}" required>
                                            </div>

                                            <div class="row pt-3">
                                                <div class="d-flex justify-content-end">
                                                    <button class="btn btn-standard-click" type="submit" data-bs-dismiss="modal">Editar</button>
                                                </div>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal - Atualizar Usuário (Pop-up sucesso ao apagar) -->
                        <div class="modal fade" id="popUpCorretoEdit" tabindex="-1" aria-labelledby="popUpCorretoEditLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="popUpCorretoEditLabel">Sucesso</h5>
                                        <button id="redirectButtonEdit" type="button" class="btn-close" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Perfil de usuário atualizado com sucesso!
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal - Editar Usuário (Pop-up erro ao editar) -->
                        <div class="modal fade" id="popUpErroEdit" tabindex="-1" aria-labelledby="popUpErroEditLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="popUpErroEdit">Erro</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Falha ao editar o perfil de Usuário. Tente novamente mais tarde!
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal - Remover Usuário (Pop-up inicial) -->
                        <div class="modal fade" id="removeUser" tabindex="-1" aria-labelledby="removeUserLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="removeUserLabel">Deseja remover sua conta?</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Caso apague a conta, todos seus dados serão perdidos.

                                        <br>
                                        <br>
                                        <br>
                                        
                                        <div class="d-flex justify-content-center"><button id="confirmDeletion" type="button" class="btn-confirm-remove ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#removeOng">SIM, DESEJO APAGAR</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Dados -->
                        <div class="d-none d-md-flex pt-2 justify-content-start">
                            <!-- Localização -->
                            <div class="me-3">
                                <div class="font-type-info">LOCALIZAÇÃO</div>
                                <div class="font-info">${user.city}, ${user.state}</div>
                            </div>

                            <!-- Idade -->
                            <div class="ms-3">
                                <div class="font-type-info">IDADE</div>
                                <div class="font-info">${idade} anos</div>
                            </div>
                        </div>
                        <div class="d-none d-md-flex pt-2 justify-content-start">
                            <!-- Animais -->
                            <div class="me-3">
                                <div class="font-type-info">ANIMAIS PREFERIDOS</div>
                                <div class="font-info" id="preferences"></div>
                            </div>

                            <!-- MORADIA -->
                            <div class="ms-3">
                                <div class="font-type-info">MORADIA</div>
                                <div class="font-info">Prédio</div>
                            </div>
                        </div>
                        <!-- Sobre -->
                        <div class="d-none d-md-block py-3">
                            <div class="font-type-info">SOBRE</div>
                            <div class="font-info">${user.about}</div>
                        </div>
                    </div>
                </div>

                <!-- Modal - Remover Usuário (Pop-up sucesso ao apagar) -->
                <div class="modal fade" id="popUpCorreto" tabindex="-1" aria-labelledby="popUpLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="popUpLabel">Sucesso</h5>
                                <button id="redirectButton" type="button" class="btn-close" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Perfil de usuário apagado com sucesso!
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal - Remover Usuário (Pop-up erro ao apagar) -->
                <div class="modal fade" id="popUpErro" tabindex="-1" aria-labelledby="popUpLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="popUpLabel">Erro</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Falha ao apagar o perfil de usuário. Tente novamente mais tarde!
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    `;

    const statesSelect = profileCard.querySelector('#stateSelect');
    const citySelect = profileCard.querySelector('#citySelect');

    statesSelect.addEventListener('change', selectCityByState);
    async function selectCityByState() {
        const selectedState = statesSelect.value;
        const cities = await fetchCitiesByState(selectedState);

        citySelect.innerHTML = '';

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            if (city == user.city) {
                option.selected = true;
            }
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

    selectCityByState();

    const preferencesElements = profileCard.querySelectorAll("#preferences");
    const preferences = `${user.preferences}`;
    const formattedPreferences = preferences.split(',').join(', ');
    preferencesElements.forEach(preferencesElement => {
        preferencesElement.textContent = formattedPreferences;
    });

    token = localStorage.getItem('token')
    const editarForm = profileCard.querySelector('#editUserForm');

    editarForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(editarForm); // Correctly pass the form element, not the event

        user.preferences.forEach((preference, index) => {
            formData.append('preferences[]', preference);
        });

        const data = {};
        formData.forEach((value, key) => {
            if (data[key] !== undefined) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });

        data['role'] = 'USER'
        fetch(`/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Perfil de Usuário com ID " + user.id + " atualizado"); // Adjusted to use the correct ID

                    const popUp = new bootstrap.Modal(document.querySelector('#popUpCorretoEdit'))

                    popUp.toggle()
                    popUp.show()

                    const botaoRedirect = document.querySelector('#redirectButtonEdit')

                    botaoRedirect.addEventListener('click', () => {
                        window.location.href = "profile.html?id=" + user.id;
                    })
                } else {
                    console.error('Erro ao atualizar perfil de Usuário.');

                    const popUp = new bootstrap.Modal(document.querySelector('#popUpErroEdit'))
                    popUp.toggle()
                    popUp.show()
                }
            })
    });

    const deleteButton = profileCard.querySelector('#confirmDeletion')

    const profileId = getParameterByName('id');
    deleteButton.addEventListener('click', async () => {
        let isSucesso = -1;

        await fetch(`/users/${profileId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    console.log(`Perfil de usuário com ID ${profileId} removido`);
                    isSucesso = 1
                } else {
                    console.error('Erro ao remover conta do usuário.');
                    isSucesso = 0
                }
            })

        if (isSucesso === 1) {
            var popUp = new bootstrap.Modal(document.querySelector('#popUpCorreto'))
            popUp.toggle()
            popUp.show()

            const botaoRedirect = document.querySelector('#redirectButton')

            botaoRedirect.addEventListener('click', () => {
                window.location.href = 'home.html';
            })
        } else if (isSucesso === 0) {
            var popUp = new bootstrap.Modal(document.querySelector('#popUpErro'))
            popUp.toggle()
            popUp.show()
        }
    });

    return profileCard;
}

async function createLikedPetsCard(isuser, userId) {
    const likedPetsCard = document.createElement('div');
    likedPetsCard.innerHTML = `
    <div class="container-xxl mt-2">
        <div class="row">
            <div class="col ong-pets-title">
                Animais curtidos
            </div>
        </div>
        <div class="row d-flex">
            <div class="col d-flex">
                <div id="GridPets" class="d-flex justify-content-center flex-wrap"></div>
            </div>
        </div>
    </div>
    `;
    const petsContainer = likedPetsCard.querySelector('#GridPets');

    try {
        const response = await fetch(`/all-pets/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        animals = Array.isArray(data) ? data : [data];

        for (const animal of animals) {
            const source_img = await fetchImage(animal.photos);
            let isLiked = true;
            const likesResponse = await fetch(`/likes/${isuser}/${animal.id}`);
            const likedPet = await likesResponse.json();
            if (likedPet === null) {
                isLiked = false;
            }
            const coracaoImgSrc = isLiked ? './img/red-heart-svgrepo-com.svg' : './img/empty-heart.svg';
            const card = `
                <a href="pet.html?id=${animal.id}" style="text-decoration: none">
                    <div class="card rounded-5 m-3 img-size">
                        <img src="${source_img}" class="card-img-top rounded-top-5 border-img-card" alt="${animal.name}">
                        <div class="card-body rounded-bottom-5 border-card">
                            <h5 class="card-title font_name_black">${animal.name}</h5>
                            <p class="card-text font_infos_black">${animal.city}, ${animal.state}</p>
                            <span class="coracao">
                                <button type="button" class="btn btn-link p-0 m-0 heart-button" data-pet-id="${animal.id}">
                                    <img src="${coracaoImgSrc}" alt="" class="img-fluid">
                                </button>
                            </span>
                        </div>
                    </div>
                </a>
            `;
            petsContainer.innerHTML += card;
        };
        const coracaoButtons = petsContainer.querySelectorAll('.heart-button');
        coracaoButtons.forEach(coracaoButton => {
            if (isuser === 0) {
                coracaoButton.style.display = 'none';
            }
            else {

                coracaoButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const petId = coracaoButton.dataset.petId;
                    const coracaoImg = coracaoButton.querySelector('img');
                    if (coracaoImg.src.includes('red-heart-svgrepo-com')) {
                        fetch(`/likes/${isuser}/${petId}`, { method: 'DELETE' })
                            .then(response => {
                                if (response.ok) {
                                    console.log(`Curtida removida para o pet com ID ${petId}`);
                                } else {
                                    console.error('Erro ao remover a curtida');
                                }
                            })
                            .catch(error => console.error('Erro ao remover a curtida:', error));

                        coracaoImg.src = './img/empty-heart.svg';
                    } else {
                        fetch(`/likes`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ UserId: isuser, petId: petId })
                        })
                            .then(response => {
                                if (response.ok) {
                                    console.log(`Curtida adicionada para o pet com ID ${petId}`);
                                } else {
                                    console.error('Erro ao adicionar a curtida');
                                }
                            })
                            .catch(error => console.error('Erro ao adicionar a curtida:', error));

                        coracaoImg.src = './img/red-heart-svgrepo-com.svg';
                    }
                });
            }
        });
    } catch (error) {
        console.error('Erro ao buscar Pets', error);
    }
    return likedPetsCard;
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