var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";
var flash = require('connect-flash');





// Startsida
router.post('/createTrip', function(req, res){
    
          pg.connect(conString, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
          
        
       client.query('INSERT INTO resa (avgangsland, avgangsstad, ankomstland, ankomststad, avgang, ankomst, pris, platser, chaufforid) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',[
           
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
    });	
    
    
});







module.exports = router;



