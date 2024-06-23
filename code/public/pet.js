document.addEventListener('DOMContentLoaded', async () => {
    const getParameterByName = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const petId = getParameterByName('id'); // Extrai o ID da URL
    if (petId) {
        try {
            const response = await fetch(`/pets/${petId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do pet');
            }
            const pet = await response.json();
            const petImageUrl = await fetchImage(pet.photos);
            const email = 1;

            let isLiked = true;
            const likes = await fetch(`/likes/${email}/${petId}`);
            const likedPet = await likes.json();

            if (likedPet === null) {
                isLiked = false;
            }

            const petsSection = document.getElementById('pets-section');
            const petCard = createPetCard(pet, petImageUrl, isLiked);
            petsSection.appendChild(petCard);
        } catch (error) {
            console.error('Erro ao buscar dados do pet:', error);
        }
    } else {
        console.error('ID do pet não encontrado na URL.');
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

    return [age, 12 + m];
}

function createPetCard(pet, petImageUrl, isLiked) {
    let [ano, mes] = calculateAge(pet.birth)
    const petCard = document.createElement('div');
    const coracaoImgSrc = isLiked ? './img/red-heart-svgrepo-com.svg' : './img/empty-heart.svg';
    petCard.classList.add('row', 'px-5', 'mx-3', 'pt-3');

    let idade;
    if (ano === 0) {
        idade = mes + ' meses'
    } else if (idade === 1) {
        idade = ano + ' ano e ' + mes + ' meses'
    } else {
        idade = ano + ' anos e ' + mes + ' meses'
    }

    petCard.innerHTML = `
        <div class="col-lg-3 d-flex flex-column align-items-center">
            <div class="d-lg-none">
                <h1 class="poppins-semibold textPurple">
                    ${pet.name}
                    <i class="fa-solid fa-${pet.sex === 'macho' ? 'mars' : 'venus'} textPurple"></i>
                    <button type="button" class="btn-edit ms-4 text-nowrap" data-bs-toggle="modal" data-bs-target="#editPetModal"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button type="button" class="btn-remove ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#removePet"><i class="fa-solid fa-trash-can"></i></button>
                </h1>
            </div>
            <div class="d-inline-flex position-relative">
                <div class="d-flex flex-column align-items-center">
                    <img src="${petImageUrl}" alt="${pet.type}" class="rounded-5 img-fluid animal border-purple fixed-img-size">
                    <span class="coracao">
                        <button id="toggleHeart" type="button" class="btn btn-link p-0 m-0 heart-button" data-pet-id="${pet.id}">
                            <img id="coracaoImg" src="${coracaoImgSrc}" alt="" class="img-fluid ">
                        </button>
                    </span>
                    <button type="button" class="container-fluid bg-adotar border-adotar textPurple text-adotar poppins-semibold rounded-pill mt-3 text-nowrap" data-bs-toggle="modal" data-bs-target="#petAdotar">QUERO ADOTAR!</button>
                </div>
            </div>
        </div>


        <!-- Modal - Remove Pet -->
        <div class="modal fade" id="removePet" tabindex="-1" aria-labelledby="removePetLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="removePetLabel">Deseja remover mesmo esse pet ?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                        <button id="confirmDeletion" type="button" class="btn-confirm-remove ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#removeOng">SIM, DESEJO APAGAR</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal - Editar pet -->
        <div class="modal fade" id="editPetModal" tabindex="-1" aria-labelledby="editPetModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editPetModalLabel">Editar Pet</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editarPetForm"  method="post" enctype="multipart/form-data">
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Nome</label>
                                        <input type="text" class="form-control" id="name" name="name" value="${pet.name}" required>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="birth" class="form-label">Data de Nascimento</label>
                                        <input type="date" class="form-control" id="birth" name="birth" value="${pet.birth}" required>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="cidade" class="form-label">Cidade</label>
                                        <select class="form-select" id="cidade" name="city" required>
                                            <option value="São Carlos" ${pet.city === 'São Carlos' ? 'selected' : ''}>São Carlos</option>
                                            <option value="Araraguara" ${pet.city === 'Araraguara' ? 'selected' : ''}>Araraguara</option>
                                            <option value="São Paulo" ${pet.city === 'São Paulo' ? 'selected' : ''}>São Paulo</option>
                                            <option value="Ribeirão Preto" ${pet.city === 'Ribeirão Preto' ? 'selected' : ''}>Ribeirão Preto</option>
                                            <option value="Uberlândia" ${pet.city === 'Uberlândia' ? 'selected' : ''}>Uberlândia</option>
                                            <option value="Belo Horizonte" ${pet.city === 'Belo Horizonte' ? 'selected' : ''}>Belo Horizonte</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="estado" class="form-label">Estado</label>
                                        <select class="form-select" id="state" name="state" required>
                                            <option value="SP" ${pet.state === 'SP' ? 'selected' : ''}>São Paulo</option>
                                            <option value="MG" ${pet.state === 'MG' ? 'selected' : ''}>Minas Gerais</option>
                                            <option value="RJ" ${pet.state === 'RJ' ? 'selected' : ''}>Rio de Janeiro</option>
                                            <option value="PR" ${pet.state === 'PR' ? 'selected' : ''}>Paraná</option>
                                            <option value="ES" ${pet.state === 'ES' ? 'selected' : ''}>Espírito Santo</option>
                                            <option value="RS" ${pet.state === 'RS' ? 'selected' : ''}>Rio Grande do Sul</option>
                                            <option value="SC" ${pet.state === 'SC' ? 'selected' : ''}>Santa Catarina</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="type" class="form-label">Espécie</label>
                                        <select class="form-select" id="type" name="type" required>
                                            <option value="Cachorro" ${pet.type === 'Cachorro' ? 'selected' : ''}>Cachorro</option>
                                            <option value="Gato" ${pet.type === 'Gato' ? 'selected' : ''}>Gato</option>
                                            <option value="Roedor" ${pet.type === 'Roedor' ? 'selected' : ''}>Roedor</option>
                                            <option value="Passaro" ${pet.type === 'Passaro' ? 'selected' : ''}>Passaro</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="sex" class="form-label">Sexo</label>
                                        <select class="form-select" id="sex" name="sex" required>
                                            <option value="Macho" ${pet.sex === 'Macho' ? 'selected' : ''}>Macho</option>
                                            <option value="Fêmea" ${pet.sex === 'Fêmea' ? 'selected' : ''}>Fêmea</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="porte" class="form-label">Porte</label>
                                        <select class="form-select" id="porte" name="size" required>
                                            <option value="Pequeno" ${pet.size === 'Pequeno' ? 'selected' : ''}>Pequeno</option>
                                            <option value="Médio" ${pet.size === 'Médio' ? 'selected' : ''}>Médio</option>
                                            <option value="Grande" ${pet.size === 'Grande' ? 'selected' : ''}>Grande</option>
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
                                        <textarea class="form-control" id="comment" name="comment" style="height: 100px" required>${pet.comment}</textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3 align-items-end">
                                <div class="col-3">
                                    <span>Temperamento: </span>
                                </div>
                                <div class="col-auto">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="temperament" value="Dócil" ${pet.temperament.includes('Dócil') ? 'checked' : ''}>
                                        <label class="form-check-label" for="inlineCheckbox1">Dócil</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="temperament" value="Agitado" ${pet.temperament.includes('Agitado') ? 'checked' : ''}>
                                        <label class="form-check-label" for="inlineCheckbox2">Agitado</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="temperament" value="Calmo" ${pet.temperament.includes('Calmo') ? 'checked' : ''}>
                                        <label class="form-check-label" for="inlineCheckbox3">Calmo</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox4" name="temperament" value="Brincalhão" ${pet.temperament.includes('Brincalhão') ? 'checked' : ''}>
                                        <label class="form-check-label" for="inlineCheckbox4">Brincalhão</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="temperament" value="Carinhoso" ${pet.temperament.includes('Carinhoso') ? 'checked' : ''}>
                                        <label class="form-check-label" for="inlineCheckbox5">Carinhoso</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-2 d-inline">
                                    <span>Vacinado: </span>
                                </div>
                                <div class="col">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="vacinatedYes" name="vacinated" value="1" ${pet.vacinated === true ? 'checked' : ''} required>
                                        <label class="form-check-label" for="vacinatedYes">Sim</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="vacinatedNo" name="vacinated" value="0" ${pet.vacinated === false ? 'checked' : ''}>
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
                                        <input class="form-check-input" type="radio" id="adoptedYes" name="adopted" value="1" ${pet.adopted === true ? 'checked' : ''}>
                                        <label class="form-check-label" for="adoptedYes">Sim</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="adoptedNo" name="adopted" value="0" ${pet.adopted === false ? 'checked' : ''} required>
                                        <label class="form-check-label" for="adoptedNo">Não</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col text-end">
                                    <button class="btn btn-standard-click" type="submit">Adicionar</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

        <!-- Modal adotar pet-->
            <div class="modal fade" id="petAdotar" tabindex="-1" aria-labelledby="petAdotarLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="petAdotarLabel">Como adotar esse pet?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>
                            Entre em contato com a ONG usando os meios de comunicação disponibilizados por ela (telefone,
                            Instagram, Facebook, etc).
                            </p>

                            <p>
                            O site PET.Amigos não se responsabiliza pela legalização da adoção, deixamos isso somente com
                            a ONG em questão. Nossa missão é apenas a de ser um portal para ajudar nossos queridos animais
                            a encontrarem uma nova casa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        <div class="col-lg-9 row">
            <div class="d-none d-lg-block">
                <h1 class="ps-5 poppins-semibold textPurple">
                    ${pet.name}
                    <i class="fa-solid fa-${pet.sex === 'macho' ? 'mars' : 'venus'} textPurple"></i>
                    <button type="button" class="btn-edit ms-4 text-nowrap" data-bs-toggle="modal" data-bs-target="#editPetModal"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button type="button" class="btn-remove ms-2 text-nowrap" data-bs-toggle="modal" data-bs-target="#removePet"><i class="fa-solid fa-trash-can"></i></button>
                </h1>
            </div>
            <div class="col-lg-6 ps-5 mt-3">
                <div class="row pb-0 mb-0">
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">IDADE</h5>
                        <p class="poppins-medium text_caract">${idade}</p>
                    </div>
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">LOCALIZAÇÃO</h5>
                        <p class="poppins-medium text_caract">${pet.city}, ${pet.state}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">ESPÉCIE</h5>
                        <p class="poppins-medium text_caract">${pet.type}</p>
                    </div>
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">PORTE</h5>
                        <p class="poppins-medium text_caract">${pet.size}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">SOBRE</h5>
                        <p class="poppins-medium text_caract">${pet.comment}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 d-flex flex-column align-items-center">
                <div>
                    <h5 class="poppins-medium headers_caract">INSTITUIÇÃO PROTETORA</h5>
                </div>
                <a href="./ong.html" class="text-decoration-none">
                    <div class="d-flex flex-column align-items-center">
                        <img src="./img/tuka.png" alt="Acaochego da Tuka" class="mb-2 img-fluid rounded-5 border-purple fixed-img-size">
                        <button type="button" class="bg-light border-purple textPurple rounded-pill px-4 container-fluid text-nowrap">Saiba mais!</button>
                        <p class="textOngNumber">(xx) xxxxx-xxxx</p>
                    </div>
                </a>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="popUpCorretoRemove" tabindex="-1" aria-labelledby="popUpLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popUpLabel">Sucesso</h5>
                        <button id="redirectButton" type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Perfil do PET apagado com sucesso!
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="popUpErroRemove" tabindex="-1" aria-labelledby="popUpLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popUpLabel">Erro</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Falha ao apagar o perfil do PET. Tente novamente !
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="popUpErroEdit" tabindex="-1" aria-labelledby="popUpLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popUpLabel">Erro</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Falha ao editar o perfil do PET. Tente novamente !
                    </div>
                </div>
            </div>
        </div>
    `;

    const coracaoImg = petCard.querySelector('#coracaoImg');
    const CoracaoButton = petCard.querySelector('#toggleHeart');

    coracaoImg.addEventListener('click', () => {
        const petId = CoracaoButton.dataset.petId;

        if (coracaoImg.src.includes('red-heart-svgrepo-com')) {
            coracaoImg.src = './img/empty-heart.svg';

            fetch(`/likes/1/${petId}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        console.log(`Curtida removida para o pet com ID ${petId}`);
                    } else {
                        console.error('Erro ao remover a curtida');
                    }
                })
                .catch(error => console.error('Erro ao remover a curtida:', error));
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

    const editarForm = petCard.querySelector('#editarPetForm');
    editarForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(editarForm); // Correctly pass the form element, not the event
        console.log(formData); // Debugging: Log the JSON object

        // Convert FormData to JSON object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log(data); // Debugging: Log the JSON object

        fetch(`/pets/${pet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                console.log(`Perfil do PET com ID ${pet.id} atualizado`); // Adjusted to use the correct ID
                // window.location.href = `pet.html?id=${pet.id}`;
            } else {
                console.error('Erro ao atualizar perfil do PET.');
                var popUpEdit = new bootstrap.Modal(document.querySelector('#editPetModal'))
                var popUpEditError = new bootstrap.Modal(document.querySelector('#popUpErroEdit'))
                popUpEdit.toggle()
                popUpEditError.toggle()
                // popUp.show()
            }
        })
    });


    const deleteButton = petCard.querySelector('#confirmDeletion')
    deleteButton.addEventListener('click', async () => {
        let isSucesso = -1;

        await fetch(`/ongs/${pet.id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    console.log(`Perfil da Pet com ID ${pet.id} removido`);
                    isSucesso = 1
                } else {
                    console.error('Erro ao remover conta da Pet.');
                    isSucesso = 0
                }
            })

        if (isSucesso === 1) {
            var popUp = new bootstrap.Modal(document.querySelector('#popUpCorretoRemove'))
            popUp.toggle()
            popUp.show()

            const botaoRedirect = document.querySelector('#redirectButton')
            console.log(botaoRedirect)

            botaoRedirect.addEventListener('click', () => {
                window.location.href = 'home.html';
            })
        } else if (isSucesso === 0) {
            var popUp = new bootstrap.Modal(document.querySelector('#popUpErroRemove'))
            popUp.toggle()
            popUp.show()
        }
    });

    return petCard;
}

