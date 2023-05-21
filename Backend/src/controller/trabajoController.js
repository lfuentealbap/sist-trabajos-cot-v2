var Trabajo = require("../model/trabajos");

const listarTrabajos = (req, res) => {
  Trabajo.find({}).populate("usuario")
    .exec()
    .then((trabajos) => {
      res.status(200).send({ trabajos });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al listar los trabajos" });
    });
};

const crearTrabajo = (req, res) => {
  let trabajo = new Trabajo();
  trabajo.titulo = req.body.titulo;
  trabajo.descripcion = req.body.descripcion;
  trabajo.ciudad = req.body.ciudad;
  trabajo.fecha_inicio = req.body.fecha_inicio;
  trabajo.fecha__termino = req.body.fecha__termino;
  trabajo.pago = req.body.pago;
  trabajo.estado = req.body.estado;
  trabajo.usuario = req.body.usuario;
  trabajo
    .save()
    .then((trabajoNuevo) => {
      res.status(200).send({ trabajoNuevo });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al guardar trabajo" });
    });
};

const actualizarTrabajo = (req, res) => {
  let id = req.params._id;
  let titulo = req.body.titulo;
  let descripcion = req.body.descripcion;
  let ciudad = req.body.ciudad;
  let fecha_inicio = req.body.telefono;
  let fecha__termino = req.body.fecha__termino;
  let pago = req.body.pago;
  let estado = req.body.estado;
  let usuario = req.body.usuario;
  Trabajo.findByIdAndUpdate(
    id,
    {
      titulo: titulo,
      descripcion: descripcion,
      ciudad: ciudad,
      fecha_inicio: fecha_inicio,
      fecha__termino: fecha__termino,
      pago: pago,
      estado: estado,
      usuario: usuario,
    },
    { new: true }
  )
    .then((trabajo) => {
      res.status(200).send({ trabajo });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al actualizar trabajo" });
    });
};

const borrarTrabajo = (req, res) => {
  let id = req.params._id;
  Trabajo.findByIdAndRemove(id)
    .then(() => {
      res.status(200).send({ message: "Trabajo eliminado!" });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al eliminar trabajo" });
    });
};

const buscarTrabajoPorID = (req, res) => {
  let id = req.params._id;
  Trabajo.findById(id).populate("usuario")
    .then((trabajo) => {
      res.status(200).send({ trabajo });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al buscar trabajo" });
    });
};

const buscarTrabajosPorUsuario = (req, res) => {
  let usuario = req.body.usuario;
  Trabajo.find({ usuario: usuario }).populate("usuario")
    .exec()
    .then((trabajo) => {
      res.status(200).send({ trabajo });
    })
    .catch((err) => {
      return res
        .status(404)
        .send({ message: "No se encontraron trabajos asociados con el usuario indicado" });
    });
};
module.exports = {
  listarTrabajos,
  crearTrabajo,
  actualizarTrabajo,
  borrarTrabajo,
  buscarTrabajoPorID,
  buscarTrabajosPorUsuario,
};
