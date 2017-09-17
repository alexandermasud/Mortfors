var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";


router.post('/tripEditDriver', function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
		client.query("SELECT count(*) as originid FROM resa WHERE avgangsid='" + (req.body.avgangsid) + "'", function(err, result) {
			if (err) {
				return console.error('error while fetching client from pool', err);
			}
			if ((result.rows[0].originid) > 0) {
				client.query("SELECT count(*) as driver FROM chauffor WHERE chaufforid='" + (req.body.chaufforid) + "'", function(err, result) {
					if (err) {
						return console.error('error while fetching client from pool', err);
					}
					if ((result.rows[0].driver) > 0) {
						client.query(("UPDATE resa SET chaufforid = '" + (req.body.chaufforid) + "' WHERE avgangsid = '" + (req.body.avgangsid) + "' ;"), function(err, result) {
							if (err) {
								return console.error('error running query', err);
							}
							done();
							req.flash('test_msg', 'Chaufför redigerades!');
							res.redirect('/trips');
						});
					} else {
						req.flash('fail_msg', 'Chaufförid finns ej!');
						res.redirect('/trips');
					}
				});
			} else {
				req.flash('fail_msg', 'Avgångsid finns ej!');
				res.redirect('/trips');
			}
		});
	});
});
module.exports = router;