// const uploadFile = require("../middlewares/uploadFiles");
// const fs = require("fs");
const convertB64 = require('../utils/convertToB64')
const User = require("../db/model/user")



// const upload = async (req, res) => {

//     try {

//         await uploadFile(req, res);

//         if (req.file == undefined) {
//           return res.status(400).send({ message: "Please upload a file!" });
//         }
        
//         const {userId} = req.body;
//         const {filename, destination} = req.file
//         const oldName =`${destination}${filename}`;
//         const newName = `${destination}${userId}.${filename.split('.')[1]}`

//         fs.renameSync(oldName, newName); // renommage du fichier

//         res.status(200).send({
//             message: "Uploaded the file successfully: " + req.file.originalname,
//         });
//     } catch (err) {
//       console.log(err);
  
//       if (err.code == "LIMIT_FILE_SIZE") {
//         return res.status(500).send({
//           message: "File size cannot be larger than 2MB!",
//         });
//       }
  
//       res.status(500).send({
//         message: `Could not upload the file: ${req.file.originalname}. ${err}`,
//       });
//     }
//   };

  const uploadCtrl = async (req, res) => {
    console.log('body : ', req.body)
    const {userId} = req.body
    // const {filename, destination} = req.file
    // console.log('uploadCtrl data : ', {filename, destination})
    // const filepath =`${destination}${filename}`;
    // convertion du ficher en Base
    // const B64 = await convertB64(filepath);
    // mise à jour du model User
    // await User.findByIdAndUpdate(userId, {avatar:B64})
    await User.findByIdAndUpdate(userId, {avatar:""})
    const user = await User.findById(userId)
    console.log('user: ', user)
    // suppression du fichier apres la maj du model
    // try {
    //     fs.unlinkSync(filepath);
    //     console.log(`File ${filepath} has been deleted.`);
    // } catch (err) {
    //     console.log('fs.unlinkSync error: ', err)
    //     console.error(err);
    // }

    // res.status(200).send({...user.toJSON()});
    res.status(200).send({...user});
  }

  module.exports = {
    uploadCtrl
  }
  
    // fs.readFile(newName, {encoding: 'base64'}, (err, data) => {
        //     if (err) {
        //       throw err;
        //     }
        //     console.log(`data:${filemime};base64,${data}`);
        // });
        // // const file =  fs.readFileSync(newName, { encoding: 'base64' }) 
        // // console.log(file)