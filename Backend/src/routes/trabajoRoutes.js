const express = require('express');
const trabajoController = require('../controller/trabajoController');
const mid = require('../middleware/auth')
const router = express.Router();
router.get('/trabajos', mid.autorizarJwt, trabajoController.listarTrabajos);
router.post('/trabajos', trabajoController.crearTrabajo);
router.put('/trabajos/:_id', trabajoController.actualizarTrabajo);
router.delete('/trabajos/:_id', trabajoController.borrarTrabajo);
router.get('/trabajos/buscar', trabajoController.buscarTrabajosPorUsuario);
router.get('/trabajos/:_id', trabajoController.buscarTrabajoPorID);
module.exports=router;