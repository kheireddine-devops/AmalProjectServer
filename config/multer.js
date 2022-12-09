const mime = require('mime-types')
const {v4: uuidv4} = require("uuid");
const multer = require("multer");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};
const storageImageUsers = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images/users/')
    },
    filename: function (req, file, cb) {
        console.log(file.mimetype)
        console.log(mime.extension(file.mimetype))

        const ext = mime.extension(file.mimetype);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueName = uuidv4();
        cb(null, `${uniqueName}.${ext}`)
    }
})

const storageImageProduits = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images/produits/')
    },
    filename: function (req, file, cb) {
        console.log(file.mimetype)
        console.log(mime.extension(file.mimetype))

        const ext = mime.extension(file.mimetype);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueName = uuidv4();
        cb(null, `${uniqueName}.${ext}`)
    }
})

const storageImageHelps = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images/helps/')
    },
    filename: function (req, file, cb) {
        console.log(file.mimetype)
        console.log(mime.extension(file.mimetype))

        const ext = mime.extension(file.mimetype);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueName = uuidv4();
        cb(null, `${uniqueName}.${ext}`)
    }
})

const storagePdf = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/cv/')
    },
    filename: function (req, file, cb) {

        const ext = mime.extension(file.mimetype);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueName = uuidv4();
        cb(null, `${uniqueName}.${ext}`)
    }
})

const storageVideos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/videos/tutoriels/')
    },
    filename: function (req, file, cb) {

        const ext = mime.extension(file.mimetype);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueName = uuidv4();
        cb(null, `${uniqueName}.${ext}`)
    }
})

const UploadImageUsers = multer({ storage:storageImageUsers })
const UploadImageProduits = multer({ storage:storageImageProduits })
const UploadPdf = multer({ storage:storagePdf })
const UploadImageHelps = multer({ storage:storageImageHelps })
const UploadVideos = multer({ storage:storageVideos })

module.exports = {
    UploadImageUsers,
    UploadImageProduits,
    UploadPdf,
    UploadImageHelps,
    UploadVideos
}