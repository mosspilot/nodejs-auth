const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Routers
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const accountRouter = require('./routes/account');
const oauth2Router = require('./routes/oauth');
const dialogRouter = require('./routes/dialog');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

const app = express();

/*
  Ensure helmet is enabled early on so that headers
 are properly set with reasonable defaults.
 */
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Manage sessions using express-session
// TODO: hardening configuration, such as https only cookies
app.use(require('express-session')({
  secret: 'something to replace later',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    // Note sameSite lax is set here so that we can use the github
    // social provider login via oauth and allow our sessions to
    // propagate there and finish our authorization flow.
    sameSite: 'Lax',
    path: '/',
    httpOnly: true,
  },
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// Set up the mongoose connection
mongoose.connect('mongodb://localhost/auth-exercise', {'useNewUrlParser': true});

// Set up passport strategy for local auth
const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// OAuth 2 Passport Settings
require('./auth/oauth2');

// Router routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/account', accountRouter);
app.use('/dialog', dialogRouter);
app.use('/oauth', oauth2Router);
app.use('/api', apiRouter);
app.use('/auth', authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
