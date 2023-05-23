var Usuario = require("../model/usuarios");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const listarUsuarios = (req, res) => {
  Usuario.find({})
    .exec()
    .then((usuarios) => {
      res.status(200).send(usuarios);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al listar los usuarios" });
    });
};

const crearUsuario = async (req, res) => {
  usuario = new Usuario();
  const passNH = req.body.password;//Contraseña no encriptada
  const salt = Number(process.env.SALT);//Sal para encriptar
  const passH = await bcrypt.hash(passNH, salt);//Contraseña encriptada
  usuario.nombres = req.body.nombres
  usuario.apellidos = req.body.apellidos;
  usuario.rut = req.body.rut;
  usuario.rol = req.body.rol;
  usuario.email = req.body.email;
  usuario.telefono = req.body.telefono;
  usuario.password = passH;//Asignacion contraseña encriptada 
  usuario.ciudad = req.body.ciudad;
  usuario
    .save()
    .then((usuarioNuevo) => {
      res.status(200).send(usuarioNuevo);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al guardar usuario" });
    });
};

const actualizarUsuario = async (req, res) => {
  let id = req.params._id;
  const passNH = req.body.password;//Contraseña no encriptada
  const salt = Number(process.env.SALT);//Sal para encriptar
  const passH = await bcrypt.hash(passNH, salt);//Contraseña encriptada con sal
  let nombres = req.body.nombre_completo;
  let apellidos = req.body.apellidos;
  let rut = req.body.rut;
  let rol = req.body.rol;
  let email = req.body.email;
  let telefono = req.body.telefono;
  let password = passH;
  let ciudad = req.body.ciudad;
  Usuario.findByIdAndUpdate(
    id,
    {
      nombres: nombres,
      apellidos: apellidos,
      rut: rut,
      rol: rol,
      email: email,
      telefono: telefono,
      password: password,
      ciudad: ciudad,
    },
    { new: true }
  )
    .then((usuario) => {
      res.status(200).send(usuario);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al actualizar cliente" });
    });
};

const borrarUsuario = (req, res) => {
  let id = req.params._id;
  Usuario.findByIdAndRemove(id)
    .then(() => {
      res.status(200).send({ message: "Usuario eliminado exitosamente" });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al eliminar usuario" });
    });
};

const buscarUsuarioPorID = (req, res) => {
  let id = req.params._id;
  Usuario.findById(id)
    .then((usuario) => {
      res.status(200).send(usuario);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al buscar usuario" });
    });
};

const buscarUsuarioPorRut = (req, res) => {
  let rut = req.body.rut;
  Usuario.find({ rut: rut })
    .exec()
    .then((usuario) => {
      res.status(200).send(usuario);
    })
    .catch((err) => {
      return res
        .status(404)
        .send({ message: "No se encontro el usuario con el rut asociado" });
    });
};

const loguearse = async (req, res, next) => {
  const { rut, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ rut });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario inválido' });
    }
    const passwordMatches = await bcrypt.compare(password, usuario.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Contraseña inválida' });
    }
    const secreto = process.env.SECRET;
    const token = jwt.sign({ userId: usuario._id }, secreto, { expiresIn: '7d' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  buscarUsuarioPorID,
  buscarUsuarioPorRut,
  loguearse
};
