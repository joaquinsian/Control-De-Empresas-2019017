'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const adminController = require('./src/controller/admin.controller')


mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin:12345@controldeempresa.hiq7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos");


    crearAdmin();

    app.listen(process.env.PORT || 3000, function() {
        console.log("Está funcionando en el puerto 3000");
    })
}).catch(err => console.log(err))


//admin por default
const crearAdmin = () => {
    adminController.adminDefault("admin","123456")
}