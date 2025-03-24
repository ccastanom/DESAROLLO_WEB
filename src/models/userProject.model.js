const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");
const Project = require("./project.model");

const UserProject = sequelize.define(
  "usuarios_proyecto",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
      foreignKey: "usuario_id",
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "proyectos", key: "id" },
      foreignKey: "proyecto_id",
    },
  },
  {
    timestamps: false,
    tableName: "usuarios_proyecto",
  }
);

User.belongsToMany(Project, {
  through: UserProject,
  foreignKey: "usuario_id",
  as: "proyectos",
});

Project.belongsToMany(User, {
  through: UserProject,
  foreignKey: "proyecto_id",
  as: "usuarios",
});

module.exports = UserProject;