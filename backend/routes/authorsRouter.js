var express = require('express');
var router = express.Router();
var authorController = require('../controllers/authorsController.js');
const checkRole = require('../middleware/checkRole.js');
const protect = require('../middleware/protect.js');
// router.use('/authors', authorController.getAuthors);
// router.use('/:id', authorController.getIdAuthors);

router.route('/authors').get(authorController.getAuthors)
router.route('/authors/:id').get(authorController.getIdAuthors)
router.route('/authors').post(/*protect,checkRole("modifier","USER"),*/authorController.postAuthors)
router.route('/authors/:id').put(/*protect,checkRole("modifier","USER"),*/authorController.putAuthors)
router.route('/authors/:id').delete(/*protect,checkRole("modifier","USER"),*/authorController.deleteAuthors)

module.exports = router;

// //hostname:port/users
// router.use('/api/v1/users', require('./users'));
// router.use('/api/v1/auth', require('./auth'));
// //hostname:port/api/v1/books
// router.use('/api/v1/books', require('./books'));
// router.use('/api/v1/authors', require('./authors'));
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

