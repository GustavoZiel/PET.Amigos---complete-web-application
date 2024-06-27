const getParameterByName = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

document.addEventListener('DOMContentLoaded', async () => {
    const ONGId = getParameterByName('id'); // Extrai o ID da URL
    if (ONGId) {
        try {
            const response = await fetch(`/ongs/${ONGId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da ONG');
            }
            const ong = await response.json();
            // Discovering if the owner of the ong is the one logged
            let owner = 0;
            let isuser = 0;
            token = localStorage.getItem('token')
            if (token) {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const parts = token.split('.');
                    const payload = parts[1];
                    const decodedPayload = atob(payload);
                    const attributes = JSON.parse(decodedPayload);
                    console.log(attributes)
                    const OngIdFromToken = attributes.sub;
                    const OngEmailFromToken = attributes.email;
                    console.log(OngEmailFromToken)
                    console.log(OngIdFromToken)
                    console.log(ONGId)
                    console.log(ong.email)
                    if (ONGId == OngIdFromToken && OngEmailFromToken === ong.email) {
                        owner = 1;
                    }
                    role = localStorage.getItem('role')
                    if (role === "USER") {
                        isuser = OngIdFromToken;
                    }
                }
            }
            const ongimage = await fetchImage(ong.photo);
            const ongSection = document.getElementById('ong-section');
            const ongCard = await createOngCard(ong, ongimage, owner);
            ongSection.appendChild(ongCard);

            const petsOwnedSection = document.getElementById('pets-owned-section');
            const petsOwnedCard = await createPetsOwnedCard(ONGId, owner, isuser);
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

async function createOngCard(ong, ongimage, owner) {
    const data = new Date(ong.creationYear);
    const ano = data.getFullYear();
    const ongCard = document.createElement('div');

    ongCard.innerHTML = `
    <!-- Informações importantes da ONG -->
    <section>
        <!-- Foto e informações da ONG -->
        <div class="container-fluid row bg-light ">
            <!-- Informações (Mobile) -->
            <div class="col-12">
                <!-- Nome da ONG -->
                <div class="font-ong-name d-flex d-md-none justify-content-center">${ong.ongName}</div>
                <div class="font-name d-flex d-md-none justify-content-center">
                    <button type="button" class="btn-logout ms-2 text-nowrap owner" data-bs-toggle="modal" data-bs-target="#logoutOng"><i class="fa fa-power-off"></i></button>
                    <button type="button" class="btn-edit ms-2 text-nowrap owner" data-bs-toggle="modal" data-bs-target="#editOngModal"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button type="button" class="btn-remove ms-2 text-nowrap owner" data-bs-toggle="modal" data-bs-target="#removeOng"><i class="fa-solid fa-trash-can"></i></button>
                </div>

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
                        <div id="pets" class="font-info"></div>
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
                        <a href="https://www.facebook.com/${ong.facebook}/" class="btn btn-standard-click rounded-pill me-2">
                            <i class="fa-brands fa-facebook-f"></i>
                            Facebook
                        </a>
                    </div>
                    <button class="btn btn-contribua rounded-pill mt-3" data-bs-toggle="modal" data-bs-target="#ongContribuir">CONTRIBUA!</button>
                </div>
            </div>            

            <div class="d-flex justify-content-center">
                <div class="col-2">
                </div>
                <!-- Foto -->
                <div class="m-4">
                    <img src="${ongimage}" alt="${ong.ongName}" class="h-100 rounded-4 img-border imgPerfil-standard-size">
                </div>

                <!-- Informações (Desktop) -->
                <div class="m-4">
                    <!-- Nome da ONG -->
                    <div class="font-ong-name d-none d-md-flex align-items-center">
                        ${ong.ongName}
                        <div class="ps-5">
                            <button type="button" class="btn-logout ms-2 text-nowrap owner" data-bs-toggle="modal" data-bs-target="#logoutOng"><i class="fa fa-power-off"></i></button>
                            <button type="button" class="btn-edit ms-2 text-nowrap owner" data-bs-toggle="modal" data-bs-target="#editOngModal"><i class="fa-regular fa-pen-to-square"></i></button>
                            <button type="button" class="btn-remove ms-2 text-nowrap owner" data-bs-toggle="modal" data-bs-target="#removeOng"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>

                    <!-- Modal - Editar ONG -->
                    <div class="modal fade" id="editOngModal" tabindex="-1" aria-labelledby="editOngModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="editOngModalLabel">Editar ONG</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form enctype="multipart/form-data" id="editOngForm">


                                        <div class="form-group">
                                            <label for="email">E-mail</label>
                                            <input type="text" id="email" name="email" class="form-control" value="${ong.email}" required>
                                        </div>

                                        <div class="form-group pt-3">
                                            <label for="ongName">Nome da ONG</label>
                                            <input type="text" id="ongName" name="ongName" class="form-control ong-input" value="${ong.ongName}" required>
                                        </div>

                                        <div class="form-group pt-3">
                                            <label for="creationYear" class="form-label">Ano de fundação</label>
                                            <input type="date" id="creationYear" class="form-control" name="creationYear" value="${ong.creationYear.substring(0, 10)}" required>
                                        </div>

                                        <div class="form-group pt-3">
                                            <label for="CNPJ">CNPJ</label>
                                            <input type="text" id="CNPJ" name="CNPJ" class="form-control" value="${ong.CNPJ}">
                                        </div>

                                        <div class="row pt-3 align-items-end">
                                            <span>Animais sob proteção: </span>

                                            <div class="col-auto pt-2">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="petsCheckbox1" name="pets" value="Cachorro" ${ong.pets.includes('Cachorro') ? 'checked' : ''}>
                                                    <label class="form-check-label" for="petsCheckbox1">Cachorros</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="petsCheckbox2" name="pets" value="Gato" ${ong.pets.includes('Gato') ? 'checked' : ''}>
                                                    <label class="form-check-label" for="petsCheckbox2">Gatos</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="petsCheckbox3" name="pets" value="Roedores" ${ong.pets.includes('Roedores') ? 'checked' : ''}>
                                                    <label class="form-check-label" for="petsCheckbox3">Roedores</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="petsCheckbox4" name="pets" value="Pássaros" ${ong.pets.includes('Pássaros') ? 'checked' : ''}>
                                                    <label class="form-check-label" for="petsCheckbox4">Pássaros</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="petsCheckbox5" name="pets" value="Outros" ${ong.pets.includes('Outros') ? 'checked' : ''}>
                                                    <label class="form-check-label" for="petsCheckbox5">Outros</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group pt-3">
                                            <label for="address">Endereço</label>
                                            <input type="text" id="address" name="address" class="form-control ong-input" value="${ong.address}" required>
                                        </div>

                                        <div class=" pt-3">
                                            <label for="cidade" class="form-label">Cidade</label>
                                            <select class="form-select" id="citySelect" name="city" required>
                                            </select>
                                        </div>
                                        <div class=" pt-3">
                                            <label for="estado" class="form-label">Estado</label>
                                            <select class="form-select" id="stateSelect" name="state" required>
                                                <option value="AC" ${ong.state === 'AC' ? 'selected' : ''}>Acre</option>
                                                <option value="AL" ${ong.state === 'AL' ? 'selected' : ''}>Alagoas</option>
                                                <option value="AP" ${ong.state === 'AP' ? 'selected' : ''}>Amapá</option>
                                                <option value="AM" ${ong.state === 'AM' ? 'selected' : ''}>Amazonas</option>
                                                <option value="BA" ${ong.state === 'BA' ? 'selected' : ''}>Bahia</option>
                                                <option value="CE" ${ong.state === 'CE' ? 'selected' : ''}>Ceará</option>
                                                <option value="DF" ${ong.state === 'DF' ? 'selected' : ''}>Distrito Federal</option>
                                                <option value="ES" ${ong.state === 'ES' ? 'selected' : ''}>Espírito Santo</option>
                                                <option value="GO" ${ong.state === 'GO' ? 'selected' : ''}>Goiás</option>
                                                <option value="MA" ${ong.state === 'MA' ? 'selected' : ''}>Maranhão</option>
                                                <option value="MT" ${ong.state === 'MT' ? 'selected' : ''}>Mato Grosso</option>
                                                <option value="MS" ${ong.state === 'MS' ? 'selected' : ''}>Mato Grosso do Sul</option>
                                                <option value="MG" ${ong.state === 'MG' ? 'selected' : ''}>Minas Gerais</option>
                                                <option value="PA" ${ong.state === 'PA' ? 'selected' : ''}>Pará</option>
                                                <option value="PB" ${ong.state === 'PB' ? 'selected' : ''}>Paraíba</option>
                                                <option value="PR" ${ong.state === 'PR' ? 'selected' : ''}>Paraná</option>
                                                <option value="PE" ${ong.state === 'PE' ? 'selected' : ''}>Pernambuco</option>
                                                <option value="PI" ${ong.state === 'PI' ? 'selected' : ''}>Piauí</option>
                                                <option value="RJ" ${ong.state === 'RJ' ? 'selected' : ''}>Rio de Janeiro</option>
                                                <option value="RN" ${ong.state === 'RN' ? 'selected' : ''}>Rio Grande do Norte</option>
                                                <option value="RS" ${ong.state === 'RS' ? 'selected' : ''}>Rio Grande do Sul</option>
                                                <option value="RO" ${ong.state === 'RO' ? 'selected' : ''}>Rondônia</option>
                                                <option value="RR" ${ong.state === 'RR' ? 'selected' : ''}>Roraima</option>
                                                <option value="SC" ${ong.state === 'SC' ? 'selected' : ''}>Santa Catarina</option>
                                                <option value="SP" ${ong.state === 'SP' ? 'selected' : ''}>São Paulo</option>
                                                <option value="SE" ${ong.state === 'SE' ? 'selected' : ''}>Sergipe</option>
                                                <option value="TO" ${ong.state === 'TO' ? 'selected' : ''}>Tocantins</option>
                                            </select>
                                        </div>
                                    
                                        <div class="form-group pt-3">
                                            <label for="about">Descrição</label>
                                            <input type="text" id="about" name="about" class="form-control" value="${ong.about}" required>
                                        </div>
                                    
                                        <div class="form-group pt-3">
                                            <label for="phoneNumber">Número de telefone</label>
                                            <input type="text" id="phoneNumber" name="phoneNumber" class="form-control" value="${ong.phoneNumber}" required>
                                        </div>

                                        <div class="form-group pt-3">
                                            <label for="website">Site</label>
                                            <input type="text" id="website" name="website" value="${ong.website}" class="form-control">
                                        </div>
                                    
                                        <div class="form-group pt-3">
                                            <label for="instagram">Instagram</label>
                                            <input type="text" id="instagram" name="instagram" class="form-control" value="${ong.instagram}">
                                        </div>
                                    
                                        <div class="form-group pt-3">
                                            <label for="facebook">Facebook</label>
                                            <input type="text" id="facebook" name="facebook" class="form-control" value="${ong.facebook}">
                                        </div>
                                    
                                        <div class="form-group pt-3">
                                            <label for="whatsapp">WhatsApp</label>
                                            <input type="text" id="whatsapp" name="whatsapp" class="form-control" value="${ong.whatsapp}">
                                        </div>

                                        <div class="form-group pt-3">
                                            <label for="pix">Pix</label>
                                            <input type="text" id="pix" name="pix" class="form-control" value="${ong.pix}">
                                        </div>

                                        <div class="form-group pt-3">
                                            <label for="contribute">Mensagem para incentivar doações</label>
                                            <input type="text" id="contribute" name="contribute" class="form-control" value="${ong.contribute}">
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

                    <!-- Modal - Editar ONG (Pop-up sucesso ao editar) -->
                    <div class="modal fade" id="popUpCorretoEdit" tabindex="-1" aria-labelledby="popUpCorretoEditLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="popUpCorretoEditLabel">Sucesso</h5>
                                    <button id="redirectButtonEdit" type="button" class="btn-close" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Perfil da ONG editado com sucesso!
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal - Editar ONG (Pop-up erro ao editar) -->
                    <div class="modal fade" id="popUpErroEdit" tabindex="-1" aria-labelledby="popUpErroEditLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="popUpErroEdit">Erro</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Falha ao editar o perfil da ONG. Tente novamente mais tarde!
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal - Remover ONG (Pop-up inicial) -->
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
                            <div id="pets" class="font-info"></div>
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

                        <div class="d-flex justify-content-start pt-1 align-items-center">
                            <!-- Instagram -->
                            <a id="instaDiv" href="https://www.instagram.com/${ong.instagram}/" target="_blank" class="btn btn-standard-click rounded-pill me-2">
                                <i class="fa-brands fa-instagram"></i>
                                Instagram
                            </a>

                            <!-- Facebook -->
                            <a id="faceDiv" href="https://www.facebook.com/${ong.facebook}/about" target="_blank" class="btn btn-standard-click rounded-pill me-2">
                                <i class="fa-brands fa-facebook-f"></i>
                                Facebook
                            </a>

                            <!-- Sem contato -->
                            <div id="semContato" class="font-info">ONG sem redes sociais :(</div>
                        </div>
                        <button class="btn btn-contribua rounded-pill mt-3" data-bs-toggle="modal" data-bs-target="#ongContribuir">CONTRIBUA!</button>
                    </div>
                </div>
                <div class="col-2">
                </div>
            </div>


            <!-- Modal - Contribua -->
            <div class="modal fade" id="ongContribuir" tabindex="-1" aria-labelledby="ongContribuirLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ongContribuirLabel">Como contribuir?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${ong.contribute}

                            <br>
                            <br>

                            Chave PIX: ${ong.pix}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal - Remover ONG (Pop-up sucesso ao apagar) -->
            <div class="modal fade" id="popUpCorreto" tabindex="-1" aria-labelledby="popUpLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="popUpLabel">Sucesso</h5>
                            <button id="redirectButton" type="button" class="btn-close" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Perfil da ONG apagado com sucesso!
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal - Remover ONG (Pop-up erro ao apagar) -->
            <div class="modal fade" id="popUpErro" tabindex="-1" aria-labelledby="popUpLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="popUpLabel">Erro</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Falha ao apagar o perfil da ONG. Tente novamente mais tarde!
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>`;

    const statesSelect = ongCard.querySelector('#stateSelect');
    const citySelect = ongCard.querySelector('#citySelect');

    statesSelect.addEventListener('change', selectCityByState);
    async function selectCityByState() {
        const selectedState = statesSelect.value;
        const cities = await fetchCitiesByState(selectedState);

        citySelect.innerHTML = '';

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            if (city == ong.city) {
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

    const petsElements = ongCard.querySelectorAll("#pets");
    const pets = `${ong.pets}`;
    const formattedPets = pets.split(',').join(', ');
    petsElements.forEach(petsElement => {
        petsElement.textContent = formattedPets;
    });

    const editarForm = ongCard.querySelector('#editOngForm');

    let instagramDiv = ongCard.querySelector("#instaDiv");
    let facebookDiv = ongCard.querySelector("#faceDiv");
    let semContatoDiv = ongCard.querySelector("#semContato")
    let temContato = true
    const botoes = ongCard.querySelectorAll(".owner");
    botoes.forEach(botao => {
        if (!owner) {
            botao.style.display = 'none';
        }
    });

    if (!(ong.instagram || ong.facebook)) {
        temContato = false
    }
    if (!ong.instagram) {
        instagramDiv.remove()
    }
    if (!ong.facebook) {
        facebookDiv.remove()
    }
    if (temContato) {
        semContatoDiv.remove()
    }

    editarForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(editarForm); // Correctly pass the form element, not the event

        ong.pets.forEach((pet, index) => {
            formData.append('pets[]', pet);
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

        data['role'] = 'ONG'
        fetch(`/ongs/${ong.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Perfil da ONG com ID " + ong.id + " atualizado"); // Adjusted to use the correct ID

                    var popUp = new bootstrap.Modal(document.querySelector('#popUpCorretoEdit'))
                    popUp.toggle()
                    popUp.show()

                    const botaoRedirect = document.querySelector('#redirectButtonEdit')

                    botaoRedirect.addEventListener('click', () => {
                        window.location.href = "ong.html?id=" + ong.id;
                    })
                } else {
                    console.error('Erro ao atualizar perfil da ONG.');

                    var popUp = new bootstrap.Modal(document.querySelector('#popUpErroEdit'))
                    popUp.toggle()
                    popUp.show()
                }
            })
    });

    const deleteButton = ongCard.querySelector('#confirmDeletion')

    const ongId = getParameterByName('id');

    const logout = ongCard.querySelectorAll('.btn-logout')
    logout.forEach(log => {
        log.addEventListener('click', function () {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = 'home.html';
        });
    }
    )
    deleteButton.addEventListener('click', async () => {
        let isSucesso = 1;

        await fetch(`/ongs/${ongId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Perfil da ONG com ID ${ongId} removido`);
                    isSucesso = 1
                } else {
                    console.error('Erro ao remover conta da ONG.');
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

    return ongCard;
}

function addPetsButton(ONGId) {
    const botaoadd = `
    <!-- Modal -->
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="petModalLabel">Adicionar um Pet</h5>
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
                                        <select class="form-select" id="citySelect" name="city" required>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="estado" class="form-label">Estado</label>
                                        <select class="form-select" id="stateSelect" name="state" required>
                                            <option value="SP">São Paulo</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="PR">Paraná</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="type" class="form-label">Espécie</label>
                                        <select class="form-select" id="specie" name="type" required>
                                            <option value="Cachorro">Cachorro</option>
                                            <option value="Gato">Gato</option>
                                            <option value="Roedor">Roedor</option>
                                            <option value="Passaro">Passaro</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="breed" class="form-label">Raça</label>
                                        <select class="form-select" id="breed" name="breed" required>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="sex" class="form-label">Sexo</label>
                                        <select class="form-select" id="sex" name="sex" required>
                                            <option value="Macho">Macho</option>
                                            <option value="Fêmea">Fêmea</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="porte" class="form-label">Porte</label>
                                        <select class="form-select" id="porte" name="size" required>
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
                                    <input class="form-control" type="file" id="formFileMultiple" name="photos" multiple required>
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
                                    <span>Castrado: </span>
                                </div>
                                <div class="col">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="castratedYes" name="castrated" value="1" required>
                                        <label class="form-check-label" for="castratedYes">Sim</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="castratedNo" name="castrated" value="0">
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
                                        <input class="form-check-input" type="radio" id="chippedYes" name="chipped" value="1" required>
                                        <label class="form-check-label" for="chippedYes">Sim</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="chippedNo" name="chipped" value="0">
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
                                        <input class="form-check-input" type="radio" id="adoptedYes" name="adopted" value=1>
                                        <label class="form-check-label" for="adoptedYes">Sim</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="adoptedNo" name="adopted" value=0 required>
                                        <label class="form-check-label" for="adoptedNo">Não</label>
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" name="ongId" value="${ONGId}">

                            <div class="row">
                                <div class="col text-end">
                                    <button class="btn btn-standard-click" type="submit">Adicionar</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>`


    return botaoadd;
}

const breedOptions = {
    Cachorro: ["Sem raça definida", "Labrador", "Pastor Alemão", "Golden Retriever", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Boxer", "Dachshund", "Shih Tzu", "Chihuahua", "Pug", "Maltês", "Doberman", "Border Collie", "Schnauzer", "Dogue Alemão", "Akita", "Pastor Australiano"],
    Gato: ["Siamês", "Persa", "Maine Coon", "Bengal", "Ragdoll", "British Shorthair", "Sphynx", "Scottish Fold", "American Shorthair", "Siberiano", "Devon Rex", "Oriental Shorthair"],
    Roedor: ["Hamster", "Porquinho-da-Índia", "Gerbil", "Camundongo", "Rato", "Furão", "Capivara", "Chinchila", "Esquilo", "Coelho"],
    Passaro: ["Canário", "Papagaio", "Pardal", "Periquito", "Calopsita", "Arara", "Cacatua", "Periquito Australiano", "Papagaio-do-congo", "Tucano", "Pombo", "Codorna"]
};


async function createPetsOwnedCard(ONGId, owner, isuser) {
    const petsOwnedCard = document.createElement('div');
    petsOwnedCard.innerHTML = `
        
    <!-- Animais da ONG -->
    <div class="container-xxl mt-4">
        <div class="row">
            <div class="col ong-pets-title">
                Animais esperando por um lar!
            </div>
            <div class="col">
                <button type="button" class="ms-auto btn btn-standard-click btn-lg rounded-pill owner" data-bs-toggle="modal" data-bs-target="#petModal">
                    Adicionar um Pet
                </button>
            </div>
        </div>
        <div class="modal fade" id="petModal" tabindex="-1" aria-labelledby="petModalLabel" aria-hidden="true">
        </div>
        <div class="row d-flex">
            <div class="col d-flex">
                <div class="d-inline-flex flex-column mt-3">
                    <div id="GridPets" class="d-flex flex-wrap"></div>
                </div>
            </div>
        </div>
    </div>
    `;


    const botao = petsOwnedCard.querySelector('#petModal');
    const botoes = petsOwnedCard.querySelector(".owner");
    if (owner) {
        botoes.style.display = 'block';
    }
    else {
        botoes.style.display = 'none';
    }
    botao.innerHTML += addPetsButton(ONGId);
    const petsContainer = petsOwnedCard.querySelector('#GridPets');

    const speciesSelect = petsOwnedCard.querySelector('#specie');
    const breedSelect = petsOwnedCard.querySelector('#breed');

    speciesSelect.addEventListener('change', selectBreedBySpecie);
    function selectBreedBySpecie() {
        const selectedSpecies = speciesSelect.value;
        const breeds = breedOptions[selectedSpecies] || [];

        breedSelect.innerHTML = '';

        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            breedSelect.appendChild(option);
        });
    }

    selectBreedBySpecie();

    try {
        const response = await fetch(`/ONG-pets/${ONGId}`);
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
                        fetch(`/likes/${isuser}}/${petId}`, { method: 'DELETE' })
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

    return petsOwnedCard;
}