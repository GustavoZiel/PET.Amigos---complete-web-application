import { response } from "express";
import model from "../model/usuario.model.js";

function getAll(request, response) {
  const usuarios = model.findAll();
  response.send(usuarios);
}

function getById(request, response) {
  const usuario = model.findById(request.params.id);
  response.send(usuario);
}

function create(request, response) {
  const result = model.create(request.body.usuario);
  response.status(201).send(result);
}

export default { getAll, getById, create };
