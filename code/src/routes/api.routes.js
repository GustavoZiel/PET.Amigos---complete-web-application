import express from "express";
import petController from "../controllers/pet.controller.js";
import usuarioController from "../controllers/usuario.controller.js";
import ongController from "../controllers/ong.controller.js";
import contatos from "../controllers/contatos.controller.js";


const router = express.Router();

router.get("/pets", petController.getAll);
router.get("/pets/:id", petController.getById);
router.post("/pets", petController.create);
router.get("/usuarios", usuarioController.getAll);
router.get("/usuarios/:id", usuarioController.getById);
router.post("/usuarios", usuarioController.create);
router.get("/ongs", ongController.getAll);
router.get("/ongs/:id", ongController.getById);
router.post("/ongs", ongController.create);
router.get("/contatos", contatos.getAll);
router.get("/contatos/:id", contatos.getById);
router.post("/contatos", contatos.create);


export default router;
