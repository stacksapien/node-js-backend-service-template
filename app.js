
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require("helmet");

var indexRouter = require('./routes/index');
// var searchRoutes = require('./routes/search');
var authRoutes = require('./routes/auth');
var userRoutes = require("./routes/user");

const fileUpload = require('express-fileupload');


// // Middlewares
var authMiddlware = require('./services/middlewares/auth');

// // Middlewares binding with routes
userRoutes.use(authMiddlware);


var app = express();
app.use(fileUpload());

let mongoose = require("mongoose");

// ================================================
//            MODAL CONFIGURATION
// ================================================

// ================================================
//            SERVER CONFIGURATION
// ================================================


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/', authRoutes);
app.use('/user', userRoutes);

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
  res.render('error');
});

// app.use(passport.initialize());


mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}?authSource=admin`, {
  allowDiskUse : true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false

})
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("ERROR iN DB CONNECTION", err);
  });

module.exports = app;
