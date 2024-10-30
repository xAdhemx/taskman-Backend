
const fileRoutes = require('express').Router()

const {fileCtrl: {upload, uploadCtrl}} = require("../controllers")
const uploadMdw = require('../middlewares/uploadFiles')

const authenticate = require('../middlewares/authenticate') 

fileRoutes.post("/upload", uploadCtrl);
// fileRoutes.post("/upload", uploadMdw, uploadCtrl);

module.exports = fileRoutes