CustomerController = require('../controllers/customer-controller');
ProductController = require('../controllers/product-controller');

module.exports = (server)=>{

    // server.get('/users',(req,res)=>{
    // })

    // server.get('/user/:id',(req,res)=>{
    // })

    //User
    server.get('/customers',CustomerController.readAll)
    server.get('/customer/:id',CustomerController.read)
    server.post('/customer',CustomerController.create)
    server.delete('/customer',CustomerController.delete)
    server.get('/oldest/customer',CustomerController.oldest)

    //MovieS
    server.get('/products',ProductController.readAll)
    server.get('/product/:id',ProductController.read)
    server.post('/product',ProductController.create)
    server.delete('/product',ProductController.delete)

}