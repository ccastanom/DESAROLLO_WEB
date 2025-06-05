const { DataTypes } = require("sequelize"); // Tipos de datos Sequelize
const sequelize = require("../config/database"); // Conexión a la base de datos
const User = require("./user.model");

// Definición del modelo "Project"
const Project = sequelize.define(
  "proyectos", // ✅ Nombre del modelo (singular y PascalCase, requerido por Sequelize)
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    administrador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios", // nombre real de la tabla referenciada
        key: "id"
      }
    }
  },
  {
    timestamps: false,
    tableName: "proyectos", // nombre real de la tabla en la base de datos
    hooks: {
      afterCreate: (proyect) => {
        if (proyect.fecha_creacion) {
          proyect.fecha_creacion.setHours(proyect.fecha_creacion.getHours() - 5);
        }
      }
    }
  }
);

module.exports = Project;
