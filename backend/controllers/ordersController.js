const express = require('express');
const router = express.Router();
const Cart = require('../schemas/cart');
const Order = require('../schemas/order');
const OrderDetails = require('../schemas/orderdetail');
const protect = require('../middleware/protect');
const responseReturn = require('../helper/ResponseHandle');

const checkout = (async (req, res) => {
    try {
        // Tìm giỏ hàng của người dùng
        const cart = await Cart.findOne({ user: req.user._id }).populate('books.book');

        // Nếu không tìm thấy giỏ hàng, trả về lỗi
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này.' });
        }

        // Tạo đơn hàng mới từ thông tin giỏ hàng
        const order = new Order({ user: req.user._id });
        // Lặp qua các sản phẩm trong giỏ hàng và thêm vào đơn hàng chi tiết
        for (const item of cart.books) {
            const orderDetail = new OrderDetails({
                order: order._id,
                book: item.book._id,
                quantity: item.book.quantity,
                quantity: item.quantity,
                price: item.book.price
            });
            await orderDetail.save(); // Lưu thông tin đơn hàng chi tiết
            order.items.push(orderDetail._id); // Thêm ID của đơn hàng chi tiết vào đơn hàng
        }

        // Lưu đơn hàng và xóa giỏ hàng
        await order.save();
        await Cart.deleteOne({ _id: cart._id });
        // Trả về đơn hàng đã được tạo
        responseReturn.ResponseSend(res, true, 200, order);
    } catch (error) {
        responseReturn.ResponseSend(res, false, 500, error);
    }
});

const getOrder = (async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate({
        path: 'items',
        populate: {
            path: 'book',
            model: 'book', 
            select: 'name' 
        }
        }).populate('user');

        const ordersWithTotalPrice = orders.map(order => {
            let totalPrice = 0;
            order.items.forEach(item => {
                totalPrice += item.price * item.quantity;
            });
            return {
                ...order.toObject(),
                totalPrice: totalPrice
            };
        });

        responseReturn.ResponseSend(res, true, 200, ordersWithTotalPrice);
    } catch (error) {
        console.log(error);
        responseReturn.ResponseSend(res, false, 500, error);
    }
});

const getOrderId = (async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const orderDetails = await OrderDetails.find({ order: orderId });
        if (!orderDetails) {
            return res.status(404).json({ message: 'Không tìm thấy chi tiết đơn hàng.' });
        }
        responseReturn.ResponseSend(res, true, 200, orderDetails);
    } catch (error) {
        responseReturn.ResponseSend(res, false, 500, error);
    }
});

module.exports = {
    getOrderId,
    getOrder,
    checkout,
};