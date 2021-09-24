'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UsuarioSchema  = Schema({
    name: String,
    lastName: String,
    user:{ type: String, unique:true},
    password: String,
    Email: String,
    rol: String,
    puesto: String,
    departamento: String,
    celular: String,
    foto: String
})

module.exports = mongoose.model('usuario', UsuarioSchema)