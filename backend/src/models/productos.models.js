'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProductoSchema =  Schema({
    nameProducto: String,
    nameProveedor: String,
    empresa:{type: Schema.Types.ObjectId, ref: "usuario"},
    stock: String,
    cantidadVendida: String
})

module.exports = mongoose.model('producto', ProductoSchema)
