const { Tasks } = require('../model')
// const {updateCountry, getCountryById} = require('./Country')


const create = async (data) => {
    try {
        const instance = new Tasks(data);
        const result = await instance.save()
        return result
    } catch (error) {
        console.log('Error create Tasks  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await Tasks.findByIdAndUpdate(id, {...data});
        const result = await Tasks.findById(id);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await Tasks.findOne(query);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await Tasks.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getOwnerTasks = async (ownerId) => {
    try {
        const result = await Tasks.find({owner: ownerId});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const remove = async (id) => {
    try {
        const result = await Tasks.findByIdAndDelete(id);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const removeMany = async ids => {
    try {
        const { deletedCount } = await Tasks.deleteMany({_id: { $in: ids }});
        objToReturn = {deletedCount, ids}
        return objToReturn
       //returned result = { "acknowledged": true, "deletedCount": 2 }
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}



module.exports = {
    removeMany,
    create,
    update,
    findOne,
    getAll,
    getOwnerTasks,
    remove
}