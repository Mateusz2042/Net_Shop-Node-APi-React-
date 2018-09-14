var express = require('express');
var app = express();
var cors = require('cors');
var db = require('./db');

app.use(cors());

var UserController = require('./src/modules/user/userController');
app.use('/api/users', UserController);

var AuthController = require('./src/modules/auth/authController');
app.use('/api/auth', AuthController);

module.exports = app;
