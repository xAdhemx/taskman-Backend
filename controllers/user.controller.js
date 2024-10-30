const { UserRepo } = require("../db/repository")
const sharp = require('sharp')
const {User} = require('../db/model')
const path = require('path')
const fs = require('fs')


const postUser = async (request, response) => {
    const body = request.body;
    let created = await UserRepo.create({...body});
    return response.json(created);
}

const putUser = async (request, response) => {
    const body = request.body;
    const {id} = request.params
    let created = await UserRepo.update(body, id);
    return response.json(created);
}


const getAllUsers = async (request, response) => {
    let List = await UserRepo.getAll()
    return response.json(List)
}

const getOneUser = async (request, response) => {
    let id = request.params.id;
    const TodoData = await UserRepo.findOne({_id: id});
    return response.json( {...TodoData})
}

const deleteUser =  async (request, response) => {
    let id = request.params.id;
    const result = await UserRepo.remove(id)
    return response.json(result)
}

const extractUserInfos = (req, res, next) => {
    console.log('extract body : ', req.body)
    console.log('extract file : ', req.file)
    console.log('extract userId : ', req.params.userId)
    
    next()
}

const profileCtrl = async (req, res) => {
    const {userId} = req.body
    const {filename, destination, mimetype} = req.file
    console.log('req.body : ', req.body)
    console.log('req.file : ', req.file)
    const oldName =`${destination}${filename}`;
    const newName = `${destination}${userId}.${filename.split('.')[1]}`
    fs.renameSync(oldName, newName);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    // console.log('req : ', req.body , ' - ', req.file)
    let Buffer;
    Buffer = await sharp( path.join(__dirname, `../upload/${filename}`) ).png().toBuffer();
    // if (mimetype.endsWith('png')) {
    // }
    // if (mimetype.endsWith('jpg')) {
    //     Buffer = await sharp( path.join(__dirname, `../upload/${filename}`) ).jpg().toBuffer();
    // }
    // if (mimetype.endsWith('jpeg')) {
    //     Buffer = await sharp( path.join(__dirname, `../upload/${filename}`) ).jpeg().toBuffer();
    // }

    // console.log('Buffer: ', Buffer)

    // const user = await User.findOneAndUpdate({ _id: userId }, { avatar: Buffer } );

    // console.log('user: ', user)

    res.status(200).json({userId, filename})

  }


module.exports = {
    extractUserInfos,
    profileCtrl,
    postUser,
    getAllUsers,
    getOneUser,
    putUser,
    deleteUser
}

