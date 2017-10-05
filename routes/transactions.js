var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";
var {ensureAuthenticated} = require('../helpers/auth');

router.get('/transactions', ensureAuthenticated, function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
		client.query('SELECT kop.transaktionsid, kop.kundid, kund.fornamn, kund.efternamn, kop.avgangsid, kop.kostnad, resa.avgangsstad, resa.ankomststad, resa.avgang, resa.ankomst, kop.platser FROM resa JOIN kop ON kop.avgangsid=resa.avgangsid JOIN kund ON kund.kundid=kop.kundid ORDER by kop.transaktionsid', function(err, result) {
			if (err) {
				return console.error('error running query', err);
			}
			res.render('transactions', {
				kund: result.rows
			});
			done();
		});
	});
});




router.delete('/transactions/:id',ensureAuthenticated,  function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
        
        client.query("SELECT *  FROM kop WHERE transaktionsid ='" + (req.params.id) + "'", function(err, result) {
            
			if (err) {
				return console.error('error while fetching client from pool', err);
			}
            
            else{
   
                var queryLine = "BEGIN; DELETE FROM kop WHERE transaktionsid ='" + (req.params.id) + "'; UPDATE resa SET platser = platser + '" + (result.rows[0].platser) + "' WHERE avgangsid = '" + (result.rows[0].avgangsid) + "' ; COMMIT;"
		        
                client.query(queryLine, function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                req.flash('success_msg', '<p>Transaktion ' + (req.params.id) + ' togs bort!</p>');
                res.sendStatus(200);
                done();

     
                });
            }

	   });
    });
});



module.exports = router;