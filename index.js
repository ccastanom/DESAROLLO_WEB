const sequelize = require('./src/config/database');

// 1. Carga todos los modelos
const User = require('./src/models/user.model');
const Project = require('./src/models/project.model');
const UserProject = require('./src/models/userProject.model');

// 2. Luego las asociaciones (cuando los modelos ya están cargados)
require('./src/models/associations');

// 3. Finalmente, sincroniza
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos sincronizada (tablas actualizadas)');
  })
  .catch((error) => {
    console.error('❌ Error al sincronizar la base de datos:', error);
  });

