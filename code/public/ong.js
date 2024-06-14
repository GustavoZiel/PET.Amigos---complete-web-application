document.addEventListener('DOMContentLoaded', async () => {
    const ongSection = document.getElementById('ong-section');
    const ongCard = createOngCard();
    ongSection.appendChild(ongCard);
    
    const petsOwnedSection = document.getElementById('pets-owned-section');
    const petsOwnedCard = createPetsOwnedCard();
    petsOwnedSection.appendChild(petsOwnedCard);
})

function createOngCard() {
    const ongCard = document.createElement('div');
    ongCard.innerHTML = `
    <!-- Informações importantes da ONG -->
    <section>
        <!-- Foto e informações da ONG -->
        <div class="container-fluid row bg-light">
            <!-- Informações (Mobile) -->
            <div class="col-12">
                <!-- Nome da ONG -->
                <div class="font-ong-name d-flex d-md-none justify-content-center">Acãochego da Tuka</div>

                <!-- Dados -->
                <div class="container-fluid d-sm-flex justify-content-start pt-4">
                    <!-- Localização -->
                    <div class="d-md-none pb-2 pe-5 pb-sm-0">
                        <div class="font-type-info">LOCALIZAÇÃO</div>
                        <div class="font-info">ARARAQUARA, SP</div>
                    </div>

                    <!-- Desde -->
                    <div class="d-md-none pb-2 pe-5 pb-sm-0">
                        <div class="font-type-info">DESDE</div>
                        <div class="font-info">2018</div>
                    </div>

                    <!-- Animais -->
                    <div class="d-md-none pb-sm-0">
                        <div class="font-type-info">ANIMAIS</div>
                        <div class="font-info">CACHORRO, GATO</div>
                    </div>
                </div>

                <!-- Sobre -->
                <div class="container-fluid d-block d-md-none py-2">
                    <div class="font-type-info">SOBRE</div>
                    <div class="font-info">Um espaço aconchegante para anjos que já sofreram na rua e esperam por um lar.</div>
                </div>

                <!-- Contato -->
                <div class="container-fluid font-contact d-block d-md-none">
                    <div class="font-type-info">CONTATO</div>

                    <div class="d-flex justify-content-start pt-1">
                        <!-- Instagram -->
                        <a href="https://www.instagram.com/acaochegodatuka/" class="btn btn-standard-click rounded-pill me-2">
                            <i class="fa-brands fa-instagram"></i>
                            Instagram
                        </a>

                        <!-- Facebook -->
                        <a href="https://www.facebook.com/acaochegodatuka/about" class="btn btn-standard-click rounded-pill me-2">
                            <i class="fa-brands fa-facebook-f"></i>
                            Facebook
                        </a>
                    </div>
                    <button type="button" class="bg-green border-green text-white poppins-semibold rounded-pill mt-3 text-nowrap" data-bs-toggle="modal" data-bs-target="#ongContribuir">CONTRIBUA!</button>
                </div>
            </div>            

            <!-- Foto -->
            <div class="col-12 col-md-5 d-flex justify-content-center py-4 pt-md-0">
                <img src="img/tuka.png" alt="Foto da ONG" class="h-100 rounded-4 img-border img-fluid">
            </div>

            <!-- Informações (Desktop) -->
            <div class="col-7 mb-md-5">
                <!-- Nome da ONG -->
                <div class="font-ong-name d-none d-md-flex">Acãochego da Tuka</div>

                <!-- Dados -->
                <div class="d-none d-md-flex pt-2 justify-content-start">
                    <!-- Localização -->
                    <div class="me-3">
                        <div class="font-type-info">LOCALIZAÇÃO</div>
                        <div class="font-info">ARARAQUARA, SP</div>
                    </div>

                    <!-- Desde -->
                    <div class="mx-3">
                        <div class="font-type-info">DESDE</div>
                        <div class="font-info">2018</div>
                    </div>

                    <!-- Animais -->
                    <div class="ms-3">
                        <div class="font-type-info">ANIMAIS</div>
                        <div class="font-info">CACHORRO, GATO</div>
                    </div>
                </div>

                <!-- Sobre -->
                <div class="d-none d-md-block py-3">
                    <div class="font-type-info">SOBRE</div>
                    <div class="font-info">Um espaço aconchegante para anjos que já sofreram na rua e esperam por um lar.</div>
                </div>

                <!-- Contato -->
                <div class="font-contact d-none d-md-block">
                    <div class="font-type-info">CONTATO</div>

                    <div class="d-flex justify-content-start pt-1">
                        <!-- Instagram -->
                        <a href="https://www.instagram.com/acaochegodatuka/" class="btn btn-standard-click rounded-pill me-2">
                            <i class="fa-brands fa-instagram"></i>
                            Instagram
                        </a>

                        <!-- Facebook -->
                        <a href="https://www.facebook.com/acaochegodatuka/about" class="btn btn-standard-click rounded-pill me-2">
                            <i class="fa-brands fa-facebook-f"></i>
                            Facebook
                        </a>

                    </div>
                    <button type="button" class="bg-green border-green text-white poppins-semibold rounded-pill mt-3 text-nowrap" data-bs-toggle="modal" data-bs-target="#ongContribuir">CONTRIBUA!</button>
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

function createPetsOwnedCard() {
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

        <!-- Modal -->
        <div class="modal fade" id="petModal" tabindex="-1" aria-labelledby="petModalLabel" aria-hidden="true">
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
                                        <select class="form-select" id="estado" name="state">
                                            <option value="sp">São Paulo</option>
                                            <option value="mg">Minas Gerais</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="type" class="form-label">Espécie</label>
                                        <select class="form-select" id="type" name="type">
                                            <option value="cachorro">Cachorro</option>
                                            <option value="gato">Gato</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="breed" class="form-label">Raça</label>
                                        <select class="form-select" id="breed" name="breed">
                                            <option value="husky">Husky</option>
                                            <option value="pincher">Pincher</option>
                                            <option value="siames">Siames</option>
                                            <option value="persian">Persa</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="sex" class="form-label">Sexo</label>
                                        <select class="form-select" id="sex" name="sex">
                                            <option value="macho">Macho</option>
                                            <option value="femea">Fêmea</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="porte" class="form-label">Porte</label>
                                        <select class="form-select" id="porte" name="size">
                                            <option value="small">Pequeno</option>
                                            <option value="medium">Médio</option>
                                            <option value="large">Grande</option>
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
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="temperament" value="docil">
                                        <label class="form-check-label" for="inlineCheckbox1">Dócil</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="temperament" value="brincalhao">
                                        <label class="form-check-label" for="inlineCheckbox2">Brincalhão</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="temperament" value="timido">
                                        <label class="form-check-label" for="inlineCheckbox3">Tímido</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="temperament" value="agitado">
                                        <label class="form-check-label" for="inlineCheckbox3">Agitado</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="temperament" value="carinhoso">
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
            </div>
        </div>

        <!-- Fotos dos animais -->
        <div class="row pt-4">
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
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

            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
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

            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
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

            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
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

            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
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

            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
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
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
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
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
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
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
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
    </div>
    `;

    return petsOwnedCard;
}