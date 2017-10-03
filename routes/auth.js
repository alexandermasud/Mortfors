var express = require('express');
var router = express.Router();
var passport = require('passport');

var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";
var {ensureAuthenticated} = require('../helpers/auth');


router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    
    
router.get( '/google/callback', 
    passport.authenticate( 'google', { failureRedirect: '/'}),
           
        function(req,res){
            req.flash('success_msg', 'Du är nu inloggad');
            res.redirect('/');
        });

module.exports = router;
