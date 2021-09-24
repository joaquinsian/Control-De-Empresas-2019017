'use strict'
const express = require('express')
const usuarioController = require('../controller/admin.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();

api.post('/addEmpresa', md_autenticacion.ensureAuth,usuarioController.addEmpresa);
api.get('/readEmpresa', usuarioController.readEmpresa);
api.get('/readEmpresaID/:idEmpresa', usuarioController.readEmpresaID);
api.put('/updateEmpresa/:idEmpresa', usuarioController.updateEmpresa);
api.delete('/deleteEmpresa/:idEmpresa', usuarioController.deleteEmpresa);

module.exports = api;