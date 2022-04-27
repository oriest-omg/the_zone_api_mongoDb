const Product = require("../models/products");
const ProductType = require("../models/product_types");
const moment = require('moment');
module.exports = {
    readAll(req,res){
        Product.find().sort({_id : -1}).populate({
            path: 'product_types',
            model : 'productType',
            populate: { path: 'images'}
        }).then((products)=>{
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
        const created = moment(); 
        const {channels} = req.body;
        const product = new Product({title,category,created,channels});
        for(const productType of req.body.productTypes)
        {
            const product_types = new ProductType({
                available: productType.available,
                stock : productType.stock,
                price  : {
                    original : productType.price.original,
                    discount : productType.price.discount,
                    bulk_discount : productType.price.bulk_discount,
                    discount_quantity : productType.price.discount_quantity,
                    currency : productType.price.currency
                },
                description : productType.description,
                dimensions :{
                    width :  productType.dimensions.width,
                    height : productType.dimensions.height,
                    length : productType.dimensions.lengthh,
                    unit : productType.dimensions.unit
                },
                // images : productType.images,
                created : moment(),
                updated : moment()
            })
            product_types.save()
            product_types.images.push(productType.images);
            product.product_types.push(product_types);
        }
        // product_types.price.push(price);
        Promise.all([product.save()]).then(()=>{
            res.send({result : product})
        });
        // console.log(body)
    },
    async put(req,res){
        console.log(req.body);
        //var//
        const {id} = req.body;
        const {title} = req.body;
        const {category} = req.body; 
        const {channels} = req.body;


        //update//
        const filter = {"_id": id};
        const update = {
            "title": title,
            "category" : category,
            "channels" :channels,
            "product_types": []
        };

        // ( 
        //     {}, 
        //     {$pull: { "productTypes": [] }})

        let product = await Product.findByIdAndUpdate(filter, update);
        console.log(product);
        product.save().then(async ()=>{
            let prod;
            for(const productType of req.body.productTypes)
            {
                if(typeof productType._id ==='undefined')
                {
                    const product_types = new ProductType({
                        available: productType.available,
                        stock : productType.stock,
                        price  : {
                            original : productType.price.original,
                            discount : productType.price.discount,
                            bulk_discount : productType.price.bulk_discount,
                            discount_quantity : productType.price.discount_quantity,
                            currency : productType.price.currency
                        },
                        description : productType.description,
                        dimensions :{
                            width :  productType.dimensions.width,
                            height : productType.dimensions.height,
                            length : productType.dimensions.lengthh,
                            unit : productType.dimensions.unit
                        },
                        // images : productType.images,
                        created : moment(),
                        updated : moment()
                    })
                    product_types.save();
                    prod = await Product.findByIdAndUpdate(filter,{ $push:{"product_types":product_types._id}});
                }
                prod = await Product.findByIdAndUpdate(filter,{ $push:{"product_types":productType._id}});
            }
            prod.save().then(()=>{
                res.send({result : prod});
            })
        });
        // console.log(req.body);
        // const created = moment(); 
        // const product = new Product({title,category,created,channels});
        // for(const productType of req.body.productTypes)
        // {
        //     const product_types = new ProductType({
        //         available: productType.available,
        //         stock : productType.stock,
        //         price  : {
        //             original : productType.price.original,
        //             discount : productType.price.discount,
        //             bulk_discount : productType.price.bulk_discount,
        //             discount_quantity : productType.price.discount_quantity,
        //             currency : productType.price.currency
        //         },
        //         description : productType.description,
        //         dimensions :{
        //             width :  productType.dimensions.width,
        //             height : productType.dimensions.height,
        //             length : productType.dimensions.lengthh,
        //             unit : productType.dimensions.unit
        //         },
        //         // images : productType.images,
        //         created : moment(),
        //         updated : moment()
        //     })
        //     product_types.save()
        //     product_types.images.push(productType.images);
        //     product.product_types.push(product_types);
        // }
        // // product_types.price.push(price);
        // Promise.all([product.save()]).then(()=>{
        //     res.send({result : product})
        // });
        // console.log(body)
    },
    delete(req,res){
        const {id} = req.body;
        // const product = Product.findById(id);
        Product.findOneAndDelete({_id : id}).then((product)=>{
            res.send(product);
        })
    },
    deleteProductType(req,res){
        console.log('deleteProductType');
        const {id} = req.body;
        // const product = Product.findById(id);
        ProductType.findByIdAndRemove({_id : id}).then((product)=>{
            res.send(product);
        })
    }
}