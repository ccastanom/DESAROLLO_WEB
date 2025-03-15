const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');


//Relaciones muchos a muchos

User.belongsToMany(Project, { through: UserProject, foreignkey: 'usuario_id', as: 'proyectos'});
Project.belongsToMany(User, { through: UserProject, foreignkey: 'proyecto_id', as: 'usuarios'});

//Relación de administrador 

Project.balongsTo(User, {foreignkey: 'administrador_id', as: 'administrador'});

module.exports = { User, Project, UserProject }; 