const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// middleware de autenticación de token JWT
const autenticarJwt = (req, res, next) => {
  // Obtener el token de la cabecera de autorización
  const authCabeza = req.headers.authorization;
  if (authCabeza) {
    // El token está en la forma "Bearer <token>". Separar el token del prefijo "Bearer "
    const token = authCabeza.split(' ')[1];
    // Verificar y validar el token JWT
    jwt.verify(token, process.env.SECRET , (err, usuario) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' });
      }
      req.usuario = usuario;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token no proporcionado' });
  }
};

// middleware de autorización de token JWT
const autorizarJwt = expressJwt.expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"]  });

module.exports = { autenticarJwt, autorizarJwt };