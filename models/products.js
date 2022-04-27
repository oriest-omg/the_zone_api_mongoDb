const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductType = require('./product_types');
let productBefore;
let productAfter;
let productTypeArray = [];



const ProductSchema = new Schema({
    title : {type: String},
    category : {type : String},
    created : {type : Date},
    channels : [],
    product_types : [{
        type : Schema.Types.ObjectId,
        ref:'productType'
    }]
});

// ProductSchema.pre('remove',{ query: true, document: false }, function() { console.log('Removing!'); });
ProductSchema.pre('findOneAndDelete', async function(next){
    const product = await this.model.findOne(this.getQuery());
    for(const productType of product.product_types){
        ProductType.findOneAndDelete({_id : productType._id}).then(()=>{
            next();
        })
    }
})

ProductSchema.pre('findOneAndUpdate', async function(next){
    productBefore = await this.model.findOne(this.getQuery());
    if(productBefore.product_types.length)
    console.log('avant maj');
    console.log(productBefore);
    productTypeArray = [];
    for(const productType of productBefore.product_types){
        productTypeArray.push(productType._id)
    }
    // for(const productType of product.product_types){
    //     ProductType.findOneAndDelete({_id : productType._id}).then(()=>{
    //         next();
    //     })
    // }
})


ProductSchema.post('findOneAndUpdate', async function(next){
    productAfter = await this.model.findOne(this.getQuery());
    console.log('product arry');
    console.log(productTypeArray);
    console.log('après maj');
    console.log(productAfter);
    if(productAfter.product_types.length)
    for(const productType of productTypeArray){
        if(!productAfter.product_types.includes(productType))
        {
            ProductType.findOneAndDelete({_id : productType}).then(()=>{
                next();
            })
        }
    }
})

const Product = mongoose.model('product',ProductSchema);

module.exports = Product;