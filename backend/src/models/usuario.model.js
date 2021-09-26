'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UsuarioSchema  = Schema({
    name: String,
    user:{ type: String, unique:true},
    password: String,
    Email: String,
    telefono: String,
    rol: String
})

module.exports = mongoose.model('usuario', UsuarioSchema)