const AuthRouter = require('express').Router()
const {secuCtrl: {login, register, Activation, logout}} = require("../controllers")
const authenticate = require('../middlewares/authenticate') 

AuthRouter.post("/login", login)
AuthRouter.post("/register", register);
AuthRouter.post("/activation", Activation);
AuthRouter.post("/logout", authenticate, logout);

module.exports = AuthRouter






