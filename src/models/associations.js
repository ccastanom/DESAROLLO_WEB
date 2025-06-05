const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');

// Relación uno a muchos (admin)
Project.belongsTo(User, {
  foreignKey: "administrador_id",
  as: "administrador"
});

User.hasMany(Project, {
  foreignKey: "administrador_id",
  as: "proyectos_administrados"
});

// Relación muchos a muchos
Project.belongsToMany(User, {
  through: UserProject,
  as: "usuarios",
  foreignKey: "proyecto_id"
});

User.belongsToMany(Project, {
  through: UserProject,
  as: "proyectos",
  foreignKey: "usuario_id"
});

