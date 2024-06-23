import Pet from "../model/pet.model.js";
import upload from '../upload/upload_img.js';
import { Op } from 'sequelize';
import { Usuario } from "../model/user.model.js";

function findAll(request, response) {
  Pet
    .findAll()
    .then(function (res) {
      response.json(res).status(200);
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
}

function findById(request, response) {
  Pet
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
    const { birthstart, birthend, city, state, type, sex, par_temperaments, castrated, chipped, adopted } = req.query;
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
    if (par_temperaments) {
      let parTemperamentsArray = Array.isArray(par_temperaments) ? par_temperaments : JSON.parse(par_temperaments);
      if (parTemperamentsArray.length > 0) {
        if (!searchParams.where.temperament) {
          searchParams.where.temperament = {};
        }
        searchParams.where.temperament[Op.and] = parTemperamentsArray.map(temp => ({ [Op.contains]: [temp] }));
      }
    }
    if (castrated)
      searchParams.where.castrated = castrated;
    if (chipped)
      searchParams.where.chipped = chipped;
    if (adopted)
      searchParams.where.adopted = adopted;

    // Buscar os pets com base nos parâmetros
    const pets = await Pet.findAll(searchParams);

    res.status(200).json(pets);
  } catch (err) {
    console.error('Error searching for pets:', err);
    res.status(500).json({ error: 'Failed to search for pets' });
  }
}
async function getLikedPets(req, res){
  try{
    const UserId = req.params.UserId;
    const likes = await Usuario.findAll({
      where: { id: UserId },
      include: [{
        model: Pet,
        required: false,
        through: {
          attributes: [] // se você tiver uma tabela de junção e não quiser incluir os atributos dela
        }
      }]
    });
    if (!likes) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const pets = likes.flatMap(usuario => 
      usuario.Pets.map(pet => ({
          id: pet.id,
          name: pet.name,
          city: pet.city,
          state: pet.state,
          photos: pet.photos,
      }))
  );
    return res.status(200).json(pets);
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar pets" });
  }
}
async function getONGPets(req, res){
  try{
    const ONGId = req.params.ONGId;
    console.log(ONGId);
      const pets = await Pet.findAll({
        where: { ONGId: ONGId },
      });
      if (!pets) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      console.log(pets)
      const animais = pets.map(pet => ({
          id: pet.id,
          name: pet.name,
          city: pet.city,
          state: pet.state,
          photos: pet.photos,
      }));
      return res.status(200).json(animais);
    }catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar pets" });
    }
}

async function create(request, response) {
  let temperament = request.body.temperament;
  if (!temperament) {
    temperament = [];
  } else if (!Array.isArray(temperament)) {
    temperament = [temperament];
  }

  const uploadedPhotos = await upload.getFileUrl(request.file.key);
  const res = await Pet
    .create(
      {
        name: request.body.name,
        birth: request.body.birth,
        city: request.body.city,
        state: request.body.state,
        type: request.body.type,
        sex: request.body.sex,
        breed: request.body.breed,
        size: request.body.size,
        photos: uploadedPhotos,
        temperament: temperament,
        comment: request.body.comment,
        castrated: request.body.castrated,
        chipped: request.body.chipped,
        adopted: request.body.adopted,
      },
      { where: { id: request.params.id } },
    )
  response.status(200).json(res);
}

function deleteByPk(request, response) {
  Pet
    .destroy({ where: { id: request.params.id } })
    .then(() => {
      response.status(200).send("Pet deleted successfully !");
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
}

function update(request, response) {
  console.log(request.params)
  console.log(request.body)
  
  console.log(request.body.temperament)
  let temperament = request.body.temperament;
  if (!temperament) {
    temperament = [];
  } else if (!Array.isArray(temperament)) {
    temperament = [temperament];
  }
  console.log(temperament)
  Pet
    .update(
      {
        name: request.body.name,
        birth: request.body.birth,
        city: request.body.city,
        state: request.body.state,
        type: request.body.type,
        sex: request.body.sex,
        breed: request.body.breed,
        size: request.body.size,
        temperament: temperament,
        comment: request.body.comment,
        castrated: request.body.castrated,
        chipped: request.body.chipped,
        adopted: request.body.adopted,
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
  getONGPets,
  getLikedPets,
};
