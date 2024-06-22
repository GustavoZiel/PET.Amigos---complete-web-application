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
            const userimage = await fetchImage(user.photo);
            const profileSection = document.getElementById('profile-section');
            const profileCard = createProfileCard(user, userimage);
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
function createProfileCard(user, userimage) {
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
                    <div class="font-name d-flex d-md-none justify-content-center">
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
                            <div class="font-info">${user.preferences}</div>
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

                    <!-- Contato -->
                    <div class="container-fluid font-contact d-block d-md-none">
                        <div class="font-type-info">CONTATO</div>

                        <div class="d-flex justify-content-start pt-1">
                            <!-- Instagram -->
                            <div class="link-border rounded-pill">
                                <a href="https://www.instagram.com/${user.instagram}/" class="font-contact">
                                    <i class="fa-brands fa-instagram"></i>
                                    Instagram
                                </a>
                            </div>

                            <!-- Facebook -->
                            <div class="link-border rounded-pill ms-2">
                                <a href="https://www.facebook.com/${user.facebook}/about" class="font-contact">
                                    <i class="fa-brands fa-facebook-f"></i>
                                    Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Foto -->
                <div class="col-12 col-md-5 d-flex justify-content-center py-4 pt-md-0 order-0">
                    <img src="${userimage}" alt="${user.userName}" id="foto" class="h-100 rounded-4 img-border">
                </div>

                <!-- Informações (Desktop) -->
                <div class="col-7 mb-md-5">
                    <!-- Nome do usuário -->
                    <div class="font-ong-name d-none d-md-flex align-items-center">
                        ${user.userName}
                        <div class="ps-5">
                            <button type="button" class="btn-edit ms-4 text-nowrap" data-bs-toggle="modal" data-bs-target="#petAdotar"><i class="fa-regular fa-pen-to-square"></i></button>
                            <button type="button" class="btn-remove ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#removeUser"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>

                    <!-- Modal -->
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
                            <div class="font-type-info">Idade</div>
                            <div class="font-info">${idade} anos</div>
                        </div>
                    </div>
                    <div class="d-none d-md-flex pt-2 justify-content-start">
                        <!-- Animais -->
                        <div class="me-3">
                            <div class="font-type-info">ANIMAIS PREFERIDOS</div>
                            <div class="font-info">${user.preferences}</div>
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

                    <!-- Contato -->
                    <div class="font-contact d-none d-md-block">
                        <div class="font-type-info">CONTATO</div>

                        <div class="d-flex justify-content-start pt-1">
                            <!-- Instagram -->
                            <div class="link-border rounded-pill">
                                <a href="https://www.instagram.com/${user.instagram}/" class="font-contact">
                                    <i class="fa-brands fa-instagram"></i>
                                    Instagram
                                </a>
                            </div>

                            <!-- Facebook -->
                            <div class="link-border rounded-pill ms-2">
                                <a href="https://www.facebook.com/${user.facebook}/about" class="font-contact">
                                    <i class="fa-brands fa-facebook-f"></i>
                                    Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal -->
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

                <!-- Modal -->
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
        <!-- Animais da ONG -->
        <section class="container-fluid mt-4 px-5">
            <!-- Título -->
            <div class="ong-pets-title">
                Animais curtidos
            </div>

            <!-- Controle de páginas -->
            <div class="row d-flex">
                    <div class="col d-flex">
                        <div class="d-inline-flex flex-column mt-3">
                            <div id="GridPets" class="d-flex justify-content-center flex-wrap"></div>
                            <div class="my-3 mx-5 text-end">
                                <a href="search.html" style="text-decoration: none">
                                    <button type="button" class="button-pages mx-1">&lt</button>
                                </a>
                                <a href="search.html" style="text-decoration: none">
                                    <button type="button" class="button-pages mx-1">1</button>
                                </a>
                                <a href="search.html" style="text-decoration: none">
                                    <button type="button" class="button-pages mx-1">2</button>
                                </a>
                                <a href="search.html" style="text-decoration: none">
                                    <button type="button" class="button-pages mx-1">&gt</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    `;
    const petsContainer = likedPetsCard.querySelector('#GridPets');

    try {
        const accountName = 1;
        const response = await fetch(`/all-pets/${accountName}`);
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
                                <button id="toggleHeart" type="button" class="btn btn-link p-0 m-0 heart-button" data-pet-id="${animal.id}">
                                    <img src="${coracaoImgSrc}" alt="" class="img-fluid">
                                </button>
                            </span>
                        </div>
                    </div>
                </a>
            `;
            petsContainer.innerHTML += card;
        };
        const coracaoButtons = document.querySelectorAll('.heart-button');
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
                        body: JSON.stringify({ accountName: 1, petId: petId })
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