var express = require('express');
var router = express.Router();
var orderController = require('../controllers/ordersController.js');
const protect = require('../middleware/protect.js');

router.route('/orders/checkout').post(protect,/*protect,checkRole("modifier","USER"),,*/orderController.checkout)
router.route('/orders').get(protect,/*protect,checkRole("modifier","USER"),,*/orderController.getOrder)
router.route('/orders/:orderId').get(protect,/*protect,checkRole("modifier","USER"),*/orderController.getOrderId)

module.exports = router;