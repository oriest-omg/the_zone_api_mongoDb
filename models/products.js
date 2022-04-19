const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductTypeSchema = require('./product_types').schema;


const ProductSchema = new Schema({
    product_types : [{
        type : Schema.Types.ObjectId,
        ref:'productType'}],
    title : {type: String},
    category : {type : String},
    created : {type : Date},
    channels : []
})

const Product = mongoose.model('product',ProductSchema);

module.exports = Product;