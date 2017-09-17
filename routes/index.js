var express = require('express');
var router = express.Router();
const { client } = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";




// Startsida
router.get('/', function(req, res){
    
    
    client.connect(conString, function(err, client, done){
        
        
        if (err) {
            console.log(err.stack)
        } 
        
         client.query('SELECT * FROM resa ORDER BY avgangsid', (err, result) => {
        
        if (err) {
            console.log(err.stack)
        } 

        
        res.render('index', {resa: result.rows});
        
        
        })
        
        done();
        
        
        
    })
    

    
});







module.exports = router;