'use strict'

const express = require('express')
const ProductoController = require('../controller/producto.controller')
const md_autenticacion = require('../middlewares/authenticated')

var api = express.Router();

api.post('/addProducto', md_autenticacion.ensureAuth, ProductoController.addProducto);


module.exports = api;