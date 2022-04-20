const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Movie = require('./movies');


const CustomerSchema = new Schema({
    fname : String,
    lname : String,
    nickname : String,
    email_verified : Boolean,
    password : {
        hased_password : String,
        reset_in_progress : Boolean,
        reset_code : String,
        reset_expires : Date,
        active : Boolean
    },
    created_at : { type: Date, default: Date.now },
    ip_adress : {
        ip1 : Number,
        ip2 : Number,
        ip3 : Number,
        ip4 : Number,
        last_used : Date,
    },
    site_visits : [{
        visit_start : Date,
        visit_last_interaction : Date,
        referrer_url : String
    }],
    physical_addresses : [{
        street_number: Number,
        directional : String,
        street : String,
        suffix : String,
        unit_type : String,
        unit_number : Number,
        zip_code : String,
        country_code : String,
        primary : Boolean,
        active : Boolean,
        is_billing : Boolean,
        is_shipping : Boolean
    }],
    shipping_adress:{
        street1 : String,
        street2 : String,
        city : String,
        zip : String
    }
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