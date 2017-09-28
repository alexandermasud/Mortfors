var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";
var methodOverride = require('method-override');


router.get('/trips', function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
		client.query('SELECT * FROM resa ORDER by avgangsid', function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			res.render('trips', {
				resa: result.rows
			})
			done();
		});
	});
});

router.post('/trips', function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
		client.query("SELECT count(*) as origin FROM stad WHERE land='" + (req.body.avgangsland) + "' AND stad='" + (req.body.avgangsstad) + "'", function(err, result) {
			if (err) {
				return console.error('error while fetching client from pool', err);
			}
			if ((result.rows[0].origin) > 0) {
				client.query("SELECT count(*) as destination FROM stad WHERE land='" + (req.body.ankomstland) + "' AND stad='" + (req.body.ankomststad) + "'", function(err, result) {
					if (err) {
						return console.error('error while fetching client from pool', err);
					}
					if ((result.rows[0].destination) > 0) {
						client.query("SELECT count(*) as driver FROM chauffor WHERE chaufforid='" + (req.body.chaufforid) + "'", function(err, result) {
							if (err) {
								return console.error('error while fetching client from pool', err);
							}
							if ((result.rows[0].driver) > 0) {
								client.query('INSERT INTO resa (avgangsland, avgangsstad, ankomstland, ankomststad, avgang, ankomst, pris, platser, chaufforid) values($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
									req.body.avgangsland,
									req.body.avgangsstad,
									req.body.ankomstland,
									req.body.ankomststad,
									req.body.avgang,
									req.body.ankomst,
									req.body.pris,
									req.body.platser,
									req.body.chaufforid
								]);
								done();
								req.flash('test_msg', 'Ny resa skapades!');
								res.redirect('/trips');
							} else {
								req.flash('fail_msg', 'Chaufför finns ej');
								res.redirect('/trips');
							}
						});
					} else {
						req.flash('fail_msg', 'Slutdestination finns ej');
						res.redirect('/trips');
					}
				});
			} else {
				req.flash('fail_msg', 'Startdestination finns ej');
				res.redirect('/trips');
			}
		});
	});
});

router.put('/trips/:id', function(req, res) {
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