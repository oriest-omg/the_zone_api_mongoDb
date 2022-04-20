const Customer = require("../models/customers");
// const Movie = require("../models/products")
module.exports = {
    readAll(req,res){
        Customer.find().then((customers)=>{
            res.send(customers)
        })
    },
    read(req,res){
        const {id} = req.params;
        Customer.findById(id).then((customer)=>{
            res.send(customer);
        })
    },
    create(req,res){
        // const _id = req.body.email;
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;
        const password = req.body.password;
        const body = req.body;
        const customer = new Customer({fname,lname,password});
        customer._id = email;
        customer.save().then(()=>{
            res.send(customer);
        })
        // customer.save().then(()=>{
        //     movie.save().then(()=>{
        //         res.send({result : 'Création du customer :'+customer})
        //     })
        // })
        // console.log(body)
    },
    delete(req,res){
        const {id} = req.body;
        Customer.findByIdAndRemove(id).then((customer)=>{
            res.send(customer);
        })
    },
    oldest(req,res){
        Customer.find().sort({'age':1}).then((customer)=>{
            res.send(customer);
        })
    }
}