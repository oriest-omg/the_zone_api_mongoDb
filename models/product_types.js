const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = require('./price').schema;
const DimensionsSchema = require('./dimensions').schema;
const ImagesSchema = require('./images').schema;



const ProductTypeSchema = new Schema({
    available:{type: Boolean},
    Stock : {type : Number},
    price : {
        original : {type : mongoose.Types.Decimal128},
        discount : {type : Number},
        bulk_discount : { type : Number},
        discount_quantity : { type : Number},
        currency : {type :String}
    },
    description : {type : String},
    dimensions :{
        width : {type : Number},
        height : {type : Number},
        length : {type : Number},
        unit : {type : String}
    } ,
    images : [{
        type : Schema.Types.ObjectId,
        ref:'images'}],
    created : {type : Date},
    updated : {type :Date}
})

const ProductType = mongoose.model('productType',ProductTypeSchema);

module.exports = ProductType;