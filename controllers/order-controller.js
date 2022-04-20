const Order = require("../models/orders");
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
        // const _id = req.body.email;
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;
        const password = req.body.password;
        const body = req.body;
        const order = new Order({fname,lname,password});
        order._id = email;
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