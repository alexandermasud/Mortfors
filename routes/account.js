var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";


// Kontosidan
router.get('/account', function(req, res){
    
        pg.connect(conString, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
        client.query('SELECT kop.transaktionsid, kop.kundid, kund.fornamn, kund.efternamn, kop.avgangsid, kop.kostnad, resa.avgangsstad, resa.ankomststad, resa.avgang, resa.ankomst, kop.platser FROM resa JOIN kop ON kop.avgangsid=resa.avgangsid JOIN kund ON kund.kundid=kop.kundid WHERE kund.kundid = 1 ORDER by kop.transaktionsid', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            
            
            res.render('account', {kund: result.rows});
            done();
        });
    });
    
    
});





module.exports = router;