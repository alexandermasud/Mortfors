var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";

var nodemailer = require('nodemailer');




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
        
        var firstname = (req.body.firstname)
        var lastname = (req.body.lastname)
        var email = (req.body.email)
             
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
                
                
                
                 var output = `
    

    <h1>Hej ${req.body.firstname}</h1>

    <h2>Din resa är nu bokad!</h2>

    <h3>Nedan finner ni uppgifter om er resa!</h3>
    <h4>
    
        <ul>
            <li>Avgång: ${req.body.avgangsland} ${req.body.avgangsstad} ${req.body.avgang}</li>


            <li>Ankomst: ${req.body.ankomstland} ${req.body.ankomststad} ${req.body.ankomst}</li>
          
        </ul>

    </h4>

     


    <h2>Vänliga hälsningar Mörtfors buss</h2>
`;
 
        
          // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'rt26upz4yyy57273@ethereal.email',
            pass: 'R1KmpBx8wKjR2UtsVc'
        }


          /*,
          tls:{
              rejectUnauthorized:false
          }
          */
        });

        // setup email data with unicode symbols
        let mailOptions = {

       

            from: '"Mörtfors buss" <noreply@mortfors.se>', // sender address
            to: '"' + (firstname) + " " + (lastname) +'"' +(email) + '"', // list of receivers
            subject: 'Ny resa bokad', // Subject line
            /* text: 'Hello world?', // plain text body */
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });


                
                
                
              req.flash('test_msg', '<p><strong>Grattis </strong> Din resa från ' + (req.body.avgangsland) + ' till ' + (req.body.ankomstland) + ' är nu bokad!</p>');
              res.redirect('/');
            
            });
           };
        });      
      });
    



module.exports = router;