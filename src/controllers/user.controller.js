const { message } = require("statuses");
const userService = require("../services/user.service");
const { measureMemory } = require("vm");

exports.createUser = async (req, res) =>{
    try{
        const { nombre, email, password, rol_id, administrador_id} = req.body
        const newUser = await userService.createUser(nombre,email,password, rol_id, administrador_id);
        res.status(201).json({message: "Usuario creado con exito", user: newUser});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.updateuser = async (req, res) => {
    const { id } = req.params;
};

exports.getAllUserByAdministradorId = async ( req, res) => {
    try {
        const admin_from_token = req.user.id;
        const {email} = req.query;
        const user = await userService.getAllUserByAdministradorId(admin_from_token, email);
        res.status(200).json({message: "Usuarios consultados con exito", user});
    } catch (error){
        res.status(500).json({ message: "Error al obtener los usuarios", error});
    }
};

exports.getAllUserByRolId = async (req, res) => {
    try {
        const users = await userService.getAllUserByRolId(req.params.id);
        res.status(200).json({meassage: "Usuarios consultados con exito", users});
    } catch (error) {
        res.status(500).json({ meassage: "error al obtener los usuarios", error});
    }
};

exports.updateUser = async ( req, res) => {
    const { id } = req.params;
    const { nombre, email, rol_id, administrador_id} = req.body;
    const admin_from_token = req.user.id;
    try {
        const user = await userService.updateuser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({message: "usuario actualizado con exito", user});
    } catch (err) {
        res.status(500).json({ meassage: ErrorEvent.meassage});
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const admin_from_token = req.user.id;
    try {
        const result = await userService.deletUser(id, admin_from_token);
        res.status(200).json(result);
    } catch (err){
        res.status(500).json({message: err.message});
    }
}