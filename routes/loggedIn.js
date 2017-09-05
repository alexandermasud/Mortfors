var express = require('express');
var router = express.Router();

// Inloggad
router.get('/logged-in', ensureAuthenticated, function(req, res){
	res.render('logged-in');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		
		res.redirect('/');
	}
}

module.exports = router;