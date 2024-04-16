var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartsController.js');
const protect = require('../middleware/protect.js');

router.route('/carts').get(protect,/*checkRole("modifier","USER"),,*/cartController.getListItem)
router.route('/carts/add').post(protect,/*protect,checkRole("modifier","USER"),,*/cartController.addItem)
router.route('/carts/update').post(protect,/*protect,checkRole("modifier","USER"),*/cartController.updateItem)
router.route('/carts/remove').post(protect,/*protect,checkRole("modifier","USER"),*/cartController.deleteItem)
module.exports = router;