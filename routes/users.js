var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";
var nodemailer = require('nodemailer');
var {ensureAuthenticated} = require('../helpers/auth');


router.get('/register', function(req, res) {
	res.render('register');
});



router.get('/login', function(req, res) {
	res.render('login');
});



// Register Proccess
router.post('/register', function(req, res){
  const firstname = req.body.firstname;
  const firstlast = req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('firstname', 'Name is required').notEmpty();
  req.checkBody('lastname', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      firstname:firstname,
      lastname:firstname,
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});



passport.use(new LocalStrategy(function(username, password, done) {
	User.getUserByUsername(username, function(err, user) {
		if (err) throw err;
		if (!user) {
			return done(null, false, {
				message: 'Ogiltiga uppgifter'
			});
		}
        
        
		User.comparePassword(password, user.password, function(err, isMatch) {
			if (err) throw err;
			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, {
					message: 'Ogiltigt lösenord'
				});
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


router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}), function(req, res) {
	res.redirect('/');
});


router.get('/logout',ensureAuthenticated, function(req, res) {
	req.logout();
	
	res.redirect('../auth/logout');
});
module.exports = router;