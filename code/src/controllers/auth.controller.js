import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ONG from "../model/ong.model.js";
import { Usuario } from "../model/user.model.js";
import upload from '../upload/upload_img.js';


const secret = process.env.AUTH_SECRET;

// Utility function to generate JWT
function getToken(uid, uemail) {
  return jwt.sign({ sub: uid, email: uemail }, secret, { expiresIn: "7d" });
}

// Register ONG
// Register ONG
async function registerONG(request, response) {
  try {
    const nome = request.body.accountName;
    const senha = request.body.password;
    if (!nome || !senha) {
      return response.status(400).send("Informe usuário e senha!");
    }
    const existingONG = await ONG.findOne({ where: { accountName: nome } });
    if (existingONG) {
      return response.status(400).send("Parceiro já cadastrado!");
    }
    const hashedPassword = bcrypt.hashSync(senha, bcrypt.genSaltSync());
    const uploadedPhotos = await upload.getFileUrl(request.file.key);
    const res = await ONG
    .create(
      {
        accountName: nome,
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
        twitter: request.body.twitter,
        whatsapp: request.body.whatsapp,
        role: request.body.role
      },
      { where: { id: request.params.id } },
    )
    const token = getToken(res.id, res.accountName);
    response.status(201).send({ token });
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
}

// Register User
async function registerUser(request, response) {
  try {
    const nome = request.body.accountName;
    const senha = request.body.password;
    if (!nome || !senha) {
      return response.status(400).send("Informe usuário e senha!");
    }
    const existingUser = await Usuario.findOne({ where: {accountName: nome } });
    if (existingUser) {
      return response.status(400).send("Parceiro já cadastrado!");
    }
    const hashedPassword = bcrypt.hashSync(senha, bcrypt.genSaltSync());
    const uploadedPhotos = await upload.getFileUrl(request.file.key);
    const res = await Usuario
    .create(
      {
        accountName: nome,
        password: hashedPassword,
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
    const token = getToken(res.id, res.accountName);
    response.status(201).send({ token });
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
}

// Login User
async function loginUser(request, response) {
  try {
    const { accountName, password } = request.body;

    console.log(request.body);

    if (!accountName || !password) {
      return response.status(400).send("Informe usuário e senha!");
    }

    const user = await Usuario.findOne({ where: { accountName } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return response.status(401).send("Usuário e senha inválidos!");
    }

    const token = getToken(user.id, user.Nome_Conta);
    response
      .status(200)
      .json({ id: user.id, accountName: user.accountName, token });
  } catch (erro) {
    console.error(erro);
    response.status(500).send(erro);
  }
}

// Login ONG
async function loginONG(request, response) {
  try {
    const { accountName, password } = request.body;

    if (!accountName || !password) {
      return response.status(400).send("Informe usuário e senha!");
    }

    const ong = await ONG.findOne({ where: { accountName } });
    if (!ong || !bcrypt.compareSync(password, ong.password)) {
      return response.status(401).send("Usuário e senha inválidos!");
    }

    const token = getToken(ong.id, ong.accountName);
    response
      .status(200)
      .json({ id: ong.id, accountName: ong.accountName, token });
  } catch (erro) {
    console.error(erro);
    response.status(500).send(erro);
  }
}

//valida se pode alterar o valor daquele id e se eh ong
const authPageId = (permissions) => {
  return (request, response, next) => {
    const userRole = request.body.role;
    const routeId = parseInt(request.params.id);

    let token = request.headers.authorization;
    let requestId;

    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7);
      try {
        const decoded = jwt.verify(token, secret);
        requestId = parseInt(decoded.sub);
      } catch (err) {
        return response.status(401).json("Token verification failed");
      }
    } else {
      return response.status(401).json("No token provided");
    }

    if (permissions.includes(userRole) && requestId === routeId) {
      next();
    } else {
      return response.status(401).json("Nao autorizado " + requestId);
    }
  };
};
const authPage = (permissions) => {
  return (request, response, next) => {
    const userRole = request.body.role;
    if (permissions.includes(userRole)) {
      next();
    } else {
      return response.status(401).json("Nao autorizado");
    }
  };
};

// Validate Token Middleware
function validateToken(request, response, next) {
  try {
    let token = request.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.slice(7);
      jwt.verify(token, secret);
      return next();
    }
    response.status(401).send({ message: "Unauthorized" });
  } catch (error) {
    response.status(401).send({ message: "Unauthorized" });
  }
}

function findAllUser(request, response) {
  Usuario.findAll()
    .then(function (res) {
      response.json(res).status(200);
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
}

function findAllONG(request, response) {
  ONG.findAll()
    .then(function (res) {
      response.json(res).status(200);
    })
    .catch(function (err) {
      response.json(err).status(500);
    });
}

export default {
  registerONG,
  registerUser,
  loginUser,
  loginONG,
  validateToken,
  findAllUser,
  findAllONG,
  authPageId,
  authPage,
};
