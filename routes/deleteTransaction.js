var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";









router.delete('/deleteTransaction/:id', function(req,res){
    
          pg.connect(conString, function(err, client, done){
              
              
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
              
        
        
       
              
        var queryLine = "SELECT avgangsid, kundid, platser FROM kop WHERE transaktionsid = '1'"
              
        client.query(queryLine,function(err, result){
        
            if(err) {
                return console.error('error running query', err);
            }
            
            
            console.log("Avgångsid = " + (result.rows[0].avgangsid))
            console.log("Kundid = " + (result.rows[0].kundid) )
            console.log("Platser = " + (result.rows[0].platser)) 
            console.log("Transid = " + (req.params.id))
            
            
            
            req.flash('test_msg', '<p>Transaktion ' + (req.params.id) + 'togs bort!</p>'); 
            res.redirect('/transactions');
            done();
        
        
        
        
        
        
        
        
        });
              
              
              
              
              
              
              
    });   
});
      

module.exports = router;




