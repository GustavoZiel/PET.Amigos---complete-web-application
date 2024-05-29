import { response } from "express";
import model from "../model/ong.model.js";

function getAll(request, response) {
  const ongs = model.findAll();
  response.send(ongs);
}

function getById(request, response) {
  const ong = model.findById(request.params.id);
  response.send(ong);
}

function create(request, response) {
  const result = model.create(request.body.ong);
  response.status(201).send(result);
}

export default { getAll, getById, create };
