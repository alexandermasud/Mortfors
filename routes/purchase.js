var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";



// Buy function

router.post('/purchase', function(req,res) {
         pg.connect(conString, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
        
         
        var kundid=(req.body.kundid)
        var avgangsid=(req.body.avgangsid)
        var orgplatser=(req.body.orgplatser)
        var koptaplatser=(req.body.koptaplatser)
        var kostnad=(req.body.kostnad)
             
        console.log("Kundid = " + (kundid))
        console.log("Avgångsid = " + (avgangsid))
        console.log("Ursprungligt antal platser = " + (orgplatser))
        console.log("Köpta platser = " + (koptaplatser))
        console.log("Platser kvar = " + ((orgplatser) - (koptaplatser)))
         
        if (((orgplatser)-(koptaplatser) < 0)){
            
            console.log("")
            console.log("Köpet avbröts")
            console.log("")
            req.flash('fail_msg', '<p><strong>Tyvärr </strong> Köpet gick inte igenom! </p>');
            res.redirect('/'); 
            done();    
        }
         
         if (((orgplatser)-(koptaplatser) > -1)){
            
             console.log("")
             console.log("Köpet genomfördes")
             console.log("")


            client.query("BEGIN; UPDATE resa SET platser = platser - " + (koptaplatser) + " WHERE avgangsid = " + (avgangsid) + " ; INSERT INTO kop (kundid, avgangsid, platser, kostnad) values ('" + (kundid) + "'," + (avgangsid) + ","+ (koptaplatser) + "," +(kostnad) +" ); COMMIT;",function(err, result) {

                if(err) {
                    return console.error('Något gick fel', err);
                        }


            done();
              req.flash('test_msg', '<p><strong>Grattis </strong> Ditt köp genomfördes!</p>');
              res.redirect('/');
            
            });
           };
        });      
      });
    



module.exports = router;