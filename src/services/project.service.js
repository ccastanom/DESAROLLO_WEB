const ROLES = require("../utils/constants");
const Project = require("../models/project.model");
const User = require("../models/user.model");
const UserProject = require("../models/userProject.model");

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
    console.log(error)
    throw error;
  }
};

exports.getProjects = async () => {
  try {
    const projects = await Project.findAll({
      include: {
        model: User,
        attributes: ["nombre"],
      },
    });
    return projects;
  } catch (error) {
    throw error;
  }
};

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

// actualiza un proyecto
exports.updateProject = async (id, data, admin_from_token) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error("Proyecto no encontrado");
    }

    if (project.administrador_id !== admin_from_token) {
      throw new Error("No tienes permisos para actualizar este proyecto");
    }

    const updatedProject = await project.update(data);
    return updatedProject;
  } catch (error) {
    throw error;
  }
};

// elimina un proyecto
exports.deleteProject = async (id, admin_from_token) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error("Proyecto no encontrado");
    }

    if (project.administrador_id !== admin_from_token) {
      throw new Error("No tienes permisos para eliminar este proyecto");
    }

    await project.destroy();
    return project;
  } catch (error) {
    throw error;
  }
};

// asigna un usuario a un proyecto
exports.assignUserToProject = async (proyecto_id, usuario_id) => {
  try {
    const project = await Project.findByPk(proyecto_id);
    if (!project) {
      throw new Error("Proyecto no encontrado");
    }

    const user = await User.findByPk(usuario_id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const userProject = await UserProject.findOne({
      where: { proyecto_id, usuario_id },
    });

    if (userProject) {
      throw new Error("Este usuario ya esta asignado a este proyecto");
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

// desasigna un usuario de un proyecto
exports.unassignUserFromProject = async (proyecto_id, usuario_id) => {
  try {
    const project = await Project.findByPk(proyecto_id);
    if (!project) {
      throw new Error("Proyecto no encontrado");
    }

    const user = await User.findByPk(usuario_id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const userProject = await UserProject.findOne({
      where: { proyecto_id, usuario_id },
    });

    if (!userProject) {
      throw new Error("Este usuario no esta asignado a este proyecto");
    }

    await userProject.destroy();
  } catch (error) {
    throw error;
  }
};