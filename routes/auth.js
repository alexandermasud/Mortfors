var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    
    
router.get( '/google/callback', 
    passport.authenticate( 'google', { failureRedirect: '/'}),
           
        function(req,res){
            req.flash('success_msg', 'Du är nu inloggad');
            res.redirect('/');
        });


router.get('/verify', (req, res) => {
  if(req.user){
     req.flash('success_msg', 'Verifierad');
    res.redirect('/');  
  } else {
    req.flash('fail_msg', 'Inte verifierad');
      res.redirect('/');  
  }
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
