import model from "../model/user.model.js";
import upload from '../upload/upload_img.js';
import bcrypt from "bcryptjs";

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
  const res = await model
  .create(
    {
      accountName: request.body.accountName,
      password: request.body.password,
      userName: request.body.userName,
      birthDate: request.body.birthDate,
      city: request.body.city,
      state: request.body.state,
      address: request.body.address,
      preferences: request.body.preferences,
      about: request.body.about,
      photo: uploadedPhotos,
      phoneNumber: request.body.phoneNumber,
      website: request.body.website,
      instagram: request.body.instagram,
      facebook: request.body.facebook,
      twitter: request.body.twitter,
      whatsapp: request.body.whatsapp,
      role: request.body.role
    },
    { where: { id: request.params.id } },
  )
  response.status(200).json(res);
}

function deleteById(request, response) {
  model
  .destroy({ where: { id: request.params.id } })
  .then( () => {
    response.status(200).send("User deleted successfully !");
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
  }
  
  function update(request, response) {
    model
    .update(
      {
        accountName: request.body.accountName,
        password: request.body.password,
        userName: request.body.userName,
        birthDate: request.body.birthDate,
        city: request.body.city,
        state: request.body.state,
        address: request.body.address,
        preferences: request.body.preferences,
        about: request.body.about,
        photo: request.body.photo,
        phoneNumber: request.body.phoneNumber,
        website: request.body.website,
        instagram: request.body.instagram,
        facebook: request.body.facebook,
        twitter: request.body.twitter,
        whatsapp: request.body.whatsapp,
        role: request.body.role
      },
      { where: { id: request.params.id } },
    )
    .then( () => {
      response.status(200).send("User updated successfully !");
    })
    .catch((e) => {
      response.json(e).status(500);
    });
}


function updatePassword(request, response) {
  const hashedPassword = bcrypt.hashSync(senha, bcrypt.genSaltSync());
  Usuario
    .update(
      {
        password: hashedPassword,
      },
      { where: { email: request.body.email } }
    )
    .then(() => {
      response.status(200).send("Senha atualizada com sucesso");
      console.log("AAAAAAAAAAAAAAAAAA");
    })
    .catch((e) => {
      response.json(e).status(500);
      console.log("BBBBBBBBBBBBBBBBBBB");
      console.log(e);
    });
}

export default {
  findAll,
  findById,
  create,
  deleteById,
  update,
  updatePassword,
};

