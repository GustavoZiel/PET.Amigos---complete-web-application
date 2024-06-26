import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ONG from "../model/ong.model.js";
import USER from "../model/user.model.js";
import { AccessDeniedError } from "sequelize";

const secret = process.env.AUTH_SECRET;

// Utility function to generate JWT
function getToken(uid, uemail) {
  return jwt.sign({ sub: uid, email: uemail }, secret, { expiresIn: "7d" });
}

// Register ONG
// Register ONG
async function registerONG(request, response) {
  try {
    const {
      accountName,
      password,
      ongName,
      creationYear,
      city,
      state,
      address,
      CNPJ,
      pets,
      about,
      photo,
      phoneNumber,
      website,
      instagram,
      facebook,
      twitter,
      whatsapp,
      role,
    } = request.body;

    if (!accountName || !password) {
      return response.status(400).send("Informe usuário e senha!");
    }

    const existingOng = await ONG.findOne({ where: { accountName } });
    if (existingOng) {
      return response.status(400).send("Parceiro já cadastrado!");
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

    console.log(hashedPassword);

    const newOng = await ONG.create({
      accountName,
      password: hashedPassword,
      ongName,
      creationYear: new Date(creationYear),
      city,
      state,
      address,
      CNPJ,
      pets,
      about,
      photo,
      phoneNumber,
      website,
      instagram,
      facebook,
      twitter,
      whatsapp,
      role,
    });

    const token = getToken(newOng.id, newOng.accountName);
    response.status(201).send({ token });
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
}

// Register User
async function registerUser(request, response) {
  try {
    const {
      id,
      accountName,
      password,
      userName,
      birthDate,
      city,
      state,
      address,
      preferences,
      about,
      photo,
      phoneNumber,
      website,
      instagram,
      facebook,
      twitter,
      whatsapp,
      role,
    } = request.body;

    if (!accountName || !password) {
      return response.status(400).send("Informe usuário e senha!");
    }

    const existingUser = await USER.findOne({ where: { accountName } });
    if (existingUser) {
      return response.status(400).send("Parceiro já cadastrado!");
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
    request.body.password = hashedPassword;
    const newUser = await USER.create({
      id,
      accountName,
      password: hashedPassword,
      userName,
      birthDate,
      city,
      state,
      address,
      preferences,
      about,
      photo,
      phoneNumber,
      website,
      instagram,
      facebook,
      twitter,
      whatsapp,
      role,
    });
    const token = getToken(newUser.id, newUser.Nome_Conta);
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

    const user = await USER.findOne({ where: { accountName } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return response.status(401).send("Usuário e senha inválidos!");
    }

    const token = getToken(user.id, user.email);
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

const authPageJustId = () => {
  return (request, response, next) => {
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

    if (requestId === routeId) {
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


export default {
  registerONG,
  registerUser,
  loginUser,
  loginONG,
  validateToken,
  authPageId,
  authPage,
  authPageJustId,
};
