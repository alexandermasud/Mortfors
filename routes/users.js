var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";

var nodemailer = require('nodemailer');

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
    
    var output = `
    

    <h1>Hej ${req.body.firstname}</h1>

    <h2>Vi på Mörtfors buss har nu skapat ett konto till dig!</h2>

    <h3>Nedan finner ni era kunduppgifter</h3>
    <h4>
    
        <ul>
            <li>Användarnamn: ${req.body.username}</li>

            <li>Förnamn: ${req.body.firstname}</li>
            <li>Efternamn: ${req.body.lastname}</li>
            <li>Adress: ${req.body.address}</li>
            <li>Stad: ${req.body.city}</li>
            <li>Telefon: ${req.body.phone}</li>
            <li>E-post: ${req.body.email}</li>

        </ul>

    </h4>

     










    <h2>Vänliga hälsningar Mörtfors buss</h2>
`;
        
        
    

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
        
        
        pg.connect(conString, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
          
        
       client.query('INSERT INTO kund (kundid, fornamn, efternamn, adress, stad, epost, telefon) values($1, $2, $3, $4, $5, $6, $7)',[
           
           req.body.username,
           req.body.firstname, 
           req.body.lastname, 
           req.body.address, 
           req.body.city, 
           req.body.email, 
           req.body.phone 
           
       ]); 
          done();
    });	
        
        
        
        
          // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rt26upz4yyy57273@ethereal.email',
        pass: 'R1KmpBx8wKjR2UtsVc'
    }
      
      
      /*,
      tls:{
          rejectUnauthorized:false
      }
      */
});

    // setup email data with unicode symbols
    let mailOptions = {
        
       
        
        from: '"Mörtfors buss" <noreply@mortfors.se>', // sender address
        to: '"' + (firstname) + " " + (lastname) +'"' +(email) + '"', // list of receivers
        subject: 'Nytt konto skapat', // Subject line
        /* text: 'Hello world?', // plain text body */
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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