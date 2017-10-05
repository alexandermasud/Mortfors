var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";
var {ensureAuthenticated} = require('../helpers/auth');



router.get('/cities', ensureAuthenticated, function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
		client.query('SELECT * FROM stad ORDER BY land', function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			res.render('cities', {
				stad: result.rows
			});
			done();
		});
	});
});

router.post('/cities', ensureAuthenticated, function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
		client.query('INSERT INTO stad (land, stad, adress) values($1, $2, $3)', [
			req.body.land,
			req.body.stad,
			req.body.adress
		]);
		done();
		req.flash('success_msg', 'Ny stad skapades!');
		res.redirect('/cities');
	});
});

module.exports = router;