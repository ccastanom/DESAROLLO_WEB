const jwt = require("jsonwebtoken");  // Importa el paquete jsonwebtoken para trabajar con tokens JWT
const dotenv = require("dotenv"); // Importa y configura dotenv para poder acceder a las variables de entorno
dotenv.config();


// Obtiene la clave secreta del archivo .env para verificar los tokens
const SECRET_KEY = process.env.JWT_SECRET;


// Middleware para autenticar el token enviado en el header "Authorization"
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

     // Si no se proporciona un token, responde con error 401 (no autorizado)
    if(!token) {
        return res.status(401).json({ message: "Acceso denegado, no se proporcino un token"});
    }

     // Verifica el token usando la clave secreta
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(403).json({ message: "Token no valido"});
        }
        req.user = user;
        next()
    });
};

// Middleware para verificar si el usuario tiene un rol permitido
const checkRole = (roles) => {
    return ( req, res, next) => {
        const { rol_id} = req.user;

        console.log('🛂 checkRole ejecutado - rol recibido:', rol_id); // 👈 agrega esto

        if (!roles.includes(rol_id)) {
            return res.status(403).json({ message: "Acceso denegado, no tienes permisos para realizar esta accion"});
        }
        next();
    };
    
};
module.exports = { authenticateToken, checkRole };