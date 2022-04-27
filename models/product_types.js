const mongoose = require('mongoose');
const fs = require("fs");
const Schema = mongoose.Schema;
var path = require('path');

const Image = require('./images');

const ProductTypeSchema = new Schema({
    available:{type: Boolean},
    stock : {type : Number},
    price : {
        original : {type : String},
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

ProductTypeSchema.pre('findOneAndDelete', async function(next){
    const productType = await this.model.findOne(this.getQuery());
    console.log('pre remove image');
    console.log(productType);
    if(productType.images && productType.images.length)
    {
        for(const image of productType.images){
            Image.findOneAndDelete({_id : image._id}).then((image)=>{
                console.log('after remove image');
                console.log(image);
                const imagePath = path.resolve(image.source);
                console.log(imagePath);
                fs.unlink(imagePath, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("File removed:", imagePath);
                }
                });
                next();
            })
        }
    }
})

const ProductType = mongoose.model('productType',ProductTypeSchema);

module.exports = ProductType;