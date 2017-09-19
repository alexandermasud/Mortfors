var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');

var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://alex:alex@ds125914.mlab.com:25914/mortfors');

var routes = require('./routes/index');
var search = require('./routes/search');
var purchase = require('./routes/purchase');

var customers = require('./routes/customers');

var drivers = require('./routes/drivers');
var createDriver = require('./routes/createDriver');

var cities = require('./routes/cities');
var createCity = require('./routes/createCity');

var trips = require('./routes/trips');
var createTrip = require('./routes/createTrip');
var tripEditDriver = require('./routes/tripEditDriver');

var transactions = require('./routes/transactions');
var deleteTransaction = require('./routes/deleteTransaction');

var account = require('./routes/account');
var users = require('./routes/users');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
	defaultLayout: 'layout'
}));

app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.'),
			root = namespace.shift(),
			formParam = root;
		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
	res.locals.test_msg = req.flash('test_msg');
	res.locals.fail_msg = req.flash('fail_msg');
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

app.get('/', routes);
app.post('/search', search);
app.post('/purchase', purchase);

app.get('/customers', customers);

app.get('/drivers', drivers);
app.post('/createDriver', createDriver);

app.get('/cities', cities);
app.post('/createCity', createCity);

app.get('/trips', trips);
app.post('/createTrip', createTrip);
app.post('/tripEditDriver', tripEditDriver);

app.get('/transactions', transactions);
app.delete('/deleteTransaction/:id', deleteTransaction);

app.post('/account', account);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log('')
	console.log('Server started on localhost:' + app.get('port') + ' and on 10.0.1.6:' + app.get('port'));
	console.log('')
});