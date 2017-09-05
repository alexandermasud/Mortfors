var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";





// Sökfunktion
router.post('/search', function(req, res){
    
    pg.connect(conString, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
              
        var origin=(req.body.origin)
        var destination=(req.body.destination)
            
        
       
        client.query(("SELECT * FROM resa WHERE avgangsstad ='" + (origin) + "' AND ankomststad = '" + (destination) + "' ORDER BY avgangsid") ,function(err, result){
        
            if(err) {
                return console.error('error running query', err);
            }
            
            console.log('')
            console.log('Användare sökte på resa från: ' + (origin) + ' till: ' + (destination))
            console.log('')
            
            res.render('index', {resa: result.rows});
            done();
        });
    });   
    
});



module.exports = router;