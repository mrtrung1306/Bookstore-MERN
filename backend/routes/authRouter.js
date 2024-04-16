var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController.js');
const checkRole = require('../middleware/checkRole.js');
const protect = require('../middleware/protect.js');
var Validator = require('../validators/user');

router.route('/auth/me').get(protect,authController.getAuth)
router.route('/auth/ForgotPassword').post(authController.forgotPasswordAuth)
router.route('/auth/ResetPassword/:token').post(authController.resetPasswordAuth)
router.route('/auth/logout').post(authController.logoutAuth)
router.route('/auth/login').post(authController.loginAuth)
router.route('/auth/register').post(Validator.UserValidate(),authController.registerAuth)

module.exports = router;
