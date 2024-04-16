const express = require('express');
const router = express.Router();
const Cart = require('../schemas/cart');
const protect = require('../middleware/protect');
var responseReturn = require('../helper/ResponseHandle');

const getListItem = (async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('books.book');
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này.' });
        }
        const cartWithTotalPrice = {
            ...cart.toObject(),
            totalPrice: cart.totalPrice
        };
        responseReturn.ResponseSend(res, true, 200, cartWithTotalPrice);
    } catch (error) {
        console.log(error);
        responseReturn.ResponseSend(res, false, 404, error);
    }
});

const addItem = (async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, books: [] });
        }
        const existingBookIndex = cart.books.findIndex(item => item.book.toString() === req.body.bookId);
        if (existingBookIndex !== -1) {
            cart.books[existingBookIndex].quantity += 1;
        } else {
            cart.books.push({ book: req.body.bookId, quantity: 1 });
        }
        await cart.save();
        responseReturn.ResponseSend(res, true, 200, cart);
    } catch (error) {
        console.log(error);
        responseReturn.ResponseSend(res, false, 404, error);
    }
});

const updateItem = (async (req, res) => {
    try {
        const { bookId, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này.' });
        }
        const existingBook = cart.books.find(item => item.book.toString() === bookId);
        if (!existingBook) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng.' });
        }
        existingBook.quantity = quantity;
        await cart.save();
        responseReturn.ResponseSend(res, true, 200, cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        responseReturn.ResponseSend(res, false, 404, error);
    }
});
const deleteItem = (async (req, res) => {
    try {
        const { bookId } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này.' });
        }
        cart.books = cart.books.filter(item => item.book.toString() !== bookId);
        await cart.save();
        responseReturn.ResponseSend(res, true, 200, cart);
    } catch (error) {
        console.error('Error removing product from cart:', error);
        responseReturn.ResponseSend(res, false, 404, error);
    }
});

module.exports = {
    getListItem,
    addItem,
    updateItem,
    deleteItem
};
