const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    source : {type : String},
    label : {type : String}
})

const Images = mongoose.model('images',ImagesSchema);

module.exports = Images;