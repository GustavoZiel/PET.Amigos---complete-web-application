import express from "express";
import petController from "../controllers/pet.controller.js";
import usuarioController from "../controllers/user.controller.js";
import ongController from "../controllers/ong.controller.js";
import upload from '../upload/upload_img.js';
// import authController from "../controllers/auth.controller.js";

const router = express.Router();

// Redirect to homepage once connected
router.get('/', function (req, res) {
    res.redirect('/home_page.html');
});



// /* signup e sign in com autenticacao -> post!!*/
// router.post("/signup_users",  upload.uploadFile.single('photo'), authController.registerUser);
// router.post("/signup_ongs", upload.uploadFile.single('photo'), authController.registerONG);
// router.post("/signin_users", authController.loginUser);
// router.post("/signin_ongs", authController.loginONG);

// //so pode criar ongs, usuarios e pets se tiver logado. pets so se for ong -> middlewere
// router.post("/users", authController.authPage("USER"), authController.validateToken);
// router.post("/ongs", authController.authPage("ONG"), authController.validateToken);
// router.put("/ongs/:id", authController.authPageId(["ONG"]), authController.validateToken, ongController.update);
// router.put("/users/:id", authController.authPageId(["USER"]), authController.validateToken, usuarioController.update);
// //router.post("/pets",upload.uploadFile.single('photos'), authController.authPage("ONG"), authController.validateToken, petController.create);
// //router.put("/pets/:id",  upload.uploadFile.single('photos'), authController.authPage("ONG"), authController.validateToken, petController.update); 


// CRUD - Pets
router.post("/pets", upload.uploadFile.single('photos'), petController.create); // Create
router.get("/pets", petController.findAll); // Retrieve
router.get("/pets/search", petController.searchBy);
router.get("/pets/:id", petController.findById); // Retrieve
router.delete("/pets/:id", petController.deleteByPk); // Delete
router.put("/pets/:id", petController.update); // Update

// CRUD - Usuários
router.post("/users", upload.uploadFile.single('photo'), usuarioController.create); // Create
router.get("/users", usuarioController.findAll); // Retrieve
router.get("/users/:id", usuarioController.findById); // Retrieve
router.delete("/users/:id", usuarioController.deleteById); // Delete
router.put("/users/:id", usuarioController.update); // Update

// CRUD - Ongs
router.post("/ongs", upload.uploadFile.single('photo'), ongController.create); // Create
router.get("/ongs", ongController.findAll); // Retrieve
router.get("/ongs/:id", ongController.findById); // Retrieve
router.delete("/ongs/:id", ongController.deleteById); // Delete
router.put("/ongs/:id", ongController.update); // Update

export default router;