const { DataTypes } = require("sequelize"); // Importa los tipos de datos de Sequelize
const sequelize = require("../config/database"); // Importa la instancia de conexión a la base de datos

// Definición del modelo "Role" que representa la tabla "roles"
const Role = sequelize.define(
  "roles",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //autoIncrement: true, genera automáticamente un nuevo ID para cada registro
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true }, // unique: true, me arantiza que los valores sean únicos en la tabla
  },
  {
    timestamps: false, // No agrega columnas de fecha por defecto
    tableName: "roles", // Nombre explícito de la tabla en la base de datos
  }
);

module.exports = Role;
