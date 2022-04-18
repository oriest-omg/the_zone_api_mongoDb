CustomerController = require('../controllers/customer-controller');
MovieController = require('../controllers/movie-controller');

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
    server.get('/movies',MovieController.readAll)
    server.get('/movie/:id',MovieController.read)
    server.post('/movie',MovieController.create)
    server.delete('/movie',MovieController.delete)

}