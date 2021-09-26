"use strict";

const Producto = require("../models/productos.models");

// agregar productos

async function addProducto(req, res) {
  var modeloproducto = Producto();
  var params = req.body;

  if (params.nameProducto && params.nameProveedor && params.stock) {
    modeloproducto.nameProducto = params.nameProducto;
    modeloproducto.nameProveedor = params.nameProveedor;
    modeloproducto.empresa = req.user.sub;
    modeloproducto.stock = params.stock;
    modeloproducto.cantidadVendida = params.cantidadVendida;
    modeloproducto.rol = "Producto";

    modeloproducto.save((err, save) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al guardar la informacion" });
      }
      if (save) {
        return res.status(200).send({ save });
      }
    });
  }
}

module.exports = {
  addProducto,
};
