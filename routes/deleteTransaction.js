var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";
console.log('HEJ!!!!')

router.post('/deleteTransaction', function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
		var transaktionsid = (req.body.transaktionsid)
		var avgangsid = (req.body.avgangsid)
		var platser = (req.body.platser)
		var queryLine = "BEGIN; DELETE FROM kop WHERE transaktionsid ='" + (req.body.transaktionsid) + "'; UPDATE resa SET platser = platser + '" + (req.body.platser) + "' WHERE avgangsid = '" + (req.body.avgangsid) + "' ; COMMIT;"
		client.query(queryLine, function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			req.flash('test_msg', '<p>Transaktion ' + (req.body.transaktionsid) + ' togs bort!</p>');
			res.redirect('/transactions');
			done();
		});
	});
});
module.exports = router;