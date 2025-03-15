//se enviara el email y la contraseña que fue lo que colocamos

const express = require('express');
const router = express.Router();
const authController = require ('../controllers/auth.controller');
router.post('/auth/login', authController.login);


moduler.exports = router;


//definimos la ruta que vamos a conseguir 