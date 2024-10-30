const { TaskRepo } = require("../db/repository")

const postTask = async (request, response) => {
    const body = request.body;
    let created = await TaskRepo.create({...body});
    return response.json(created);
}

const putTask = async (request, response) => {
    const body = request.body;
    const {id} = request.params
    let created = await TaskRepo.update(body, id);
    return response.json(created);
}


const getAllTasks = async (request, response) => {
    let List = await TaskRepo.getAll()
    return response.json(List)
}


const getOwnerTasks = async (request, response) => {
    const {ownerid} = request.params
    console.log('owner : ', ownerid)
    let List = await TaskRepo.getOwnerTasks(ownerid)
    return response.json(List)
}

const getOneTask = async (request, response) => {
    let id = request.params.id;
    const TodoData = await TaskRepo.findOne({_id: id});
    return response.json( {...TodoData})
}


const deleteTask =  async (request, response) => {
    let id = request.params.id;
    const result = await TaskRepo.remove(id)
    return response.json(result)
}


const deleteManyTask =  async (request, response) => {
    let {ids} = request.body
    const result = await TaskRepo.removeMany(ids)
    return response.json(result)
}



module.exports = {
    deleteManyTask,
    postTask,
    getAllTasks,
    getOwnerTasks,
    getOneTask,
    putTask,
    deleteTask
}

