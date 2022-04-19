const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Movie = require('./movies');


const CustomerSchema = new Schema({
    fname : String,
    lname : String,
    email : String,
    password : String,
    // age: Number,
    // movies : [{
    //     type : Schema.Types.ObjectId,
    //     ref : 'movie'
    // }]
});

// CustomerSchema.virtual('countMoovies').get(function(){
//     return this.movies.length;
// })

// CustomerSchema.pre('remove',function(next){
//     Movie.remove({_id : {$in : this.movies}}).then(()=>{
//         next();
//     })

// })

const Customer = mongoose.model('customer',CustomerSchema);

module.exports = Customer;