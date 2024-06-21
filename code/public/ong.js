document.addEventListener('DOMContentLoaded', async () => {
    const getParameterByName = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const ONGId = getParameterByName('id'); // Extrai o ID da URL
    if (ONGId) {
        try {
            const response = await fetch(`/ongs/${ONGId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da ONG');
            }
            const ong = await response.json();
            const ongimage = await fetchImage(ong.photo);
            const ongSection = document.getElementById('ong-section');
            const ongCard = createOngCard(ong, ongimage);
            ongSection.appendChild(ongCard);

            const petsOwnedSection = document.getElementById('pets-owned-section');
            const petsOwnedCard = await createPetsOwnedCard();
            petsOwnedSection.appendChild(petsOwnedCard);
        } catch (error) {
            console.error('Erro ao buscar dados da ONG:', error);
        }
    } else {
        console.error('ID da ONG não encontrado na URL.');
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

function createOngCard(ong, ongimage) {
    const data = new Date(); (ong.creationYear);
    const ano = data.getFullYear();
    const ongCard = document.createElement('div');
    ongCard.innerHTML = `
    <!-- Informações importantes da ONG -->
    <section>
        <!-- Foto e informações da ONG -->
        <div class="container-fluid row bg-light">
            <!-- Informações (Mobile) -->
            <div class="col-12">
                <!-- Nome da ONG -->
                    <div class="font-ong-name d-flex d-md-none justify-content-center">${ong.ongName}</div>

                <!-- Dados -->
                <div class="container-fluid d-sm-flex justify-content-start pt-4">
                    <!-- Localização -->
                    <div class="d-md-none pb-2 pe-5 pb-sm-0">
                        <div class="font-type-info">LOCALIZAÇÃO</div>
                        <div class="font-info">${ong.city}, ${ong.state}</div>
                    </div>

                    <!-- Desde -->
                    <div class="d-md-none pb-2 pe-5 pb-sm-0">
                        <div class="font-type-info">DESDE</div>
                        <div class="font-info">${ano}</div>
                    </div>

                    <!-- Animais -->
                    <div class="d-md-none pb-sm-0">
                        <div class="font-type-info">ANIMAIS</div>
                        <div class="font-info">${ong.pets}</div>
                    </div>
                </div>

                <!-- Sobre -->
                <div class="container-fluid d-block d-md-none py-2">
                    <div class="font-type-info">SOBRE</div>
                    <div class="font-info">${ong.about}</div>
                </div>

                <!-- Contato -->
                <div class="container-fluid font-contact d-block d-md-none">
                    <div class="font-type-info">CONTATO</div>

                    <div class="d-flex justify-content-start pt-1">
                        <!-- Instagram -->
                        <a href="https://www.instagram.com/${ong.instagram}/" class="btn btn-standard-click rounded-pill me-2">
                            <i class="fa-brands fa-instagram"></i>
                            Instagram
                        </a>

                        <!-- Facebook -->
                        <a href="https://www.facebook.com/${ong.facebook}/about" class="btn btn-standard-click rounded-pill me-2">
                            <i class="fa-brands fa-facebook-f"></i>
                            Facebook
                        </a>
                    </div>
                    <button class="btn btn-contribua rounded-pill mt-3" data-bs-toggle="modal" data-bs-target="#ongContribuir">CONTRIBUA!</button>
                </div>
            </div>            

            <!-- Foto -->
            <div class="col-12 col-md-5 d-flex justify-content-center py-4 pt-md-0">
                <img src="${ongimage}" alt="${ong.ongName}" class="h-100 rounded-4 img-border img-fluid">
            </div>

            <!-- Informações (Desktop) -->
            <div class="col-7 mb-md-5">
                <!-- Nome da ONG -->
                <div class="font-ong-name d-none d-md-flex align-items-center">
                    ${ong.ongName}
                    <div class="ps-5">
                        <button type="button" class="btn-edit ms-4 text-nowrap" data-bs-toggle="modal" data-bs-target="#petAdotar"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button type="button" class="btn-remove ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#removeOng"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="removeOng" tabindex="-1" aria-labelledby="removeOngLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="removeOngLabel">Deseja remover sua conta?</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Caso apague a conta, todos seus dados serão perdidos.

                                <br>
                                <br>
                                <br>
                                
                                <div class="d-flex justify-content-center"><button type="button" class="btn-confirm-remove ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#removeOng">SIM, DESEJO APAGAR</button></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dados -->
                <div class="d-none d-md-flex pt-2 justify-content-start">
                    <!-- Localização -->
                    <div class="me-3">
                        <div class="font-type-info">LOCALIZAÇÃO</div>
                        <div class="font-info">${ong.city}, ${ong.state}</div>
                    </div>

                    <!-- Desde -->
                    <div class="mx-3">
                        <div class="font-type-info">DESDE</div>
                        <div class="font-info">${ano}</div>
                    </div>

                    <!-- Animais -->
                    <div class="ms-3">
                        <div class="font-type-info">ANIMAIS</div>
                        <div class="font-info">${ong.pets}</div>
                    </div>
                </div>

                <!-- Sobre -->
                <div class="d-none d-md-block py-3">
                    <div class="font-type-info">SOBRE</div>
                    <div class="font-info">${ong.about}</div>
                </div>

                <!-- Contato -->
                <div class="font-contact d-none d-md-block">
                    <div class="font-type-info">CONTATO</div>

                    <div class="d-flex justify-content-start pt-1">
                        <!-- Instagram -->
                        <a href="https://www.instagram.com/${ong.instagram}/" class="btn btn-standard-click rounded-pill me-2">
                            <i class="fa-brands fa-instagram"></i>
                            Instagram
                        </a>

                        <!-- Facebook -->
                        <a href="https://www.facebook.com/${ong.facebook}/about" class="btn btn-standard-click rounded-pill me-2">
                            <i class="fa-brands fa-facebook-f"></i>
                            Facebook
                        </a>

                    </div>
                    <button class="btn btn-contribua rounded-pill mt-3" data-bs-toggle="modal" data-bs-target="#ongContribuir">CONTRIBUA!</button>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="ongContribuir" tabindex="-1" aria-labelledby="ongContribuirLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ongContribuirLabel">Como contribuir?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Chave PIX: 14 98143 6371
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

    return ongCard;
}
function addPetsButton(){
    const botaoadd =`
    <!-- Modal -->
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="petModalLabel">Adicionar um PET</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form method="POST" action="/pets" enctype="multipart/form-data">
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Nome</label>
                                        <input type="text" class="form-control" id="name" name="name" required>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="birth" class="form-label">Data de Nascimento</label>
                                        <input type="date" class="form-control" id="birth" name="birth" required>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="cidade" class="form-label">Cidade</label>
                                        <select class="form-select" id="cidade" name="city">
                                            <option value="São Carlos">São Carlos</option>
                                            <option value="Araraguara">Araraguara</option>
                                            <option value="São Paulo">São Paulo</option>
                                            <option value="Ribeirão Preto">Ribeirão Preto</option>
                                            <option value="Uberlândia">Uberlândia</option>
                                            <option value="Belo Horizonte">Belo Horizonte</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="estado" class="form-label">Estado</label>
                                        <select class="form-select" id="state" name="state">
                                            <option value="ES">Espírito Santo</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="PR">Paraná</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="SC">Santa Catarina</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="type" class="form-label">Espécie</label>
                                        <select class="form-select" id="type" name="type">
                                            <option value="Cachorro">Cachorro</option>
                                            <option value="Gato">Gato</option>
                                            <option value="Roedor">Gato</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="breed" class="form-label">Raça</label>
                                        <select class="form-select" id="breed" name="breed">
                                            <option value="Husky">Husky</option>
                                            <option value="Pincher">Pincher</option>
                                            <option value="Bulldog">Bulldog</option>
                                            <option value="Beagle">Beagle</option>
                                            <option value="Poodle">Poodle</option>
                                            <option value="Labrador">Labrador</option>
                                            <option value="Golden Retriever">Golden Retriever</option>
                                            <option value="German Shepherd">Pastor Alemão</option>
                                            <option value="Chihuahua">Chihuahua</option>
                                            <option value="Dachshund">Dachshund</option>
                                            <option value="Boxer">Boxer</option>
                                            <option value="Rottweiler">Rottweiler</option>
                                            <option value="Yorkshire Terrier">Yorkshire Terrier</option>
                                            <option value="Shih Tzu">Shih Tzu</option>
                                            <option value="Doberman">Doberman</option>
                                            <option value="Pug">Pug</option>
                                            <option value="Cocker Spaniel">Cocker Spaniel</option>
                                            <option value="Border Collie">Border Collie</option>
                                            <option value="Schnauzer">Schnauzer</option>
                                            <option value="Great Dane">Dogue Alemão</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="sex" class="form-label">Sexo</label>
                                        <select class="form-select" id="sex" name="sex">
                                            <option value="Macho">Macho</option>
                                            <option value="Fêmea">Fêmea</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="porte" class="form-label">Porte</label>
                                        <select class="form-select" id="porte" name="size">
                                            <option value="Pequeno">Pequeno</option>
                                            <option value="Médio">Médio</option>
                                            <option value="Grande">Grande</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col">
                                    <label for="formFileMultiple" class="form-label">Fotos</label>
                                    <input class="form-control" type="file" id="formFileMultiple" name="photos" multiple>
                                </div>
                            </div>

                            <div class="row my-4">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="comment" class="form-label">Descrição</label>
                                        <textarea class="form-control" id="comment" name="comment" style="height: 100px" required></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3 align-items-end">
                                <div class="col-3">
                                    <span>Temperamento: </span>
                                </div>
                                <div class="col-auto">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="temperament" value="Dócil">
                                        <label class="form-check-label" for="inlineCheckbox1">Dócil</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="temperament" value="Agitado">
                                        <label class="form-check-label" for="inlineCheckbox2">Agitado</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="temperament" value="Calmo">
                                        <label class="form-check-label" for="inlineCheckbox3">Calmo</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="temperament" value="Brincalhão">
                                        <label class="form-check-label" for="inlineCheckbox3">Brincalhão</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="temperament" value="Carinhoso">
                                        <label class="form-check-label" for="inlineCheckbox3">Carinhoso</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-2 d-inline">
                                    <span>Vacinado: </span>
                                </div>
                                <div class="col">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="vacinatedYes" name="vacinated" value="1">
                                        <label class="form-check-label" for="vacinatedYes">Sim</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="vacinatedNo" name="vacinated" value="0">
                                        <label class="form-check-label" for="vacinatedNo">Não</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-2">
                                    <span>Adotado: </span>
                                </div>
                                <div class="col">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="adoptedYes" name="adopted" value=1>
                                        <label class="form-check-label" for="adoptedYes">Sim</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="adoptedNo" name="adopted" value=0>
                                        <label class="form-check-label" for="adoptedNo">Não</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <button class="btn btn-standard-click" type="submit">Adicionar</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>`
    return botaoadd;
}
async function createPetsOwnedCard() {
    const petsOwnedCard = document.createElement('div');
    petsOwnedCard.innerHTML = `
        
    <!-- Animais da ONG -->
    <div class="container-xxl mt-4">
        <!-- Título -->
        <div class="row align-items-center">
            <div class="col ong-pets-title">
                Animais esperando por um lar!
            </div>
            <!-- Botão adicionar pet -->
            <div class="col text-end">
                <button type="button" class="btn btn-standard-click btn-lg" data-bs-toggle="modal" data-bs-target="#petModal">
                    Adicionar um PET
                </button>
            </div>
        </div>
        <div class="modal fade" id="petModal" tabindex="-1" aria-labelledby="petModalLabel" aria-hidden="true">
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
    </div>
    `;
    const botao = likedPetsCard.querySelector('#petModal');
    botao.innerHTML += addPetsButton();
    const petsContainer = likedPetsCard.querySelector('#GridPets');

    try {
        const accountName = 1;
        const response = await fetch(`/ONG-pets/${accountName}`);
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

    return petsOwnedCard;
}