'use strict'

const express = require('express');
const usuarioController = require('../controller/login.controller');

var api = express.Router();

api.post('/Login', usuarioController.login)

module.exports = api;
