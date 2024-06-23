import { Usuario } from "../model/user.model.js";
import upload from '../upload/upload_img.js';

function findAll(request, response) {
  Usuario
    .findAll()
    .then(function (res) {
      response.json(res).status(200);
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
}

function findById(request, response) {
  Usuario
    .findOne({ where: { id: request.params.id } })
    .then(function (res) {
      response.json(res).status(200);
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
}
async function create(request, response) {
  const uploadedPhotos = await upload.getFileUrl(request.file.key);
  const res = await Usuario
  .create(
    {
      email: nome,
      password: hashedPassword,
      userName: request.body.userName,
      birthDate: request.body.birthDate,
      city: request.body.city,
      state: request.body.state,
      home: request.body.home,
      preferences: request.body.preferences,
      about: request.body.about,
      photo: uploadedPhotos,
      phoneNumber: request.body.phoneNumber,
      role: request.body.role
    },
    { where: { id: request.params.id } },
  )
  response.status(200).json(res);
}

function deleteById(request, response) {
  Usuario
  .destroy({ where: { id: request.params.id } })
  .then( () => {
    response.status(200).send("User deleted successfully !");
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
  }
  
  function update(request, response) {
    const preferences = Array.isArray(request.body.preferences) ? request.body.preferences : [request.body.preferences];

    Usuario
    .update(
      {
        email: request.body.email,
        userName: request.body.userName,
        birthDate: request.body.birthDate,
        city: request.body.city,
        state: request.body.state,
        home: request.body.home,
        preferences: preferences,
        about: request.body.about,
        phoneNumber: request.body.phoneNumber,
        role: request.body.role
      },
      { where: { id: request.params.id } },
    )
    .then( () => {
      response.status(200).send("User updated successfully !");
    })
    .catch((e) => {
      response.json(e).status(500);
      console.log(e)
    });
}

export default {
  findAll,
  findById,
  create,
  deleteById,
  update,
};

