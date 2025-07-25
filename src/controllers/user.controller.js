const { message } = require("statuses"); // Manejo de mensajes de estado HTTP
const userService = require("../services/user.service"); // Importa el servicio de usuarios
const { measureMemory } = require("vm"); // Importación no utilizada, pero dejada como está

// Crea un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { nombre, email, password, rol_id, administrador_id } = req.body;

    // Llama al servicio para crear el usuario
    const newUser = await userService.createUser(
      nombre,
      email,
      password,
      rol_id,
      administrador_id
    );

    // Responde con un estado 201 (creado) y devuelve el usuario creado
    res
      .status(201)
      .json({ message: "Usuario creado con exito", user: newUser });
  } catch (err) {
    // Manejo de errores en caso de falla en la creación del usuario
    res.status(500).json({ message: err.message });
  }
};

// Función sin implementación (posible error o código incompleto)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol_id, administrador_id } = req.body;
  const admin_from_token = req.user.id;
  try {
    const user = await userService.updateUser(
      id,
      nombre,
      email,
      rol_id,
      administrador_id,
      admin_from_token
    );
    res.status(200).json({ message: "usuario actualizado con exito", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtiene todos los usuarios asociados a un administrador específico
exports.getAllUserByAdministradorId = async (req, res) => {
  try {
    const admin_from_token = req.user.id; // Obtiene el ID del administrador autenticado desde el token
    const { email } = req.query; // Permite filtrar los usuarios por email si se proporciona

    // Llama al servicio para obtener los usuarios relacionados con el administrador
    const user = await userService.getAllUserByAdministradorId(
      admin_from_token,
      email
    );

    // Responde con un estado 200 (éxito) y devuelve la lista de usuarios
    res.status(200).json({ message: "Usuarios consultados con exito", user });
  } catch (error) {
    // Manejo de errores en caso de falla al obtener los usuarios
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

// Obtiene todos los usuarios que tienen un rol específico
exports.getAllUserByRolId = async (req, res) => {
  try {
    // Llama al servicio para obtener los usuarios según el rol proporcionado en los parámetros
    const users = await userService.getAllUserByRolId(req.params.id);

    // Responde con un estado 200 (éxito) y devuelve la lista de usuarios
    res.status(200).json({ message: "Usuarios consultados con exito", users });
  } catch (error) {
    // Manejo de errores en caso de falla al obtener los usuarios
    res.status(500).json({ message: "error al obtener los usuarios", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ message: "Usuario consultado con exito", user });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// Elimina un usuario según su ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del usuario a eliminar
  const admin_from_token = req.user.id; // Obtiene el ID del administrador autenticado

  try {
    // Llama al servicio para eliminar el usuario
    const result = await userService.deleteUser(id, admin_from_token);

    // Responde con un estado 200 (éxito) y confirma la eliminación
    res.status(200).json(result);
  } catch (err) {
    // Manejo de errores en caso de falla en la eliminación del usuario
    res.status(500).json({ message: err.message });
  }
};
