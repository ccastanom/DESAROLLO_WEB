const User = require('./user.model'); // Importa el modelo de usuario
const Project = require('./project.model'); // Importa el modelo de proyecto
const UserProject = require('./userProject.model');  // Importa el modelo que representa la relación entre usuarios y proyectos



//Relaciones muchos a muchos: Un usuario puede estar en varios proyectos y un proyecto puede tener varios usuarios


User.belongsToMany(Project, { through: UserProject, foreignkey: 'usuario_id', as: 'proyectos'}); // Define la relación de muchos a muchos entre usuarios y proyectos
Project.belongsToMany(User, { through: UserProject, foreignkey: 'proyecto_id', as: 'usuarios'}); // Define la relación inversa entre proyectos y usuarios

//Relación de administrador:  Uno a muchos: Un proyecto pertenece a un solo administrador (usuario)

Project.balongsTo(User, {foreignkey: 'administrador_id', as: 'administrador'}); // Relaciona un proyecto con un único administrador


module.exports = { User, Project, UserProject };  // Exporta los modelos para su uso en otros módulos