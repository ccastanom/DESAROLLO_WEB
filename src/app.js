//Este código configura un servidor con Express.js y habilita CORS para manejar solicitudes desde otros dominios

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()); // Permite recibir JSON en las solicitudes
app.use(cors());// Habilita CORS para permitir peticiones de otros dominios

//Importancion de rutas
//La carpeta de rutas se debe llamar tal cual: userRoutes, authRoutes, projectRoutes

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

//Estableciendo un prefijo común para las rutas: "/api/v1/"
//Se recomienda definir rutas más específicas para mayor claridad

//estoy solicitando que me habilite la ruta con una ruta de base comun; /api/v1, todas las rutas estarán asociadas a ese prefijo

app.use('/api/v1', userRoutes);
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', projectRoutes);

// **Corrección: Se agrega la definición del puerto con un mensaje para saber si el servidor está corriendo**
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/v1/`);
});

module.exports = app;