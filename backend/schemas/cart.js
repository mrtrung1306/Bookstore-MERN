var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    books: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, { timestamps: true });

cartSchema.virtual('totalPrice').get(function () {
    let totalPrice = 0;
    this.books.forEach(item => {
        totalPrice += item.book.price * item.quantity;
    });
    return totalPrice;
});

module.exports = mongoose.model('cart', cartSchema);
