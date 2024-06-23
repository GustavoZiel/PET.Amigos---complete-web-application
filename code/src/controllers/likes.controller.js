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
    .findAll({ where: { UserId: request.params.UserId} })
    .then(function (res) {
        response.json(res).status(200);
    })
    .catch(function (err) {
        response.json(err).status(500);
    });
}
function findBykey(request, response) {
    UsuarioPet
    .findOne({ where: { UserId: request.params.UserId, petId: request.params.petId } })
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
        UserId: 1,
        petId: request.body.petId
    },
    { where: { id: request.params.id } },
    )
    response.status(200).json(res);
}

function deleteBykey(request, response) {
    UsuarioPet
    .destroy({ where: { UserId: request.params.UserId, petId: request.params.petId } })
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
        UserId: 1,
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
