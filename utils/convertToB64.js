
const fs = require('fs')
const path = require('path')


const convertToB64 = (filePath) => {

    // read image file
    console.log('convertToB64 file: ', filePath)
    return new Promise((resolve, rejected) => {
        fs.readFile(filePath, (err, data) => {
            // error handle
            if(err) {  rejected(err) }
            // get image file extension name
            const extensionName = path.extname(filePath);
            // convert image file to base64-encoded string
            const base64Data = Buffer.from(data, 'binary').toString('base64');
            // combine all strings
            const base64DataStr = `data:image/${extensionName.split('.').pop()};base64,${base64Data}`;
            resolve(base64DataStr)
        })

    })
  
}

module.exports = convertToB64

// fs.readFile(filePath, (err, data) => {
//     // error handle
//     if(err) {  throw err; }
//     // get image file extension name
//     const extensionName = path.extname(filePath);
//     // convert image file to base64-encoded string
//     const base64Data = Buffer.from(data, 'binary').toString('base64');
//     // combine all strings
//     const base64DataStr = `data:image/${extensionName.split('.').pop()};base64,${base64Data}`;
// })