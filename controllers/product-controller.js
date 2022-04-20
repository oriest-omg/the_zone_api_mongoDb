const Product = require("../models/products");
const ProductType = require("../models/product_types");
module.exports = {
    readAll(req,res){
        Product.find().then((products)=>{
            res.send(products)
        })
    },
    read(req,res){
        const {id} = req.params;
        Product.findById(id).populate({
            path: 'product_types',
            model : 'productType'
        }).then((product)=>{
            res.send(product);
        })
    },
    create(req,res){
        console.log(req.body);
        const {title} = req.body;
        const {category} = req.body; 
        const {created} = req.body; 
        const {channels} = req.body;
        const product_types = new ProductType({
            available: req.body.ProductType.available,
            Stock : req.body.ProductType.stock,
            price  : {
                original : req.body.ProductType.price.original,
                discount : req.body.ProductType.price.discount,
                bulk_discount : req.body.ProductType.price.bulk_discount,
                discount_quantity : req.body.ProductType.price.discount_quantity,
                currency : req.body.ProductType.price.currency
            },
            description : req.body.ProductType.description,
            dimensions :{
                width :  req.body.ProductType.dimensions.width,
                height : req.body.ProductType.dimensions.height,
                length : req.body.ProductType.dimensions.lengthh,
                unit : req.body.ProductType.dimensions.unit
            },
            //images : req.body.PTavailable,
            created : req.body.ProductType.created,
            updated : req.body.ProductType.updated
        })
        const product = new Product({title,category,created,channels});
        product.product_types.push(product_types);
        // product_types.price.push(price);
        Promise.all([product_types.save(),product.save()]).then(()=>{
            res.send({result : product})
        });
        // console.log(body)
    },
    delete(req,res){
        const {id} = req.body;
        Product.findByIdAndRemove(id).then((product)=>{
            res.send(product);
        })
    }
}