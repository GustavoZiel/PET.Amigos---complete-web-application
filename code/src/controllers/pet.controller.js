import model from "../model/pet.model.js";
import upload from '../upload/upload_img.js';

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
async function create(request, response) {
  const { name, birth, city, state, type, breed, sex, size, comment, vacinated, adopted } = request.body;
  const photos = request.files;

  try {
    const uploadedPhotos = await Promise.all(
      photos.map(async (file) => {
        const fileUrl = await upload.getFileUrl(file.key);
        console.log(fileUrl);
        return fileUrl;
      })
    );
    console.log(uploadedPhotos);
    console.log(typeof uploadedPhotos);
    const pet = {
      name,
      birth,
      city,
      state,
      type,
      breed,
      sex,
      size,
      comment,
      vacinated,
      adopted,
      photos: uploadedPhotos
    };

    const res = await model.create(pet);
    response.status(200).json(res);
  } catch (error) {
    response.status(500).json({ message: 'Erro ao adicionar pet.', error });
  }
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
  create,
  deleteByPk,
  update,
};
