var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Registrera
router.get('/register', function(req, res){
	res.render('register');
});

// Inlogg
router.get('/login', function(req, res){
	res.render('login');
});

// Registrera användare
router.post('/register', function(req, res){
	var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var city = req.body.city;
    var phone = req.body.phone;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
    
    
    console.log("Ph nr är  " + (phone));

	// Validation
	req.checkBody('firstname', 'Firstname is required').notEmpty();
    req.checkBody('lastname', 'Lastname is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('city', 'City is required').notEmpty();
    req.checkBody('phone', 'Phone number is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
            
            
            firstname: firstname,
			lastname: lastname,
            address: address,
            city: city,
            phone: phone,
			email: email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('test_msg', 'Du är nu registrerad!');

		res.redirect('/');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Ogiltiga uppgifter'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Ogiltigt lösenord'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('test_msg', 'Du är nu utloggad');

	res.redirect('/');
});

module.exports = router;