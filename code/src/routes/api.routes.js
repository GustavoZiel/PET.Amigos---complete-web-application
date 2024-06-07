import express from "express";
import petController from "../controllers/pet.controller.js";
import usuarioController from "../controllers/usuario.controller.js";
import ongController from "../controllers/ong.controller.js";
import upload from '../upload/upload_img.js';

const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/home_page.html');
});
router.get("/pets", petController.findAll);
router.get("/pets/:id", petController.findById);
router.post("/pets", upload.uploadFile.array('photos', 5), petController.createInstance);
router.delete("/pets/:id", petController.deleteByPk);
router.put("/pets/:id", petController.update);

router.get("/usuarios", usuarioController.getAll);
router.get("/usuarios/:id", usuarioController.getById);
router.post("/usuarios", usuarioController.create);
router.get("/ongs", ongController.getAll);
router.get("/ongs/:id", ongController.getById);
router.post("/ongs", ongController.create);

export default router;