"use strict"

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Middleware - req.body.type:', req.body.type);
        let folder = '';
        if (req.body.type === 'villas') {
            folder = 'uploads/villas/';
        } 
        else if (req.body.type === 'apartments') {
            folder = 'uploads/apartments/';
        }
        else if (req.body.type === 'constructional') {
            folder = 'uploads/constructional/';
        }
        else if (req.body.type === 'architecture') {
            folder = 'uploads/architecture/';
        }
        else {
            folder = 'uploads/others/';
        }
        console.log('Middleware - folder:', folder)
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// const upload = multer({ storage })

const upload = multer({ storage })

// module.exports = upload
module.exports = {
    single: upload.single('file'), // For single file uploads
    multiple: upload.array('files', 10), // For multiple file uploads
}