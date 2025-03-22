const app = require("./app"); // Importa la aplicación Express desde el archivo "app.js"
const port = process.env.PORT || 3000;  // Define el puerto, utilizando el valor de la variable de entorno PORT o, en su defecto, el puerto 3000


// Inicia el servidor y lo pone a escuchar en el puerto definido
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Muestra un mensaje en la consola indicando que el servidor está corriendo
});