"use strict";

const Usuario = require("../models/empleado.model");

//crear empleado
//en el empleado al registrarse esta listo y registra al usuario con la empresa

async function addEmpleado(req, res) {
  var modelousuario = Usuario();
  var params = req.body;

  if (
    params.name &&
    params.lastName &&
    params.celular &&
    params.Email &&
    params.foto &&
    params.puesto &&
    params.departamento
  ) {
    modelousuario.name = params.name;
    modelousuario.empresa = req.user.sub;
    modelousuario.lastName = params.lastName;
    modelousuario.celular = params.celular;
    modelousuario.Email = params.Email;
    modelousuario.foto = params.foto;
    modelousuario.puesto = params.puesto;
    modelousuario.departamento = params.departamento;
    modelousuario.rol = "Empleado";

    modelousuario.save((err, save) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al guardar la informacion" });
      }
      if (save) {
        return res.status(200).send({ save });
      } else {
        return res
          .status(500)
          .send({ mensaje: "no has ingresado los datos suficientes" });
      }
    });
  }
}

//mostrar empleado

async function readEmpleadoEveryone(req, res) {
  await Usuario.find((err, empleadoEncontrado) => {
    if (err) {
      return res.status(500).send({ mensaje: "Error en la petición" });
    } else if (!empleadoEncontrado) {
      return res
        .status(500)
        .send({ mensaje: "No se han podido obtener el empleado" });
    } else {
      return res.status(200).send({ empleadoEncontrado });
    }
  });
}

//mostrar empleado ID, solo si la empresa lo haya registrado
/*
async function readEmpleadoID(req, res){
    var idEmpleado = req.params.idEmpleado;
    var params = req.body;
    
    await Usuario.findById(idEmpleado, (err, empleadoEncontrado) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!empleadoEncontrado) {
            return res.status(500).send({ mensaje: "No se ha podido obtener el empleado" })
        } else {
            if (req.user.sub  === params){

                return res.status(200).send({ empleadoEncontrado })
            }else{

            }return res.status(500).send({ mensaje: "el empleado no se encuentra registrado" })
            
        }
    })
}


async function readEmpleadoID(req, res){
    var idEmpleado = req.params.idEmpleado;

    if (req.user.rol === "Empresa"){
        await Usuario.findById(idEmpleado,(err, empleadoEncontrado)=>{
        if (err){
            if(empleadoEncontrado.empresa === req.user.sub){
                return res.status(200).send({empleadoEncontrado})
                //console.log(empleadoEncontrado)//se encuentra el empleado
                //console.log(empleadoEncontrado.empresa)//undefined == no existe
            }else{
                return res.status(500).send({mensaje: "no existe eeste empleado"})
            }
        }

        })
    }else{
        return res.status(500).send({mensaje:"No posees los permisos necesarios"})
    }
}*/

//buscar y mostrar empleado ID, solo si la empresa lo haya registrado |funciona|

async function readEmpleadoID(req, res) {
  var idEmpleado = req.params.idEmpleado;

  if (req.user.rol === "Empresa") {
    await Usuario.findById(idEmpleado, (err, empleadoEncontrado) => {
      if (err) {
      }
      if (empleadoEncontrado.empresa.toString() === req.user.sub) {
        return res.status(200).send({ empleadoEncontrado });
      } else {
        return res.status(500).send({ mensaje: "no existe este empleado" });
      }
    });
  } else {
    return res
      .status(500)
      .send({ mensaje: "no posees los permisos necesarios" });
  }
}

//buscar y mostrar empleado por nombre

async function readEmpleadoName(req, res) {
  var name = req.params.name;

  if (req.user.rol === "Empresa") {
    await Usuario.findOne(name, (err, empleadoEncontrado) => {
      if (err) {
      }
      if (empleadoEncontrado.empresa.toString() === req.user.sub) {
        return res.status(200).send({ empleadoEncontrado });
      } else {
        return res.status(500).send({ mensaje: "no existe este empleado" });
      }
    });
  } else {
    return res
      .status(500)
      .send({ mensaje: "no posees los permisos necesarios" });
  }
}
//buscar y mostrar empleado por puesto

async function readEmpleadoPuesto(req, res) {}

//buscar y mostrar empleado por departamento

async function readEmpleadoDepartamento(req, res) {}

//editar empleado

async function updateEmpleado(req, res) {
  var idEmpleado = req.params.idEmpleado;
  var params = req.body;

  await Usuario.findByIdAndUpdate(
    idEmpleado,
    params,
    { new: true },
    (err, empleadoActualizado) => {
      if (err) {
        return res.status(500).send({ mensaje: "Error en la petición" });
      } else if (!empleadoActualizado) {
        return res
          .status(500)
          .send({ mensaje: "No se ha podido editar el empleado" });
      } else {
        return res.status(200).send({ empleadoActualizado });
      }
    }
  );
}

//eliminar empleado

async function deleteEmpleado(req, res) {
  const idEmpleado = req.params.idEmpleado;

  await Usuario.findByIdAndDelete(idEmpleado, (err, empleadoEliminado) => {
    if (err)
      return res
        .status(500)
        .send({ mensaje: "Error en la petición de eliminar " });
    if (!empleadoEliminado)
      return res.status(500).send({ mensaje: "Error al eliminar el empleado" });

    return res.status(200).send({ empleadoEliminado });
  });
}

//generar archivo pdf

module.exports = {
  addEmpleado,
  readEmpleadoEveryone,
  readEmpleadoID,
  updateEmpleado,
  deleteEmpleado,
  readEmpleadoName,
};
