import model from "../model/ong.model.js";
import upload from '../upload/upload_img.js';
import bcrypy from 'bcryptjs';

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
        email: request.body.email,
        password: hashedPassword,
        ongName: request.body.ongName,
        creationYear: request.body.creationYear,
        city: request.body.city,
        state: request.body.state,
        address: request.body.address,
        CNPJ: request.body.CNPJ,
        pets: request.body.pets,
        about: request.body.about,
        photo: uploadedPhotos,
        phoneNumber: request.body.phoneNumber,
        website: request.body.website,
        instagram: request.body.instagram,
        facebook: request.body.facebook,
        whatsapp: request.body.whatsapp,
        role: request.body.role,
        pix: request.body.pix,
        contribute: request.body.contribute
      },
      { where: { id: request.params.id } },
    )
    response.status(200).json(res);
}

function deleteById(request, response) {
  model
  .destroy({ where: { id: request.params.id } })
  .then( () => {
    response.status(200).send("ONG deleted successfully !");
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
  }
  
  function update(request, response) {
    const pets = Array.isArray(request.body.pets) ? request.body.pets : [request.body.pets];

    model
    .update(
      {
        email: request.body.email,
        ongName: request.body.ongName,
        creationYear: request.body.creationYear,
        city: request.body.city,
        state: request.body.state,
        address: request.body.address,
        CNPJ: request.body.CNPJ,
        pets: pets,
        about: request.body.about,
        phoneNumber: request.body.phoneNumber,
        website: request.body.website,
        instagram: request.body.instagram,
        facebook: request.body.facebook,
        whatsapp: request.body.whatsapp,
        role: request.body.role,
        pix: request.body.pix,
        contribute: request.body.contribute
      },
      { where: { id: request.params.id } },
    )
    .then( () => {
      response.status(200).send("ONG updated successfully !");
      console.log("AAAAAAAAAAAAAAAAAA")
    })
    .catch((e) => {
      response.json(e).status(500);
      console.log("BBBBBBBBBBBBBBBBBBB")
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
