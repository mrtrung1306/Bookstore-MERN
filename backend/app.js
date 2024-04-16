var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const mongoose = require('mongoose');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static("/backend/public/uploads"));
app.use(cors({
  origin:"http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"],
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var authorRouter = require('./routes/authorsRouter');
var bookRouter = require('./routes/booksRouter');
var userRouter = require('./routes/usersRouter');
var authRouter = require('./routes/authRouter');
var categoryRouter = require('./routes/categoryRouter');
var cartRouter = require('./routes/cartsRouter');
var orderRouter = require('./routes/ordersRouter');
//hostname:port/

mongoose.connect("mongodb://127.0.0.1:27017/store")
.then(function () {
    console.log("connected");
  }
).catch(function (err) {
  console.log(err.message);
})

app.use('/api/v1/', authRouter);
app.use('/api/v1/', authorRouter);
app.use('/api/v1/', bookRouter);
app.use('/api/v1/', userRouter);
app.use('/api/v1/', categoryRouter);
app.use('/api/v1/', cartRouter);
app.use('/api/v1/', orderRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message)
});

module.exports = app;
