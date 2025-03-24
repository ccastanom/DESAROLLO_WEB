const { message } = require("statuses"); // Manejo de mensajes de estado HTTP
const userService = require("../services/user.service"); // Importa el servicio de usuarios
const projectService = require("../services/project.service");
const { measureMemory } = require("vm");

exports.getProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects();
    res
      .status(200)
      .json({ message: "Proyectos consultados con exito", projects });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proyectos", error });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { nombre, descripcion, administrador_id } = req.body;
    const newProject = await projectService.createProject({
      nombre,
      descripcion,
      administrador_id,
    });
    res.status(201).json({ message: "Proyecto creado con exito", newProject });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proyecto", error });
  }
};

// Obtiene un proyecto por su id
exports.getProject = async (req, res) => {
  try {
    const project = await projectService.getProject(req.params.id);
    res.status(200).json({ message: "Proyecto consultado con exito", project });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el proyecto", error });
  }
};

// Actualiza un proyecto
exports.updateProject = async (req, res) => {
  try {
    const admin_from_token = req.user.id;
    const { nombre, descripcion, administrador_id, id } = req.body;
    const project = await projectService.updateProject(
      id,
      {
        nombre,
        descripcion,
        administrador_id,
      },
      admin_from_token
    );
    res
      .status(200)
      .json({ message: "Proyecto actualizado con exito", project });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el proyecto", error });
  }
};

// Elimina un proyecto
exports.deleteProject = async (req, res) => {
  try {
    const admin_from_token = req.user.id;
    const project = await projectService.deleteProject(
      req.params.id,
      admin_from_token
    );
    res.status(200).json({ message: "Proyecto eliminado con exito", project });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el proyecto", error });
  }
};

// Asigna un usuario a un proyecto
exports.assignUserToProject = async (req, res) => {
  try {
    const { proyecto_id, usuario_id } = req.body;
    const result = await projectService.assignUserToProject(
      proyecto_id,
      usuario_id
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Desasigna un usuario de un proyecto
exports.unassignUserFromProject = async (req, res) => {
  try {
    const { proyecto_id, usuario_id } = req.body;
    const result = await projectService.unassignUserFromProject(
      proyecto_id,
      usuario_id
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};