var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";


router.get('/drivers', function(req, res) {
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
module.exports = router;