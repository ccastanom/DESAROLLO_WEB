const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model")
const Project = require("./project.model")


// Define la tabla intermedia "usuarios_proyecto" para la relación muchos a muchos
const UserProject = sequelize.define(
  "usuarios_proyecto",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "proyectos", key: "id" },
    },
  },
  {
    timestamps: false,
    tableName: "usuarios_proyecto",
  }
);

// Relación muchos a muchos: un usuario puede tener muchos proyectos
//User.belongsToMany(Project, {
//  through: UserProject,
//  foreignKey: "usuario_id",
//  as: "proyectos",
//});

// Un proyecto puede tener muchos usuarios
//Project.belongsToMany(User, {
//  through: UserProject,
//  foreignKey: "proyecto_id",
//  as: "usuarios",
//});

module.exports = UserProject;
