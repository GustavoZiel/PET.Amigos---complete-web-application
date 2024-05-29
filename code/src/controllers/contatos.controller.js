import { response } from "express";
import model from "../model/contatos.model.js";

function getAll(request, response) {
  const contatos = model.findAll();
  response.send(contatos);
}

function getById(request, response) {
  const contatos = model.findById(request.params.id);
  response.send(contatos);
}

function create(request, response) {
  const result = model.create(request.body.contatos);
  response.status(201).send(result);
}

export default { getAll, getById, create };
