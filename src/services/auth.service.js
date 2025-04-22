const jwt = require("jsonwebtoken"); /* para contraseñas encriptadas, para generar y verificar tokens JWT*/
const bcrypt = require("bcryptjs"); /* Para encriptar y comparar contraseñas*/
const dotenv = require("dotenv"); /* Para manejar variables de entorno */
const User = require("../models/user.model"); 
const RolePermission = require("../models/rolePermission.model"); /*Estos modelos se conectan con sicualis, es importante tener el modelo de cada tabla*/

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET; /* obtener la clave secreta desde las variables de entorno*/

exports.loginUser = async (email, password) => { 
  try {
    //Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw Error("Usuario no encontrado");
    }

    //verficar si la constraseña es correcta

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }
    // consultar los permisos del rol, va a sacar desde su toll id y compara que permisos tiene ese otro
    const rolePermissions = await RolePermission.findAll({
      where: { rol_id: user.rol_id },
      attributes: ["permiso_id"],
    });

    const permisos = rolePermissions.map((rp) => rp.permiso_id);

    //GERERARUN TOKEN JWT (se va a generar un token)

    //Generar un token

    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol_id: user.rol_id,
        permisos,
      },
      SECRET_KEY,
      { expiresIn: "12h" } /*El token expirará en 12 horas */
    );

    return token;
  } catch (error) {
    throw new Error(error.message || "Error al iniciar sesión");
  }
};
