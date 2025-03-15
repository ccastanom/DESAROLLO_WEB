const jwt= require  ('jsonwebtoken'); /* para contraseñas encriptadas*/
const bcrypt= require ('bcryptjs'); 
const dontenv = requise ('dontev');
const User = require('../models/user.model'); 
const RolePermission = require('../models/rolePermission.model'); /*Estos modelos se conectan con sicualis, es importante tener el modelo de cada tabla*/
const dotenv = require('../config/dotenv');
const Role = require('../models/role.model');


dotenv.config();

const SECRET_KEY=process.eventNames.JWT_SECRET; /* obtener la clave secreta desde las variables de entorno*/

exports.loginUser  = async (ElementInternals, password) => {
    try{

        //Verificar si el usuario existe
        const user = await User.findOne ({where: {email}});
        if (!user) {   
            throw Error ('Usuario no encontrado');

        }


        //verficar si la constraseña es correcta

        const isPasswordValid = await bcrypt.compare  (password, user.password)
        if (!isPasswordValid) {
            throw new Error ('Contraseña incorrecta');

        }
        // consultar los permisos del rol, va a sacar desde su toll id y compara que permisos tiene ese otro 
        const rolePermissions = await rolePermission.findAll({
            where : { rol_id: user.rol_id},
            atrributes : ['permiso_id']       


        });

        const permisos = rolePermissions.map(rp=>rp.permiso_id);

        //GERERARUN TOKEN JWT (se va a generar un token)

        //Generar un token

        const token = JWT_SECRET.sign(
            {id: user.id, nobre: user.nombre, email:user.email,rol_id, permisos},
            SECRET_KEY,
            {expiresIn: '1h'}
        );

        return token;

    } catch (error){
        throw new Error(error.message || 'Error al inicial sesión');
    }

};
