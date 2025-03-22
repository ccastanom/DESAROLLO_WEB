const { emit } = require("process"); 
const User = require("../models/user.model"); /* Importar el modelo de usuario */
const { where } = require("underscore"); 
const { NONAME } = require("dns"); 
const bcrypt = require("bcryptjs"); /* Importar bcrypt para encriptar contraseñas. */

//Crea un nuevo usuario en la base de datos.
exports.createUser = async (
  nombre,
  email,
  password,
  rol_id,
  administrador_id
) => {
  try {
    // Verificar si el usuario ya existe en la base de datos
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw new Error("El usuario ya existe");
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol_id,
      administrador_id,
    });
   
    return newUser; /* Retorna el usuario creado */ 
  } catch (err) {
    throw new Error(`Error al crear el usuario: ${err.message}`);
  }
};


/* Función para obtener todos los usuarios filtrados por administrador_id y, opcionalmente, por email. */
exports.getAllUserByAdministradorId = async (administrador_id, email) => {
  try {
    const whereClause = { administrador_id }; // Filtra por administrador_id.
    if (email) {
      whereClause.email = email;   // Si se proporciona email, filtra también por email
    }

    // Buscar los usuarios que cumplen con las condiciones
    const users = await User.findAll({
      where: whereClause,
      attributes: { exclude: ["password"] },  // Excluye la contraseña en la respuesta.
    });
    return users;
  } catch (err) {
    throw new Error(`Error al obtener los usuarios: ${err.message}`);
  }
};


// Es una función para obtener todos los usuarios filtrados por rol_id.
exports.getAllUserByRolId = async (rol_id) => {
  try {
    // Busca todos los usuarios con el rol especificado.
    const users = await User.findAll({
      where: { rol_id },
      attributes: { exclude: ["password"] },
    });
    return users;
  } catch (err) {
    throw new Error(`Error al obtener los usuarios: ${err.message}`);
  }
};

//Esta es una funcion para actualizar los datos de un usuario.
exports.updateUser = async (
  id,
  nombre,
  email,
  rol_id,
  administrador_id,
  admin_from_token
) => {
  try {
    // Vamos a buscar el usuario por su ID.
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuarios no encontrado");
    }

    // Verifica que el usuario pertenece al administrador que hace la solicitud.
    if (user.administrador_id !== admin_from_token) {
      throw new Error(
        "Acceso denegado, este usuario no esta bajo su administador"
      );
    }


    // VerificaMOS si el email está en uso por otro usuario.
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        throw new Error("El email ya esta en uso");
      }
    }

    // Actualizamos los datos del usuario.
    await user.update({
      nombre,
      email,
      rol_id,
      administrador_id,
    });
    return user;
  } catch (err) {
    throw new Error(`Error al actualizar el usuaruio: ${err.message}`);
  }
};

// Esta función nos ayuda a eliminar un usuario de la base de datos.
exports.deleteUser = async (id, admin_from_token) => {
  try {
     // Buscamos el usuario por su ID.
    const user = await User.findByPk(id);
  
    // Verificamos que el usuario pertenece al administrador que hace la solicitud.
    if (user.administrador_id !== admin_from_token) {
      throw new Error(
        "Accesoo denegado, este usuario no esta bajo su administracion"
      );
    }

    if (!user) {
      throw new Error("Usuario no econtrado");
    }

    await user.destroy();
    return { message: "Usuario eliminado con exito" };
  } catch (err) {
    throw new Error(`Error al eliminar el usuario: ${err.message}`);
  }
};