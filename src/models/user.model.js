const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require("./project.model");
const UserProject = require("./userProject.model");

// Definición del modelo "User" (Sequelize usa este como clase, no como tabla directamente)
const User = sequelize.define(
  "usuarios", // ✅ nombre del modelo (singular)
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
      allowNull: true,
      references: {
        model: "usuarios", // nombre real de la tabla referenciada
        key: "id",
        onDelete: "SET NULL" // buena práctica
      },
    },
  },
  {
    tableName: "usuarios", // ✅ nombre real de la tabla en la base de datos
    timestamps: false,
  }
);

// Relaciones muchos a muchos con proyectos
User.belongsToMany(Project, {
  through: UserProject,
  as: "proyectos", // alias para acceder desde el usuario
  foreignKey: "usuario_id",
});

Project.belongsToMany(User, {
  through: UserProject,
  foreignKey: "proyecto_id",
  as: "usuarios",
});

// Relación de administrador a sus proyectos (uno a muchos)
User.hasMany(Project, {
  foreignKey: "administrador_id",
  as: "proyectos_administrados",
});

Project.belongsTo(User, {
  foreignKey: "administrador_id",
});

module.exports = User;

