CustomerController = require('../controllers/customer-controller');
ProductController = require('../controllers/product-controller');
OrderController = require('../controllers/order-controller');
ImageController = require('../controllers/image-controller')
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


    //product
    server.get('/products',ProductController.readAll)
    server.get('/product/:id',ProductController.read)
    server.post('/product',ProductController.create)
    server.delete('/product/:id',ProductController.delete)


    //order
    server.get('/orders',OrderController.readAll)
    server.get('/order/:id',OrderController.read)
    server.post('/order',OrderController.create)
    server.delete('/order',OrderController.delete)

    //image
    server.get('/images',ImageController.readAll)
    server.get('/image/:id',ImageController.read)
    server.get('/image/src/:id',ImageController.getFile)
    server.post('/image',ImageController.create)
    server.delete('/image',ImageController.delete)

}