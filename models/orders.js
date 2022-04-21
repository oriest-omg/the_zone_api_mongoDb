const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Movie = require('./movies');


const OrderSchema = new Schema({
    customerId :{
        type : Schema.Types.ObjectId,
        ref:'customer'
    },
    paymentStatus : String,
    paymentId : {
        type : Schema.Types.ObjectId,
        ref:'payment'
    },
    status : String,
    currency : String,
    totalCost : mongoose.Types.Decimal128,
    items : [{
        product_type : {
            type : Schema.Types.ObjectId,
            ref:'productType'
        },
        quantity : String,
        price : mongoose.Types.Decimal128,
        discount : mongoose.Types.Decimal128,
        preTaxTotal : mongoose.Types.Decimal128,
        tax :mongoose.Types.Decimal128,
        total : mongoose.Types.Decimal128
    }],
    shipping :{
        adress:{
            street1: String,
            street2: String,
            city: String,
            state: String,
            country: String,
            zip: String
        },
        origin: {
            street1: String,
            street2: String,
            city: String,
            state: String,
            country: String,
            zipCode: String
        },
        carrier: String,
        tracking: String
    }
});

// OrderSchema.virtual('countMoovies').get(function(){
//     return this.movies.length;
// })

// OrderSchema.pre('remove',function(next){
//     Movie.remove({_id : {$in : this.movies}}).then(()=>{
//         next();
//     })

// })

const Order = mongoose.model('order',OrderSchema);

module.exports = Order;