var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../helpers/auth');

router.get('/logged-in', ensureAuthenticated, function(req, res) {
	res.render('logged-in');
});


module.exports = router;