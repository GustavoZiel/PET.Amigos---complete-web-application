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
            // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            // Mudar para 0 no site final
            let owner = 1;
            token = localStorage.getItem('token')
            if (token) {
                const parts = token.split('.');
                console.log("entrei")
                if (parts.length === 3) {
                    const parts = token.split('.');
                    const payload = parts[1];
                    const decodedPayload = atob(payload);
                    const attributes = JSON.parse(decodedPayload);
                    const userIDFromToken = attributes.sub;
                    const userEmailFromToken = attributes.email;
                    console.log(`userIdFromToken: ${userIDFromToken} (${typeof userIDFromToken})`);
                    console.log(`userEmailFromToken: ${userEmailFromToken} (${typeof userEmailFromToken})`);
                    console.log(`userIdFromPage: ${userId} (${typeof userId})`);
                    console.log(`userEmailFromPage: ${user.email} (${typeof user.email})`);
                    if(userId == userIDFromToken && userEmailFromToken === user.email){
                        owner = 1;
                    }
                }
            }
            const userimage = await fetchImage(user.photo);
            const profileSection = document.getElementById('profile-section');
            const profileCard = createProfileCard(user, userimage, owner);
            const botaoremove = profileCard.querySelectorAll(".btn-remove");
            const botaoedit = profileCard.querySelectorAll(".btn-edit");
            botaoremove.forEach(botao => {
                if(!owner){
                    botao.style.display = 'none';
                }
            });
            botaoedit.forEach(botao => {
                if(!owner){
                    botao.style.display = 'none';
                }
            });
            
            profileSection.appendChild(profileCard);

            const likedSection = document.getElementById('liked-section');
            const likedPetsCard = await createLikedPetsCard();
            console.log(likedPetsCard);
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
                        <button type="button" class="btn-edit ms-4 text-nowrap" data-bs-toggle="modal" data-bs-target="#petAdotar"><i class="fa-regular fa-pen-to-square"></i></button>
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
                            <div class="font-info">
                            </div>
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
                                <button type="button" class="btn-edit ms-4 text-nowrap" data-bs-toggle="modal" data-bs-target="#editUserModal"><i class="fa-regular fa-pen-to-square"></i></button>
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
                                                <input type="date" id="birthDate" name="birthDate" class="form-control user-input" value="${user.birthDate.substring(0,10)}" required>
                                            </div>
                                            <div class="row pt-3 align-items-end">
                                                <span>Pets preferidos: </span>

                                                <div class="col-auto pt-2">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="preferences" value="Cachorros" ${user.preferences.includes('Cachorros') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="inlineCheckbox1">Cachorros</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="preferences" value="Gatos" ${user.preferences.includes('Gatos') ? 'checked' : ''}>
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
                                                        <input class="form-check-input" type="checkbox" id="moradiaCheckbox1" name="home" value="Casa" ${user.home.includes('Casa') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="moradiaCheckbox1">Casa</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="moradiaCheckbox2" name="home" value="Apartamento espaçoso" ${user.home.includes('Apartamento espaçoso') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="moradiaCheckbox2">Apartamento espaçoso</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="moradiaCheckbox3" name="home" value="Kitnet" ${user.home.includes('Kitnet') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="moradiaCheckbox3">Kitnet</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="moradiaCheckbox4" name="home" value="Sítio" ${user.home.includes('Sítio') ? 'checked' : ''}>
                                                        <label class="form-check-label" for="moradiaCheckbox4">Sítio</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group pt-3">
                                                <label for="city">Cidade</label>
                                                <input type="text" id="city" name="city" class="form-control" value="${user.city}" required>
                                            </div>

                                            <div class="form-group pt-3">
                                                <label for="state">Estado</label>
                                                <input type="text" id="state" name="state" class="form-control" value="${user.state}" required>
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

    const preferencesElement = profileCard.querySelector("#preferences");
    const preferences = `${user.preferences}`;
    const formattedPreferences = preferences.split(',').join(', ');
    preferencesElement.textContent = formattedPreferences;

    token = localStorage.getItem('token')
    const editarForm = profileCard.querySelector('#editUserForm');

    editarForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(editarForm); // Correctly pass the form element, not the event
        console.log(formData); // Debugging: Log the JSON object

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

                console.log(popUp)
                popUp.toggle()
                popUp.show()

                const botaoRedirect = document.querySelector('#redirectButtonEdit')
                console.log(botaoRedirect)

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
            console.log(botaoRedirect)

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

async function createLikedPetsCard() {
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
        const UserId = 1;
        const response = await fetch(`/all-pets/${UserId}`);
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        animals = Array.isArray(data) ? data : [data];
        console.log(animals);
        
        for (const animal of animals){
            const source_img = await fetchImage(animal.photos);
            let isLiked = true;  
            const coracaoImgSrc = isLiked ? './img/red-heart-svgrepo-com.svg' : './img/empty-heart.svg';
            console.log(coracaoImgSrc);
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
        coracaoButtons.forEach(coracaoButton  => {
            coracaoButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                
                const petId = coracaoButton.dataset.petId;
                const coracaoImg = coracaoButton.querySelector('img');
                if (coracaoImg.src.includes('red-heart-svgrepo-com')) {
                    fetch(`/likes/1/${petId}`, { method: 'DELETE' })
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
                        body: JSON.stringify({ email: 1, petId: petId })
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
        });
    } catch (error) {
        console.error('Erro ao buscar Pets', error);
    }
    return likedPetsCard;
}