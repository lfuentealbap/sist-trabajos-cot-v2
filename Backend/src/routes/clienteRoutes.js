const express = require('express');
const clienteController = require('../controller/clienteController');
const mid = require('../middleware/auth')
const router = express.Router();
router.get('/clientes', mid.autorizarJwt, clienteController.listarClientes);
router.post('/clientes', clienteController.crearCliente);
router.put('/clientes/:_id', clienteController.actualizarCliente);
router.delete('/clientes/:_id', clienteController.borrarCliente);
router.get('/clientes/buscar', clienteController.buscarClientePorRut);
router.get('/clientes/:_id', clienteController.buscarClientePorID);
module.exports=router;