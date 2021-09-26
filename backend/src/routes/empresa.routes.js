'use strict'

const express = require('express')
const usuarioController = require('../controller/empresa.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();

api.post('/addEmpleado', md_autenticacion.ensureAuth, usuarioController.addEmpleado);
api.get('/readEmpleadoEveryone', usuarioController.readEmpleadoEveryone);
api.get('/readEmpleadoID/:idEmpleado', md_autenticacion.ensureAuth,usuarioController.readEmpleadoID);
api.get('/readEmpleadoName/:name', md_autenticacion.ensureAuth,usuarioController.readEmpleadoName);
api.put('/updateEmpleado/:idEmpleado',md_autenticacion.ensureAuth, usuarioController.updateEmpleado);
api.delete('/deleteEmpleado/:idEmpleado', md_autenticacion.ensureAuth, usuarioController.deleteEmpleado);

module.exports = api;
 