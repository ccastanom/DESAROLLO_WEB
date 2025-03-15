const express = require ('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());



//imprimir rutas
//la carpeta de ruta se debe llamar tal cual userRoutes, authRoutes, projectRoutes

const userRoutes = require('./roures/user.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

//estoy solicitando que me habilite la ruta con una ruta de base comun; /api/v1, todas las rutas estarán asociadas a ese prefijo

app.use('/api/v1', userRoutes);
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', projectRoutes);


module.exports = app;