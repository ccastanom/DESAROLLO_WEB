const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");
const Project = require("./project.model");


// Define la tabla intermedia "usuarios_proyecto" para la relación muchos a muchos
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
    timestamps: false,  // desactiva los campos createdAt y updatedAt
    tableName: "usuarios_proyecto",  // nombre explícito de la tabla
  }
);

// Relación muchos a muchos: un usuario puede tener muchos proyectos
User.belongsToMany(Project, {
  through: UserProject,
  foreignKey: "usuario_id",
  as: "proyectos",
});

//un proyecto puede tener muchos usuarios
Project.belongsToMany(User, {
  through: UserProject,
  foreignKey: "proyecto_id",
  as: "usuarios",
});

module.exports = UserProject;