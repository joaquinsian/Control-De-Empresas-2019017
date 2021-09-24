'use strict'

const Usuario = require('../models/usuario.model')



//crear empleado

async function addEmpleado(req, res){
    var modelousuario = new Usuario();
    var params = req.body;

    if(params.name && params.lastName && params.celular && params.Email && params.foto && params.puesto && params.departamento){
        modelousuario.name = params.name;
        modelousuario.lastName = params.lastName;
        modelousuario.celular = params.celular;
        modelousuario.Email = params.Email;
        modelousuario.foto = params.foto;
        modelousuario.puesto = params.puesto;
        modelousuario.departamento = params.departamento;
        modelousuario.rol = "Empleado";


        modelousuario.save((err, save)=>{
            if(err){
                return res.status(500).send({mensaje: 'Error al guardar la informacion'})
            }else{
                if (save){
                    return res.status(200).send({save})
                }
            }
        })
    }
}

//funcion para mostrar




//mostrar empleado

async function readEmpleado(req, res){
    
    await Usuario.find((err, empleadoEncontrado) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!empleadoEncontrado) {
            return res.status(500).send({ mensaje: "No se han podido obtener el empleado" })
        } else {
            return res.status(200).send({ empleadoEncontrado })
        }
    }) 
}

//mostrar empleado ID

async function readEmpleadoID(req, res){
    var idEmpleado = req.params.idEmpleado;

    await Usuario.findById(idEmpleado, (err, empleadoEncontrado) => {
        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!empleadoEncontrado) {
            return res.status(500).send({ mensaje: "No se ha podido obtener el empleado" })
        } else {
            return res.status(200).send({ empleadoEncontrado })
        }
    })
}

//editar empleado

async function updateEmpleado(req, res){
    var idEmpleado = req.params.idEmpleado;
    var params = req.body;

    await Usuario.findByIdAndUpdate(idEmpleado, params, { new: true }, (err, empleadoActualizado)=>{

        if (err) {
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!empleadoActualizado) {
            return res.status(500).send({ mensaje: "No se ha podido editar el empleado" })
        } else {
            return res.status(200).send({ empleadoActualizado })
        }
    })
}

//eliminar empleado

async function deleteEmpleado(req, res){
    const idEmpleado =req.params.idEmpleado;

    await Usuario.findByIdAndDelete(idEmpleado, (err, empleadoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la petición de eliminar '});
        if(!empleadoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el empleado' });

        return res.status(200).send({ empleadoEliminado });
    })
}

module.exports = {
    addEmpleado,
    readEmpleado,
    readEmpleadoID,
    updateEmpleado,
    deleteEmpleado
}
