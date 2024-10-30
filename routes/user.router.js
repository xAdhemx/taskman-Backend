
const userRoutes = require('express').Router()

const {userCtrl: { deleteUser, getAllUsers, getOneUser, postUser, putUser , profileCtrl, extractUserInfos }} = require("../controllers")

userRoutes.route("/").post(postUser).get(getAllUsers)
userRoutes.route("/:id").put(putUser).delete(deleteUser)

module.exports = userRoutes