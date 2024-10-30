const taskRoutes = require('express').Router()

const {TaskCtrl: { deleteTask, getAllTasks, postTask, putTask , deleteManyTask, getOwnerTasks }} = require("../controllers");
const authenticate = require('../middlewares/authenticate')

taskRoutes.use(authenticate)
taskRoutes.post('/', postTask);
taskRoutes.get('/', getAllTasks);
taskRoutes.get('/owner/:ownerid', getOwnerTasks);
taskRoutes.put('/:id', putTask);
taskRoutes.delete('/:id', deleteTask);
taskRoutes.post("/delete-many", deleteManyTask)


module.exports = taskRoutes