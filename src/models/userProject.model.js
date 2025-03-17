const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


// Definición del modelo "UserProject" que representa la tabla intermedia "usuarios_proyectos"
const UserProject = sequelize.define(
  "usuarios_proyectos", // Nombre del modelo
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "usuarios", key: "id" },  // Define la clave foránea que referencia a "usuarios"
      foreignKey: "usuario_id", // Nombre de la clave foránea en la tabla
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "proyectos", key: "id" }, // Define la clave foránea que referencia a "proyectos"
      foreignKey: "proyecto_id", // Nombre de la clave foránea en la tabla
    },
  },
  {
    timestamps: false,
    tableName: "usuarios_proyectos",
  }
);

module.exports = UserProject;