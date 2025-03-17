//se enviara el email y la contraseña que fue lo que colocamos

const express = require('express'); // Importa el framework Express
const router = express.Router();  // Crea un enrutador de Express
const authController = require ('../controllers/auth.controller'); // Importa el controlador de autenticación
router.post('/auth/login', authController.login);  // Definimos la ruta para el inicio de sesión
// Cuando un usuario haga una solicitud POST a "/auth/login", se ejecutará la función "login" del controlador


moduler.exports = router;


//definimos la ruta que vamos a utilizar para la autenticación de usuarios 
