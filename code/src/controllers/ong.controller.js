import model from "../model/ong.model.js";
<<<<<<< Updated upstream
import upload from '../upload/upload_img.js';
=======
import upload from "../upload/upload_img.js";
import bcrypt from "bcryptjs";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    const uploadedPhotos = await upload.getFileUrl(request.file.key);
    const res = await model
    .create(
      {
        accountName: request.body.accountName,
        password: request.body.password,
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
        twitter: request.body.twitter,
        whatsapp: request.body.whatsapp,
        role: 2,
      },
      { where: { id: request.params.id } },
    )
    response.status(200).json(res);
=======
  const uploadedPhotos = await upload.getFileUrl(request.file.key);
  const res = await model.create(
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
      contribute: request.body.contribute,
    },
    { where: { id: request.params.id } }
  );
  response.status(200).json(res);
>>>>>>> Stashed changes
}

function deleteById(request, response) {
  model
    .destroy({ where: { id: request.params.id } })
    .then(() => {
      response.status(200).send("ONG deleted successfully !");
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
<<<<<<< Updated upstream
  }
  
  function update(request, response) {
    model
=======
}

function update(request, response) {
  const pets = Array.isArray(request.body.pets)
    ? request.body.pets
    : [request.body.pets];

  model
>>>>>>> Stashed changes
    .update(
      {
        accountName: request.body.accountName,
        password: request.body.password,
        ongName: request.body.ongName,
        creationYear: request.body.creationYear,
        city: request.body.city,
        state: request.body.state,
        address: request.body.address,
        CNPJ: request.body.CNPJ,
        pets: request.body.pets,
        about: request.body.about,
        photo: request.body.photo,
        phoneNumber: request.body.phoneNumber,
        website: request.body.website,
        instagram: request.body.instagram,
        facebook: request.body.facebook,
<<<<<<< Updated upstream
        twitter: request.body.twitter,
        whatsapp: request.body.whatsapp
=======
        whatsapp: request.body.whatsapp,
        role: request.body.role,
        pix: request.body.pix,
        contribute: request.body.contribute,
>>>>>>> Stashed changes
      },
      { where: { id: request.params.id } }
    )
    .then(() => {
      response.status(200).send("ONG updated successfully !");
<<<<<<< Updated upstream
    })
    .catch((e) => {
      response.json(e).status(500);
=======
      console.log("AAAAAAAAAAAAAAAAAA");
    })
    .catch((e) => {
      response.json(e).status(500);
      console.log("BBBBBBBBBBBBBBBBBBB");
      console.log(e);
    });
}

function updatePassword(request, response) {
  const hashedPassword = bcrypt.hashSync(senha, bcrypt.genSaltSync());
  model
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
>>>>>>> Stashed changes
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
