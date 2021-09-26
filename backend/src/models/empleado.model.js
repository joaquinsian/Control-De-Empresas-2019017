'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var EmpleadoSchema =  Schema({
    name: String,
    lastName: String,
    empresa: {type: Schema.Types.ObjectId, ref: "usuario"},
    Email: String,
    puesto: String,
    departamento: String,
    telefono: String,
    foto: String
})

module.exports = mongoose.model('empleado', EmpleadoSchema)
