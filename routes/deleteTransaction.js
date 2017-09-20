var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";


router.delete('/deleteTransaction/:id', function(req, res) {
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
                req.flash('test_msg', '<p>Transaktion ' + (req.params.id) + ' togs bort!</p>');
                res.sendStatus(200);
                done();

     
                });
            }

	});
});
});
module.exports = router;