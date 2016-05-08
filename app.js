//Require a file from the root
global.rootRequire = function (name)
{
    return require(__dirname + '/' + name);
}
//Used for easy filereading
global.rootPath = __dirname + "/";

var http = require("http");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var passport = require("passport");

require('./config/passportlocal.js')(passport);

//var _port = 3001;
//process.env["PORT"] = _port;

var app = express();
//app.settings.port = 3001;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

// required for passport
app.use(session({
    secret: '1234567890abcdefBatman',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Set if user is logged in or not
app.use(function (req, res, next)
{
    if (req.user)
    {
        res.locals.login = true;
        res.locals.isAdmin = req.user.isAdmin();
    }
    else
    {
        res.locals.login = false;
        //DEBUG CODE TO ALWAYS BE LOGGED IN AS ADMIN
        req.user = { 
            isAdmin : function () { return true; }
        };       
    }
    
    //DEBUG CODE TO ALWAYS BE LOGGED IN!
    res.locals.login = true;
    res.locals.isAdmin = true;
   
    next();
});
require('./routes/home')(app, passport);
require('./routes/exam/exam.js')(app, passport);
require('./routes/admin/admin.js')(app, passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
