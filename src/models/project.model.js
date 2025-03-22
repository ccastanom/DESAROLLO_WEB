const { DataTypes } = require("sequelize"); // Importamos los tipos de datos de Sequelize
const sequelize = require("../config/database"); // Importamos la instancia de conexión a la base de datos

// Definición del modelo "Proyect" que representa la tabla "proyectos"
const Proyect = sequelize.define(
  "proyectos", // Nombre de la tabla en la base de datos
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, /* / Define el campo como un número entero, indica que es la clave primaria de la tabla  y el valor se incrementa automáticamente*/
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    administrador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "usuarios", key: "id" }, // Establece la relación con la tabla "usuarios"
    },
  },
  {
    timestamps: false, // Desactiva los timestamps automáticos (createdAt, updatedAt)
    tableName: "proyectos", // Me especifica el nombre de la tabla en la base de datos
    hooks: {
      afterCreate: (proyect, options) => { // Se ejecuta después de crear un proyecto
        if (proyect.fecha_creacion) {
          proyect.fecha_creacion.setHours(proyect.fecha_creación.getHous() - 5);
        }
      },
    },
  }
);

module.exports = Proyect; // Exporta el modelo para su uso en otras partes del código
