document.addEventListener('DOMContentLoaded', async () => {
    const getParameterByName = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

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
            const likedPetsCard = createLikedPetsCard();
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
            <!-- Foto e informações da ONG -->
            <div class="container-fluid row bg-light pt-4">
                <!-- Informações (Mobile) -->
                <div class="col-12 order-1">
                    <!-- Nome da ONG -->
                    <div class="font-ong-name d-flex d-md-none justify-content-center">${user.userName}</div>

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
                    <div class="font-ong-name d-none d-md-flex">${user.userName}</div>

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
            </div>
        </section>
    `;

    return profileCard;
}

function createLikedPetsCard() {
    const likedPetsCard = document.createElement('div');
    likedPetsCard.innerHTML = `
        <!-- Animais da ONG -->
        <section class="container-fluid mt-4 px-5">
            <!-- Título -->
            <div class="ong-pets-title">
                Animais curtidos
            </div>

            <!-- Fotos dos animais -->
            <div class="row pt-4">
                <div class="col-xl-3 col-sm-6 pb-4">
                    <div class="card rounded-5">
                        <img src="img/Pitstop.png" class="card-img-top img-fluid rounded-top-5 img-border" alt="Pitstop">
                        <div class="card-body rounded-bottom-5 card-border">
                            <div class="card-title card-font-name">Pitstop</div>
                            <div class="card-text card-font-info">Salvador, BA</div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-heart fa-lg" style="color: black; display: inline-block;"></i>
                                <div class="ms-1 card-font-info">Dócil</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6 pb-4">
                    <div class="card rounded-5">
                        <img src="img/Gup.png" class="card-img-top img-fluid rounded-top-5 img-border" alt="Pitstop">
                        <div class="card-body rounded-bottom-5 card-border">
                            <div class="card-title card-font-name">Gup</div>
                            <div class="card-text card-font-info">Araraquara, SP</div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-heart fa-lg" style="color: black; display: inline-block;"></i>
                                <div class="ms-1 card-font-info">Dócil</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6 pb-4">
                    <div class="card rounded-5">
                        <img src="img/Ney.png" class="card-img-top img-fluid rounded-top-5 img-border" alt="Pitstop">
                        <div class="card-body rounded-bottom-5 card-border">
                            <div class="card-title card-font-name">Ney</div>
                            <div class="card-text card-font-info">Santos, SP</div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-heart fa-lg" style="color: black; display: inline-block;"></i>
                                <div class="ms-1 card-font-info">Dócil</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6 pb-4">
                    <div class="card rounded-5">
                        <img src="img/Monteiro.png" class="card-img-top img-fluid rounded-top-5 img-border" alt="Pitstop">
                        <div class="card-body rounded-bottom-5 card-border">
                            <div class="card-title card-font-name">Monteiro</div>
                            <div class="card-text card-font-info">Belo Horizonte, <SPan></SPan></div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-heart fa-lg" style="color: black; display: inline-block;"></i>
                                <div class="ms-1 card-font-info">Dócil</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6 pb-4">
                    <div class="card rounded-5">
                        <img src="img/Nelso.png" class="card-img-top img-fluid rounded-top-5 img-border" alt="Pitstop">
                        <div class="card-body rounded-bottom-5 card-border">
                            <div class="card-title card-font-name">Nelso</div>
                            <div class="card-text card-font-info">Rio de Janeiro, RJ</div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-heart fa-lg" style="color: black; display: inline-block;"></i>
                                <div class="ms-1 card-font-info">Dócil</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6 pb-4">
                    <div class="card rounded-5">
                        <img src="img/Juninho.png" class="card-img-top img-fluid rounded-top-5 img-border" alt="Pitstop">
                        <div class="card-body rounded-bottom-5 card-border">
                            <div class="card-title card-font-name">Juninho</div>
                            <div class="card-text card-font-info">Santo André, SP</div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-heart fa-lg" style="color: black; display: inline-block;"></i>
                                <div class="ms-1 card-font-info">Dócil</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Controle de páginas -->
            <div class="mb-3">
                <div class="container-fluid d-flex justify-content-end">
                    <div>
                        <button type="button" class="button-pages-purple rounded-circle me-2">&lt</button>
                        <button type="button" class="button-pages-purple rounded-circle me-2">1</button>
                        <button type="button" class="button-pages-white rounded-circle me-2">2</button>
                        <button type="button" class="button-pages-purple rounded-circle">&gt</button>
                    </div>
                </div>
            </div>
        </section>
    `;

    return likedPetsCard;
}