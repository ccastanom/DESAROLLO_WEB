//se enviara el email y la contraseña que fue lo que colocamos

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const {
  authenticateToken,
  checkRole,
} = require("../middlewares/auth.middleware");
const ROLES = require("../utils/constants");
const errorHandler = require("../middlewares/error.middleware");

//Ruta de usuarios

router.get(
  "/projects",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.getProjects
);

router.post(
  "/projects/create",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.createProject
);

router.get(
  "/projects/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.getProject
);

router.put(
  "/projects/update",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.updateProject
);

router.delete(
  "/projects/delete/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.deleteProject
);

//asignar un usuario a un proyecto
router.post(
  "/projects/associate",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.assignUserToProject
);

//desasignar un usuario de un proyecto
router.delete(
  "/projects/disassociate",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.unassignUserFromProject
);

//middleaware para  manejar errores
router.use(errorHandler);

module.exports = router;
