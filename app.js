var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require("body-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
require('./config/passport')(passport);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const handlebarsInstance = exphbs.create({
  defaultLayout: "main",
  // Specify helpers which are only registered on this instance.
  helpers: {
      asJSON: (obj, spacing) =>{
          if (typeof spacing === "number"){
              return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
          }
          return new Handlebars.SafeString(JSON.stringify(obj));
      }
  },
  partialsDir: ["views/partials/"]
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
  }
  next();
}

// view engine setup
app.engine("handlebars", handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport
app.use(session({
  secret: 'CS546_RocketTeam', // session secret
  resave: true,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 60 * 10 // 10 minutes
  }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require('./routes/login.js')(app, passport); 

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
