import { response } from "express";
import model from "../model/pet.model.js";

function getAll(request, response) {
  const pets = model.findAll();
  response.send(pets);
}

function getById(request, response) {
  const pet = model.findById(request.params.id);
  response.send(pet);
}

function create(request, response) {
  const result = model.create(request.body.pet);
  response.status(201).send(result);
}

export default { getAll, getById, create };
