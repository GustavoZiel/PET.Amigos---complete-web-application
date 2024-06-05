import model from "../model/pet.model.js";

function findAll(request, response) {
  model
    .findAll()
    .then(function (res) {
      response.json(res).status(200);
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
}

function findById(request, response) {
  model
    .findByPk(request.params.id)
    .then(function (res) {
      response.json(res).status(200);
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
}

function createInstance(request, response) {
  model
    .create({
      name: request.body.name,
      birth: request.body.birth,
      city: request.body.city,
      state: request.body.state,
      type: request.body.type,
      breed: request.body.breed,
      sex: request.body.sex,
      size: request.body.size,
      comment: request.body.comment,
      vacinated: request.body.vacinated,
      adopted: request.body.adopted
    })
    .then(function (res) {
      response.json(res).status(200);
    })
    // Para redirecionar ele para de volta para a página de inserção
    // .then(function (res) {
    //   console.log("Pet criado com sucesso !");
    //   response.redirect(request.get('referer'));
    //   console.log(res);
    // })
    .catch(function (err) {
      response.json(err).status(500);
    });
}

function deleteByPk(request, response) {
  model
  .destroy({ where: { id: request.params.id } })
  .then(function (res) {
    response.status(200).send();
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
  }
  
  function update(request, response) {
    model
    .update(
      {
        name: request.body.name,
        birth: request.body.birth,
        city: request.body.city,
        state: request.body.state,
        type: request.body.type,
        breed: request.body.breed,
        sex: request.body.sex,
        size: request.body.size,
        comment: request.body.comment,
        vacinated: request.body.vacinated,
        adopted: request.body.adopted
      },
      { where: { id: request.params.id } },
    )
    .then(function (res) {
      response.status(200).send(res);
    })
    .catch((e) => {
      response.json(e).status(500);
    });
}

export default {
  findAll,
  findById,
  createInstance,
  deleteByPk,
  update,
};
