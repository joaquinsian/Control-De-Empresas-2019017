'use strict'

const express = require('express')
const app = express ()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


//Cabeceras
app.use(cors());

//importación de rutas
const User_routes = require('./src/routes/user.routes');
const Login_routes = require('./src/routes/login.routes');
const Empresa_routes = require('./src/routes/empresa.routes');
const Producto_routes = require('./src/routes/producto.routes')


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//utilización de las rutas
app.use('/CDE', User_routes)
app.use('/CDE', Login_routes)
app.use('/CDE', Empresa_routes)
app.use('/CDE', Producto_routes)


//Exportación
module.exports = app;
