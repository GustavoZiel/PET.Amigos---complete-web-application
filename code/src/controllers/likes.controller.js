import { UsuarioPet } from "../model/user.model.js";
function findAll(request, response) {
    UsuarioPet
    .findAll()
    .then(function (res) {
        response.json(res).status(200);
    })
    .catch(function (err) {
        response.json(err).status(500);
    });
}
function findByuser(request, response) {
    UsuarioPet
    .findAll({ where: { accountName: request.params.accountName} })
    .then(function (res) {
        response.json(res).status(200);
    })
    .catch(function (err) {
        response.json(err).status(500);
    });
}
function findBykey(request, response) {
    UsuarioPet
    .findOne({ where: { accountName: request.params.accountName, petId: request.params.petId } })
    .then(function (res) {
        response.json(res).status(200);
    })
    .catch(function (err) {
        response.json(err).status(500);
    });
}
async function create(request, response) {
    const res = await UsuarioPet
    .create(
    {
        accountName: 1,
        petId: request.body.petId
    },
    { where: { id: request.params.id } },
    )
    response.status(200).json(res);
}

function deleteBykey(request, response) {
    UsuarioPet
    .destroy({ where: { accountName: request.params.accountName, petId: request.params.petId } })
    .then( () => {
        response.status(200).send("ONG deleted successfully !");
    })
    .catch(function (err) {
        response.json(err).status(500);
    });
}

function update(request, response) {
    UsuarioPet
    .update(
    {
        accountName: 1,
        petId: request.body.petId
    },
    { where: { id: request.params.id } },
    )
    .then( () => {
        response.status(200).send("ONG updated successfully !");
    })
    .catch((e) => {
        response.json(e).status(500);
    });
}

export default {
    findAll,
    findBykey,
    findByuser,
    create,
    deleteBykey,
    update,
};
