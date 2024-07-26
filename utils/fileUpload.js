const multer = require('multer')
const path = require('path');

const FILE_TYPE = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
}

const storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValidformat = FILE_TYPE[file.mimetype]
        let uploadError = new Error("Invalid Image Type")

        if(isValidformat) {
            uploadError = null
        }

        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // const extention = FILE_TYPE[file.mimetype]
        const ext = path.extname(file.originalname);
        const uniqueFileImage = `${file.fieldname}-${Date.now()}${ext}`
        cb(null, uniqueFileImage)
    }
})

exports.uploadOption = multer({
    storage: storageFile
})