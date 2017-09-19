var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";


router.delete('/deleteTransaction/:id', function(req, res) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error while fetching client from pool', err);
		}
        
        
       
		client.query("SELECT * FROM resa", function(err, result, fields) {
			if (err) {
				return console.error('error while fetching client from pool', err);
			}
            
            else{
                
                
                
                console.log('Resultat =' + result)
                
            }
                
                
          
                
            
                
              
			
		});
	});
});
module.exports = router;

