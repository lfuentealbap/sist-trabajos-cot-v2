var Cliente = require("../model/clientes");

const listarClientes = (req, res) => {
  Cliente.find({})
    .exec()
    .then((clientes) => {
      res.status(200).send({ clientes });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al listar los clientes" });
    });
};

const crearCliente = (req, res) => {
  let cliente = new Cliente();
  cliente.nombre_completo = req.body.nombre_completo;
  cliente.rut = req.body.rut;
  cliente.email = req.body.email;
  cliente.telefono = req.body.telefono;
  cliente.direccion = req.body.direccion;
  cliente.ciudad = req.body.ciudad;
  cliente
    .save()
    .then((clienteNuevo) => {
      res.status(200).send({ clienteNuevo });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al guardar cliente" });
    });
};

const actualizarCliente = (req, res) => {
  let id = req.params._id;
  let nombre_completo = req.body.nombre_completo;
  let rut = req.body.rut;
  let email = req.body.email;
  let telefono = req.body.telefono;
  let direccion = req.body.direccion;
  let ciudad = req.body.ciudad;
  Cliente.findByIdAndUpdate(
    id,
    {
      nombre_completo: nombre_completo,
      rut: rut,
      email: email,
      telefono: telefono,
      direccion: direccion,
      ciudad: ciudad,
    },
    { new: true }
  )
    .then((cliente) => {
      res.status(200).send({ cliente });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al actualizar cliente" });
    });
};

const borrarCliente = (req, res) => {
  let id = req.params._id;
  Cliente.findByIdAndRemove(id)
    .then(() => {
      res.status(200).send({ message: "Cliente eliminado!" });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al eliminar cliente" });
    });
};

const buscarClientePorID = (req, res) => {
  let id = req.params._id;
  Cliente.findById(id)
    .then((cliente) => {
      res.status(200).send({ cliente });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al buscar cliente" });
    });
};

const buscarClientePorRut = (req, res) => {
  let rut = req.body.rut;
  Cliente.find({ rut: rut })
    .exec()
    .then((cliente) => {
      res.status(200).send({ cliente });
    })
    .catch((err) => {
      return res
        .status(404)
        .send({ message: "No se encontro el cliente con el rut asociado" });
    });
};
module.exports = {
  listarClientes,
  crearCliente,
  actualizarCliente,
  borrarCliente,
  buscarClientePorID,
  buscarClientePorRut,
};
