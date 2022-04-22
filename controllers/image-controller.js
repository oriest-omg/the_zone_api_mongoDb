const Image = require("../models/images");
const _ = require('underscore')
const multer = require('multer') // import library
const moment = require('moment')
const q = require('q')
const fs = require('fs')
var path = require("path");

module.exports = {
    readAll(req,res){
        Image.find().then((images)=>{
            res.send(images)
        })
    },
    read(req,res){
        const {id} = req.params;
        Image.findById(id).then((image)=>{
            res.send(image);
        })
    },
    getFile (req, res) {
        const {id} = req.params;
        Image.findById(id).then((image)=>{
            res.sendFile(path.resolve(image.source));
        })

    },
    create(req,res){
        fileUpload(req, res)
        .then(fileUploadServiceResponse => {
            // res.status(200).send(fileUploadServiceResponse);
            // console.log(fileUploadServiceResponse.data);
            const image = new Image({
                source : fileUploadServiceResponse.data[0].path,
                label : fileUploadServiceResponse.data[0].originalname
            })
            // console.log(image);
            image.save().then(()=>{
                res.send(image);
            })
        })
        .catch(error => {
            res.status(400).send(error)
        });
    },
    delete(req,res){
        const {id} = req.body;
        Image.findByIdAndRemove(id).then((image)=>{
            res.send(image);
        })
    },
    oldest(req,res){
        Image.find().sort({'age':1}).then((image)=>{
            res.send(image);
        })
    }
}
//electron
// const dir = './dist/client/assets'
//web
const dir = './files'


/** Store file on local folder */
let storage = multer.diskStorage({
destination: function (req, file, cb) {
    //electron
    // cb(null, './dist/client/assets')
    //web
    cb(null, './files')

},
filename: function (req, file, cb) {
    let date = moment(moment.now()).format('YYYYMMDDHHMMSS')
    cb(null, date + '_' + file.originalname.replace(/-/g, '_').replace(/ /g,     '_'))
    // cb(null,file.originalname.replace(/-/g, '_').replace(/ /g,     '_'))

}
})

/** Upload files  */
let upload = multer({ storage: storage }).array('files')

/** Exports fileUpload function */
function fileUpload (req, res) {
    let deferred = q.defer()

    /** Create dir if not exist */
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
        console.log(`\n\n ${dir} dose not exist, hence created \n\n`)
    }

    upload(req, res, function (err) {
        if (req && (_.isEmpty(req.files))) {
            deferred.resolve({ status: 200, message: 'File not attached', data: [] })
        } else {
            if (err) {
                deferred.reject({ status: 400, message: 'error', data: err })
            } else {
                deferred.resolve({
                    status: 200,
                    message: 'File attached',
                    filename: _.pluck(req.files,
                        'filename'),
                    data: req.files
                })
            }
        }
    })
    return deferred.promise
}