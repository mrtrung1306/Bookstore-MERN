var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoriesController.js');
const checkRole = require('../middleware/checkRole.js');
const protect = require('../middleware/protect.js');

router.route('/categories').get(categoryController.getCategories)
router.route('/categories/:id').get(categoryController.getIdCategories)
router.route('/categories').post(/*protect,checkRole("modifier","USER"),*/categoryController.postCategories)
router.route('/categories/:id').put(/*protect,checkRole("modifier","USER"),*/categoryController.putCategories)
router.route('/categories/:id').delete(/*protect,checkRole("modifier","USER"),*/categoryController.deleteCategories)

module.exports = router;

