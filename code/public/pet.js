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
            const accountName = 1;

            let isLiked = true;  
            const likes = await fetch(`/likes/${accountName}/${petId}`);
            const likedPet = await likes.json();
            
            if(likedPet === null){
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

    return [age, 12+m];
}

function createPetCard(pet, petImageUrl, isLiked) {
    let [ano, mes] = calculateAge(pet.birth)
    const petCard = document.createElement('div');
    const coracaoImgSrc = isLiked ? './img/red-heart-svgrepo-com.svg' : './img/empty-heart.svg';
    console.log(coracaoImgSrc);
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
                </h1>
            </div>
            <div class="d-inline-flex position-relative">
                <div class="d-flex flex-column align-items-center">
                    <img src="${petImageUrl}" alt="${pet.type}" class="rounded-5 img-fluid animal border-purple">
                    <span class="coracao">
                        <button id="toggleHeart" type="button" class="btn btn-link p-0 m-0 heart-button" data-pet-id="${pet.id}">
                            <img id="coracaoImg" src="${coracaoImgSrc}" alt="" class="img-fluid ">
                        </button>
                    </span>
                    <button type="button" class="container-fluid bg-adotar border-adotar textPurple text-adotar poppins-semibold rounded-pill mt-3 text-nowrap" data-bs-toggle="modal" data-bs-target="#petAdotar">QUERO ADOTAR!</button>
                </div>
            </div>
        </div>

        <!-- Modal -->
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
                </h1>
            </div>
            <div class="col-lg-6 ps-5 mt-3">
                <div class="row pb-0 mb-0">
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">IDADE</h5>
                        <p class="poppins-medium text_caract">${idade}</p>
                    </div>
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">RAÇA</h5>
                        <p class="poppins-medium text_caract">${pet.breed}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h5 class="poppins-medium headers_caract">LOCALIZAÇÃO</h5>
                        <p class="poppins-medium text_caract">${pet.city}, ${pet.state}</p>
                    </div>
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
                        <img src="./img/tuka.png" alt="Acaochego da Tuka" class="mb-2 img-fluid rounded-5 border-purple">
                        <button type="button" class="bg-light border-purple textPurple rounded-pill px-4 container-fluid text-nowrap">Saiba mais!</button>
                        <p class="textOngNumber">(xx) xxxxx-xxxx</p>
                    </div>
                </a>
            </div>
        </div>
    `;
    const coracaoImg = petCard.querySelector('#coracaoImg');
    const CoracaoButton = petCard.querySelector('#toggleHeart')

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

    return petCard;
}