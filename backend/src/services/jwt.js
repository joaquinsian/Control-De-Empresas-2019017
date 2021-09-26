'use strict'
var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'CDE'

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        user: user.usuario,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().date(40, 'days').unix()
    }

    return jwt.encode(payload, secret)
} 