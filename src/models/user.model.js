const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definición del modelo "User" que representa la tabla "usuarios" en la base de datos
const User = sequelize.define(
  "usuarios", // Nombre de la tabla en la base de datos
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "roles", key: "id" },
    },
    administrador_id: {
      type: DataTypes.INTEGER,
      allowNull: true, //allowNull: true, Puede ser nulo, ya que no todos los usuarios tienen un administrador
      references: { model: "usuarios", key: "id", onDelete: "SET NULL" }, //onDelete: "SET NULL", si el administrador es eliminado, este campo se establece en NULL
    },
  },
  {
    timestamps: false, // Desactiva los campos automáticos "createdAt" y "updatedAt"
    tableName: "usuarios", // Especifica el nombre de la tabla en la base de datos
  }
);

module.exports = User;
