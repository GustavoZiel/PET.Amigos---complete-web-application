document.addEventListener('DOMContentLoaded', async () => {
    const getParameterByName = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const petId = getParameterByName('id'); // Extrai o ID da URL
    if (petId) {
        try {
            // Getting Pet info
            const responsePet = await fetch(`/pets/${petId}`);
            if (!responsePet.ok) {
                throw new Error('Erro ao buscar dados do pet');
            }
            const pet = await responsePet.json();
            const petImageUrl = await fetchImage(pet.photos);
            console.log(petImageUrl)
            
            // Like logic
            let isLiked = true;
            role = localStorage.getItem('role')
            if(role === "USER"){
                token = localStorage.getItem('token')
                if (token) {
                    const parts = token.split('.');
                    if (parts.length === 3) {
                        const parts = token.split('.');
                        const payload = parts[1];
                        const decodedPayload = atob(payload);
                        const attributes = JSON.parse(decodedPayload);
                        console.log("aaaaaaaaa")
                        console.log(attributes)
                        userIdFromToken = attributes.sub;
                    }
                }
            }
            const likes = await fetch(`/likes/${userIdFromToken}/${petId}`);
            const likedPet = await likes.json();
            if (likedPet === null) {
                isLiked = false;
            }

            // Getting Ong info
            const responseOng = await fetch(`/ongs/${pet.ONGId}`);
            if (!responseOng.ok) {
                throw new Error('Erro ao buscar dados do pet');
            }
            const ong = await responseOng.json();
            const ongImageUrl = await fetchImage(ong.photo);

            // Discovering if the owner of the ong that owns the animal is the one logged
            let owner = 0;
            token = localStorage.getItem('token')
            if (token) {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const parts = token.split('.');
                    const payload = parts[1];
                    const decodedPayload = atob(payload);
                    const attributes = JSON.parse(decodedPayload);
                    const OngIdFromToken = attributes.sub;
                    const OngEmailFromToken = attributes.email;
                    console.log(OngEmailFromToken)
                    if(ong.id === OngIdFromToken && OngEmailFromToken === ong.email){
                        owner = 1;
                    }
                    role = localStorage.getItem('role')
                    if(role === "USER"){
                        isuser = OngIdFromToken;
                    }
                }
            }


            // Creating Pet card
            const petsSection = document.getElementById('pets-section');
            const petCard = createPetCard(pet, petImageUrl, isLiked, ong, ongImageUrl, isuser);
            const botaoremove = petCard.querySelectorAll(".btn-remove");
            const botaoedit = petCard.querySelectorAll(".btn-edit");
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

const breedOptions = {
    Cachorro: ["Labrador", "Pastor Alemão", "Golden Retriever", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Boxer", "Dachshund", "Shih Tzu", "Chihuahua", "Pug", "Maltês", "Doberman", "Border Collie", "Schnauzer", "Dogue Alemão", "Akita", "Pastor Australiano"],
    Gato: ["Siamês", "Persa", "Maine Coon", "Bengal", "Ragdoll", "British Shorthair", "Sphynx", "Scottish Fold", "American Shorthair", "Siberiano", "Devon Rex", "Oriental Shorthair"],
    Roedor: ["Hamster", "Porquinho-da-Índia", "Gerbil", "Camundongo", "Rato", "Furão", "Capivara", "Marmota", "Esquilo"],
    Passaro: ["Canário", "Papagaio", "Pardal", "Periquito", "Calopsita", "Arara", "Cacatua", "Periquito Australiano", "Papagaio-do-congo", "Tucano", "Pombo", "Codorna"]
};

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

function createPetCard(pet, petImageUrl, isLiked, ong, ongImageUrl) {
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
                    <img src="${petImageUrl}" alt="${pet.type}" class="rounded-5 img-fluid animal border-purple imgPerfil-standard-size">
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
                                        <select class="form-select" id="citySelect" name="city" required>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="estado" class="form-label">Estado</label>
                                        <select class="form-select" id="stateSelect" name="state" required>
                                            <option value="SP" ${pet.state === 'SP' ? 'selected' : ''}>São Paulo</option>
                                            <option value="RJ" ${pet.state === 'RJ' ? 'selected' : ''}>Rio de Janeiro</option>
                                            <option value="MG" ${pet.state === 'MG' ? 'selected' : ''}>Minas Gerais</option>
                                            <option value="ES" ${pet.state === 'ES' ? 'selected' : ''}>Espírito Santo</option>
                                            <option value="DF" ${pet.state === 'DF' ? 'selected' : ''}>Distrito Federal</option>
                                            <option value="GO" ${pet.state === 'GO' ? 'selected' : ''}>Goiás</option>
                                            <option value="MT" ${pet.state === 'MT' ? 'selected' : ''}>Mato Grosso</option>
                                            <option value="MS" ${pet.state === 'MS' ? 'selected' : ''}>Mato Grosso do Sul</option>
                                            <option value="PR" ${pet.state === 'PR' ? 'selected' : ''}>Paraná</option>
                                            <option value="SC" ${pet.state === 'SC' ? 'selected' : ''}>Santa Catarina</option>
                                            <option value="RS" ${pet.state === 'RS' ? 'selected' : ''}>Rio Grande do Sul</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="type" class="form-label">Espécie</label>
                                        <select class="form-select" id="specie" name="type" required>
                                            <option value="Cachorro" ${pet.type === 'Cachorro' ? 'selected' : ''}>Cachorro</option>
                                            <option value="Gato" ${pet.type === 'Gato' ? 'selected' : ''}>Gato</option>
                                            <option value="Roedor" ${pet.type === 'Roedor' ? 'selected' : ''}>Roedor</option>
                                            <option value="Passaro" ${pet.type === 'Passaro' ? 'selected' : ''}>Passaro</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="breed" class="form-label">Raça</label>
                                        <select class="form-select" id="breed" name="breed">
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
                                    <span>Castrado: </span>
                                </div>
                                <div class="col">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="castratedYes" name="castrated" value="1" ${pet.castrated === true ? 'checked' : ''} required>
                                        <label class="form-check-label" for="castratedYes">Sim</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="castratedNo" name="castrated" value="0" ${pet.castrated === false ? 'checked' : ''}>
                                        <label class="form-check-label" for="castratedNo">Não</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-2 d-inline">
                                    <span>Chippado: </span>
                                </div>
                                <div class="col">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="chippedYes" name="chipped" value="1" ${pet.chipped === true ? 'checked' : ''} required>
                                        <label class="form-check-label" for="chippedYes">Sim</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="chippedNo" name="chipped" value="0" ${pet.chipped === false ? 'checked' : ''}>
                                        <label class="form-check-label" for="chippedNo">Não</label>
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
                                    <button class="btn btn-standard-click" type="submit">Editar</button>
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
                        <h5 class="poppins-medium headers_caract">CASTRADO</h5>
                        <p class="poppins-medium text_caract">${pet.castrated == true ? 'Sim' : 'Não'}</p>
                    </div>
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">CHIPPADO</h5>
                        <p class="poppins-medium text_caract">${pet.chipped === true ? 'Sim' : 'Não'}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">ESPÉCIE</h5>
                        <p class="poppins-medium text_caract">${pet.type}</p>
                    </div>
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">RAÇA</h5>
                        <p class="poppins-medium text_caract">${pet.breed}</p>
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
                <a href="./ong.html?id=${ong.id}" class="text-decoration-none">
                    <div class="d-flex flex-column align-items-center">
                        <img src="${ongImageUrl}" alt="${ong.name}" class="mb-2 img-fluid rounded-5 border-purple imgPerfil-standard-size">
                        <button type="button" class="bg-light border-purple textPurple rounded-pill px-4 container-fluid text-nowrap">Saiba mais!</button>
                        <p class="textOngNumber">${ong.phoneNumber}</p>
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

    const speciesSelect = petCard.querySelector('#specie');
    const breedSelect = petCard.querySelector('#breed');

    speciesSelect.addEventListener('change', selectBreedBySpecie);
    function selectBreedBySpecie() {
        const selectedSpecies = speciesSelect.value;
        const breeds = breedOptions[selectedSpecies] || [];

        breedSelect.innerHTML = '';

        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            if (breed === pet.breed) {
                option.selected = true;
            }
            breedSelect.appendChild(option);
        });
    }

    const statesSelect = petCard.querySelector('#stateSelect');
    const citySelect = petCard.querySelector('#citySelect');

    statesSelect.addEventListener('change', selectCityByState);
    function selectCityByState() {
        const selectedStates = statesSelect.value;
        const cities = citiesByState[selectedStates] || [];

        citySelect.innerHTML = '';

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            if (city === pet.city) {
                option.selected = true;
            }
            citySelect.appendChild(option);
        });
    }

    selectCityByState();
    selectBreedBySpecie();

    const coracaoImg = petCard.querySelector('#coracaoImg');
    const CoracaoButton = petCard.querySelector('#toggleHeart');
    if(isuser === 0){
        CoracaoButton.style.display = 'none';
    }
    else{
        coracaoImg.addEventListener('click', () => {
            const petId = CoracaoButton.dataset.petId;
    
            if (coracaoImg.src.includes('red-heart-svgrepo-com')) {
                coracaoImg.src = './img/empty-heart.svg';
    
                fetch(`/likes/${isuser}/${petId}`, { method: 'DELETE' })
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

    const editarForm = petCard.querySelector('#editarPetForm');
    editarForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(editarForm);

        pet.temperament.forEach((temperament, index) => {
            formData.append('temperament[]', temperament);
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
                    window.location.href = `pet.html?id=${pet.id}`;
                } else {
                    console.error('Erro ao atualizar perfil do PET.');
                    const editPetModalElement = document.querySelector('#editPetModal');
                    const popUpEdit = bootstrap.Modal.getInstance(editPetModalElement);
                    if (popUpEdit) {
                        popUpEdit.hide();
                    }

                    var popUpEditError = new bootstrap.Modal(document.querySelector('#popUpErroEdit'));
                    popUpEditError.show();
                }
            })
    });


    const deleteButton = petCard.querySelector('#confirmDeletion')
    deleteButton.addEventListener('click', async () => {
        let isSucesso = -1;

        await fetch(`/pets/${pet.id}`, { method: 'DELETE' })
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

