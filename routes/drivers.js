var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";
var {ensureAuthenticated} = require('../helpers/auth');

router.get('/drivers',ensureAuthenticated, function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
		client.query("SELECT * FROM chauffor WHERE chaufforid != 'Ej bestämt' ORDER BY fornamn", function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			res.render('drivers', {
				chauffor: result.rows
			});
			done();
		});
	});
});


router.post('/drivers',ensureAuthenticated, function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
		client.query("SELECT count(*) as countdriver FROM chauffor WHERE chaufforid = '" + (req.body.chaufforid) + "'", function(err, result) {
			if ((result.rows[0].countdriver) == 1) {
				req.flash('fail_msg', 'Personnummret är upptaget');
				res.redirect('/drivers');
			} else {
				client.query('INSERT INTO chauffor (chaufforid, fornamn, efternamn, adress, stad, hemtelefon) values($1, $2, $3, $4, $5, $6)', [
					req.body.chaufforid,
					req.body.fornamn,
					req.body.efternamn,
					req.body.adress,
					req.body.stad,
					req.body.hemtelefon
				]);
				done();
				req.flash('success_msg', 'Ny chaufför skapades!');
				res.redirect('/drivers');
			}
		});
	});
});

module.exports = router;