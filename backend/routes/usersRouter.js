var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController.js');
var Validator = require('../validators/user.js');
const checkRole = require('../middleware/checkRole.js');
const protect = require('../middleware/protect.js');

router.route('/users').get(usersController.getUsers)
router.route('/users/:id').get(/*protect,checkRole("modifier","USER"),*/usersController.getIdUsers)
router.route('/users').post(/*protect,checkRole("modifier","USER"),*/Validator.UserValidate(),usersController.postUsers)
router.route('/users/:id').put(/*protect,checkRole("modifier","USER"),*/usersController.putUsers)
router.route('/users/:id').delete(/*protect,checkRole("modifier","USER"),*/usersController.deleteUsers)

module.exports = router;
