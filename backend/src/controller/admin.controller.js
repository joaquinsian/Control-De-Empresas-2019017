'use strict'

const Usuario = require('../models/usuario.model')
const bcrypt = require('bcrypt-nodejs')


//crear admin por default

async function adminDefault(user, password){
    var usuarioModel = new Usuario();
        if(user && password ){

            usuarioModel.user = user;
            usuarioModel.password = password;
            usuarioModel.rol = "Admin";
            //usuarioModel.rol = rol;

            await Usuario.find({$or:[
                {user: usuarioModel.user}
             ]}).exec((err, adminEncontrado)=>{ 
                 if(err){
                    console.log("Error en la petición");
                 }else if(adminEncontrado && adminEncontrado.length >=1){
                     console.log("el administrador ya ha sido creado");
                 }else{
                    bcrypt.hash(usuarioModel.password, null, null, (err, passEncrypt) => {
                        usuarioModel.password = passEncrypt;
                        usuarioModel.save((err, adminGuardado) => {
                            if(err){
                                console.log("Error en la petición al guardar el administrador");
                            }else if(!adminGuardado){
                                console.log("No se pudo almacenar el administrador");
                            }else{
                                console.log("administrador creado", adminGuardado);
                            }
                        })
                    }) 
                 }
             })
    }else{return resizeBy.status(500).send({mensaje:"no ha ingresado todos los parametros"})    }
    
}

//crud para el admin hacia empresas

//agregar empresa

async function addEmpresa(req, res){
    var usuarioModel = new Usuario();
    var params = req.body;
    if(params.name && params.Email && params.user && params.password){
        usuarioModel.name =  params.name;
        usuarioModel.Email = params.Email;
        usuarioModel.user = params.user;
        usuarioModel.telefono = params.telefono;
        usuarioModel.password = params.password;
        usuarioModel.rol = "Empresa";

        await Usuario.find({
            $or:[
                {user: usuarioModel.user}
            ]
        }).exec((err, usuarioEncontrado)=>{
            if (err) {
                return res.status(500).send({ mensaje: "Error en la petición" })
            } else if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: "El usuario ya ha sido creado" })
            } else {
                bcrypt.hash(params.password, null, null, (err, passEncrypt) => {
                    usuarioModel.password = passEncrypt;
                    usuarioModel.save((err, usuarioGuardado) => {
                        if (err) {
                            return res.status(500).send({ mensaje: "Error en la petición al momento de hacer el registro" })
                        } else if (!usuarioGuardado) {
                            return res.status(500).send({ mensaje: "No se ha podido guardar el usuario" })
                        } else {
                            return res.status(200).send({ usuarioGuardado })
                        }
                    })
                })
            }
        })
    }
}

//mostrar empresas
async function readEmpresa(req, res){
    Usuario.find((err, usuarioEncontrado)=>{
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!usuarioEncontrado){
            return res.status(500).send({ mensaje: "No se han podido obtener la información"})
        }else {
            return res.status(200).send({mensaje:"Empresas Encontradas", usuarioEncontrado})
        }
    })
}

//mostrar empresa por ID
async function readEmpresaID(req, res){
    var idEmpresa = req.params.idEmpresa;

    await Usuario.findById(idEmpresa,(err, empresaEncontrada)=>{
        if (err){
            return res.status(500).send({ mensaje: "Error en la petición" })
        } else if (!empresaEncontrada) {
            return res.status(500).send({ mensaje: "No se ha podido obtener la cita" })
        } else {
            return res.status(200).send({ mensaje:"Empresa Encontrada", empresaEncontrada })
        }
    })
}

//editar empresa 
async function updateEmpresa(req,res){
    var idEmpresa = req.params.idEmpresa;
    var params = req.body;

    Usuario.findByIdAndUpdate(idEmpresa, params, {new: true}, (err, empresaActualizada)=>{
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!empresaActualizada){
            return res.status(500).send({ mensaje: "No se ha podido editar la empresa"})
        }else{
            return res.status(200).send({empresaActualizada})
        }
    })
}

//eliminar empresa
async function deleteEmpresa(req, res){
    const idEmpresa =req.params.idEmpresa;


    await Usuario.findByIdAndDelete(idEmpresa, (err, empresaEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la petición de eliminar '});
        if(!empresaEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la empresa' });

        return res.status(200).send({ empresaEliminada });
    })
}



module.exports = {
    adminDefault,
    addEmpresa,
    readEmpresa,
    readEmpresaID,
    updateEmpresa,
    deleteEmpresa
}