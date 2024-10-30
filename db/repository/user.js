const { User  } = require('../model')
// const {updateCountry, getCountryById} = require('./Country')


const create = async (data) => {
    try {
        const instance = new User(data);
        const result = await instance.save()
        return result
    } catch (error) {
        console.log('Error create User  : ', error.message)
    }
}

const update = async (data, id) => {
    try {
        await User.findByIdAndUpdate(id, {...data});
        const result = await User.findById(id);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const findOne = async (query) => {
    try {
        const result = await User.findOne(query);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const getAll = async () => {
    try {
        const result = await User.find({});
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}

const remove = async (id) => {
    try {
        const result = await User.findByIdAndDelete(id);
        return result
    } catch (error) {
        console.log('Error  : ', error.message)
    }
}


module.exports = {
    create,
    update,
    findOne,
    getAll,
    remove
}