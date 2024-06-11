import model from "../model/pet.model.js";
import upload from '../upload/upload_img.js';
import { Op } from 'sequelize';

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

async function searchBy(req, res) {
  try {
    const { birthstart, birthend, city, state, type, sex, vacinated, adopted } = req.query;
    console.log(typeof birthend);
    const searchParams = {
      where: {}
    };

    if (birthstart !== null && birthend !== null)
      searchParams.where.birth = { [Op.between]: [birthstart, birthend] };
    else if (birthstart === null && birthend === null)
      delete searchParams.where.birth;
    if (city)
      searchParams.where.city = city;
    if (state)
      searchParams.where.state = state;
    if (type)
      searchParams.where.type = type;
    if (sex)
      searchParams.where.sex = sex;
    if (vacinated)
      searchParams.where.vacinated = vacinated;
    if (adopted)
      searchParams.where.adopted = adopted;

    // Buscar os pets com base nos parâmetros
    const pets = await model.findAll(searchParams);

    res.status(200).json(pets);
  } catch (err) {
    console.error('Error searching for pets:', err);
    res.status(500).json({ error: 'Failed to search for pets' });
  }
}
async function create(request, response) {
  // const uploadedPhotos = await upload.getFileUrl(request.file.key);
  // console.log(uploadedPhotos);
  // console.log(typeof uploadedPhotos);
  const res = await model
    .create(
      {
        name: request.body.name,
        birth: request.body.birth,
        city: request.body.city,
        state: request.body.state,
        type: request.body.type,
        breed: request.body.breed,
        sex: request.body.sex,
        size: request.body.size,
        // photos: uploadedPhotos,
        comment: request.body.comment,
        vacinated: request.body.vacinated,
        adopted: request.body.adopted,
      },
      { where: { id: request.params.id } },
    )
  response.status(200).json(res);
}

function deleteByPk(request, response) {
  model
    .destroy({ where: { id: request.params.id } })
    .then( () => {
      response.status(200).send("Pet deleted successfully !");
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
    .then(() => {
      response.status(200).send("Pet update successfully !");
    })
    .catch((e) => {
      response.json(e).status(500);
    });
}

export default {
  findAll,
  findById,
  searchBy,
  create,
  deleteByPk,
  update,
};
