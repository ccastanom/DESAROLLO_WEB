//se enviara el email y la contraseña que fue lo que colocamos

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const {
  authenticateToken,
  checkRole,
} = require("../middlewares/auth.middleware");
const ROLES = require("../utils/constants");
const errorHandler = require("../middlewares/error.middleware");

//Ruta de usuarios

router.post(
  "/users/create",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.createUser
);

router.put(
  "/users/update/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.updateUser
);

router.get(
  "/users/roles/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.getAllUserByRolId
);
router.delete(
  "/users/delete/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.deleteUser
);
router.get(
  "/users/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.getUserById
);

//middleaware para  manejar errores
router.use(errorHandler);

module.exports = router;