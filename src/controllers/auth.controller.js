const authService = require("../services/auth.service"); // Importa el servicio de autenticación

//Iniciar sesion
exports.login = async (req, res) => {
  const { email, password } = req.body; // Extrae credenciales del cuerpo de la solicitud
  try {
    const token = await authService.loginUser(email, password); // Autentica y genera un token
    res.status(200).json({ message: "inicio de sesion exitoso", token });
  } catch (err) {
    res.status(400).json({ message: err.message }); // Manejo de error
  }
};