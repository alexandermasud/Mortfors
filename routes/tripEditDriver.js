var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";






// Startsida
router.post('/tripEditDriver', function(req, res){
    
          pg.connect(conString, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
              
              var avgangsid=(req.body.avgangsid)
              var chaufforid=(req.body.chaufforid)
              
            
              
          
        
       client.query(("UPDATE resa SET chaufforid = '" + (chaufforid) + "' WHERE avgangsid = '"+ (avgangsid) + "' ;") ,function(err, result){
        
            if(err) {
                return console.error('error running query', err);
            } 
          done();
          req.flash('test_msg', 'Chaufför redigerades!');
          res.redirect('/trips'); 
    });	
    
    
});
    
});







module.exports = router;
