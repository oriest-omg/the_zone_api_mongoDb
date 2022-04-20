const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const PaymentSchema = new Schema({
	customerId: String,
	status: String,
	gateway: String,
	type: String,
	amount: mongoose.Types.Decimal128,
	card: {
		brand: String,
		pan: String,
		expirationMonth: Number,
		expirationYear: Number,
		cvv: Number
	},
    token :String
})

const Payment = mongoose.model('payment',PaymentSchema);

module.exports = Payment;