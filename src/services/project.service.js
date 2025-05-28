const { Op } = require("sequelize"); // ← Necesario para filtros con LIKE
const ROLES = require("../utils/constants");
const Project = require("../models/project.model");
const User = require("../models/user.model");
const UserProject = require("../models/userProject.model");

// Crear un nuevo proyecto
exports.createProject = async (data) => {
  try {
    const { nombre, descripcion, administrador_id } = data;
    const newProject = await Project.create({
      nombre,
      descripcion,
      administrador_id,
    });
    return newProject;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Obtener proyectos: Todos si es ADMIN, solo asignados si es USER
exports.getProjects = async (user_id, rol_id, filters = {}) => {
  try {
    const { nombre, descripcion } = filters;

    if (rol_id === ROLES.ADMIN) {
      const whereClause = {};

      if (nombre) {
        whereClause.nombre = { [Op.iLike]: `%${nombre}%` };
      }

      if (descripcion) {
        whereClause.descripcion = { [Op.iLike]: `%${descripcion}%` };
      }

      return await Project.findAll({
        where: whereClause,
        include: {
          model: User,
          attributes: ["nombre"],
        },
      });
    } else {
      // Usuario normal: solo sus proyectos asignados (sin filtros)
      const user = await User.findByPk(user_id, {
        include: {
          model: Project,
          as: "proyectos", // relación definida en userProject.model.js
          include: {
            model: User,
            attributes: ["nombre"],
          },
        },
      });

      return user?.proyectos || [];
    }
  } catch (error) {
    throw error;
  }
};

// Obtener un solo proyecto por su ID
exports.getProject = async (id) => {
  try {
    const project = await Project.findByPk(id, {
      include: {
        model: User,
        attributes: ["nombre"],
      },
    });
    return project;
  } catch (error) {
    throw error;
  }
};

// Actualizar un proyecto
exports.updateProject = async (id, data, admin_from_token) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) throw new Error("Proyecto no encontrado");

    if (project.administrador_id !== admin_from_token) {
      throw new Error("No tienes permisos para actualizar este proyecto");
    }

    const updatedProject = await project.update(data);
    return updatedProject;
  } catch (error) {
    throw error;
  }
};

// Eliminar un proyecto
exports.deleteProject = async (id, admin_from_token) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) throw new Error("Proyecto no encontrado");

    if (project.administrador_id !== admin_from_token) {
      throw new Error("No tienes permisos para eliminar este proyecto");
    }

    await project.destroy();
    return project;
  } catch (error) {
    throw error;
  }
};

// Asignar un usuario a un proyecto
exports.assignUserToProject = async (proyecto_id, usuario_id) => {
  try {
    const project = await Project.findByPk(proyecto_id);
    if (!project) throw new Error("Proyecto no encontrado");

    const user = await User.findByPk(usuario_id);
    if (!user) throw new Error("Usuario no encontrado");

    const userProject = await UserProject.findOne({
      where: { proyecto_id, usuario_id },
    });

    if (userProject) {
      throw new Error("Este usuario ya está asignado a este proyecto");
    }

    const newUserProject = await UserProject.create({
      proyecto_id,
      usuario_id,
    });

    return newUserProject;
  } catch (error) {
    throw error;
  }
};

// Desasignar un usuario de un proyecto
exports.unassignUserFromProject = async (proyecto_id, usuario_id) => {
  try {
    const project = await Project.findByPk(proyecto_id);
    if (!project) throw new Error("Proyecto no encontrado");

    const user = await User.findByPk(usuario_id);
    if (!user) throw new Error("Usuario no encontrado");

    const userProject = await UserProject.findOne({
      where: { proyecto_id, usuario_id },
    });

    if (!userProject) {
      throw new Error("Este usuario no está asignado a este proyecto");
    }

    await userProject.destroy();
  } catch (error) {
    throw error;
  }
};

