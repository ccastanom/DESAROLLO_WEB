const { emit } = require("process");
const User = require("../models/user.model");
const { where } = require("underscore");
const { NONAME } = require("dns");
const bcrypt = rquire("bcrypt.js");

exports.createUser = async (nombre, email, isStrongPassword, rol_id, administrador_id) => {
    try {
        const userExists = await User.findOne({ where: { email}});
        if (userExists){
            throw new Error("El usuario ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });
        return newUser;
    } catch (err){
        throw new Error(error al crear el usuario: ${err.message});
    }
};


exports.getAllUserByAdministradorId = async (administrador_id, email,) =>{
    try {
        const whereClause = { administrador_id };
        if (enmail) {
            whereClause.email = email;
        }
        const users = await User.findAll({ where: whereClause, attributes:{ exlcude: ["password"]}});
        return users;
    } catch (err) {
        throw new Error(Error al obtener los usuarios: ${err.message});
    }
}

exports.getAllUserByRolId = async (rol_id) => {
    try {
        const users = await User.findAll({ where: { rol_id }, attributes: { exclude: ["passworrd"]}});
        return users;
    } catch (err) {
        throw new Error(Error al obtener los usuarios: ${err.message});
    }
}

exports.updateuser = async (identity, nombre, rol_id, administrador_id, admin_from_token) => {
    try {
        const user = await User.findByPK(id);
        if (user.administrador_id !== admin_from_token) {
            throw new Error("Acceso denegado, este usuario no esta bajo su administador");
        }

        if (!user) {
            throw new Error("Usuarios no encontrado");
        }

        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: {email}});
            if (userExists) {
                throw new Error("El email ya esta en uso");
            }
        }
        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });
        return user;
    } catch (err) {
        throw new Error(Error al actualziar el usuaruio: ${err.message});
    }
}

exports.deletUser = async (id, admin_from_token) => {
    try {
        const user = await User.findByPK(id);
        if(user.administrador_id !== admin_from_token) {
            throw new Error (Accesoo denegado, este usuario no esta bajo su administracion);
        }

        if(!user) {
            throw new Error(Usuario no econtado);
        }

        await user.destroy();
        return { message: Usuario elinimado con exito};
    } catch (err) {
        throw new Error (Error al eliminar el usarui: ${err.message});
    }
};