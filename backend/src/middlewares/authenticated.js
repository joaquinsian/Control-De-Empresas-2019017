'use strict'
var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'CDE'

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(500).send({mensaje: "La petición no tiene la cabecera de autorización"})
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(500).send({mensaje: "El token ha expirado"})
        }
    }catch(err){
        return res.status(500).send({mensaje: "El token no es válido"})
    }

    req.user = payload;
    next();
}
