const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definición del modelo "RolePermission" para la relación entre roles y permisos
const RolePermission = sequelize.define(
  "roles_permisos", // Nombre de la tabla en la base de datos
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "roles", key: "id" }, // Relación con la tabla "roles"
    },
    permiso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "permisos", key: "id" }, // Relación con la tabla "permisos"
    },
  },
  {
    timestamps: false,
    tableName: "roles_permisos",
  }
);

module.exports = RolePermission;
