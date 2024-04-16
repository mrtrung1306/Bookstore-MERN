var express = require('express');
var router = express.Router();
var bookController = require('../controllers/booksController.js');
const checkRole = require('../middleware/checkRole.js');
const protect = require('../middleware/protect.js');
const uploads  = require('../helper/multer.js')

router.route('/books').get(bookController.getBooks)
router.route('/books/:id').get(/*protect,checkRole("modifier","USER"),*/bookController.getIdBooks)
router.route('/books').post(uploads/*protect,checkRole("modifier","USER"),*/,bookController.postBooks)
router.route('/books/:id').put(uploads/*protect,checkRole("modifier","USER"),*/,bookController.putBooks)
router.route('/books/:id').delete(/*protect,checkRole("modifier","USER"),*/bookController.deleteBooks)

module.exports = router;
