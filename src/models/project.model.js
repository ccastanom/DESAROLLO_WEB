const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Proyect = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
    }
}, {
    timestamps: false,
    tableName: 'proyectos',
    hooks:{
        afterCreate:(proyect, options) => {
            if (proyect.fecha_creacion){
                proyect.fecha_creacion.setHours(Project.fecha_creacióngetHous() -5);
                
            }
        }
    }
});

module.exports = Proyect;

