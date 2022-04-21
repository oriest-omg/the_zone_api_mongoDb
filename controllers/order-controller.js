const Customer = require("../models/customers");
const Order = require("../models/orders");
const Payment = require("../models/payments");
const ProductType = require("../models/product_types");
module.exports = {
    readAll(req,res){
        Order.find().then((orders)=>{
            res.send(orders)
        })
    },
    read(req,res){
        const {id} = req.params;
        Order.findById(id).then((order)=>{
            res.send(order);
        })
    },
    create(req,res){
        const customer = new Customer({
            _id : req.body.email
        });
        const payment = new Payment({
            _id : req.body.paymentId
        });
        const productType = new ProductType({
            _id : req.items.productTypeId
        });
        const order = new Order({
            // customerId :{
            //     type : Schema.Types.ObjectId,
            //     ref:'customer'
            // },
            paymentStatus : req.body.paymentStatus,
            // paymentId : {
            //     type : Schema.Types.ObjectId,
            //     ref:'payment'
            // },
            status : req.body.status,
            currency : req.body.currency,
            totalCost : req.body.totalCost,
            items : [{
                // product_type : {
                //     type : Schema.Types.ObjectId,
                //     ref:'productType'
                // },
                quantity : req.items.quantity,
                price : req.items.price,
                discount : req.items.discount,
                preTaxTotal : req.items.preTaxTotal,
                tax :req.items.tax,
                total : req.items.total
            }],
            shipping :{
                adress:{
                    street1: req.shipping.adress.street1,
                    street2: req.shipping.adress.street2,
                    city: req.shipping.adress.city,
                    state: req.shipping.adress.state,
                    country: req.shipping.adress.country,
                    zip: req.shipping.adress.zip
                },
                origin: {
                    street1: req.shipping.origin.street1,
                    street2: req.shipping.origin.street2,
                    city: req.shipping.origin.city,
                    state: req.shipping.origin.state,
                    country: req.shipping.origin.country,
                    zipCode: req.shipping.origin.zipCode
                },
                carrier: req.shipping.quantity,
                tracking: req.shipping.quantity
            }
        });
        order.customerId.push(customer);
        order.paymentId.push(payment);
        order.product_type.push(productType);
        order.save().then(()=>{
            res.send(order);
        })
        // order.save().then(()=>{
        //     movie.save().then(()=>{
        //         res.send({result : 'Création du order :'+order})
        //     })
        // })
        // console.log(body)
    },
    delete(req,res){
        const {id} = req.body;
        Order.findByIdAndRemove(id).then((order)=>{
            res.send(order);
        })
    },
    oldest(req,res){
        Order.find().sort({'age':1}).then((order)=>{
            res.send(order);
        })
    }
}