var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";




// Startsida
router.post('/createCustomer', function(req, res){
    
            pg.connect(conString, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
          
        
       client.query('INSERT INTO kund (fornamn, efternamn, adress, stad, epost, telefon) values($1, $2, $3, $4, $5, $6)',[
           
           req.body.fornamn, 
           req.body.efternamn, 
           req.body.adress, 
           req.body.stad, 
           req.body.epost, 
           req.body.telefon 
           
       ]); 
          done();
          req.flash('test_msg', 'Ny kund skapades!');
          res.redirect('/customers'); 
    });	
    
    
});







module.exports = router;



