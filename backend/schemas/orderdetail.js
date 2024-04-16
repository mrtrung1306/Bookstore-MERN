var mongoose = require('mongoose');

var orderDetailsSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    quantity: Number,
    price: Number
}, { timestamps: true });

module.exports = mongoose.model('orderdetails', orderDetailsSchema);