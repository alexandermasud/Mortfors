var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app= express();

// DB connect String
var connect = "postgres://mtmjbqma:FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d@horton.elephantsql.com:5432/mtmjbqma";

// Assign Dust Engine To .dust Files

app.engine('dust', cons.dust);

// Set Default Ext .dust

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public Folder

app.use(express.static(path.join(__dirname, 'public')))

// Body Parser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

// Load Pages And Postgresql

app.get('/', function(req, res){
        res.render('index');
            
});

// Search Page
app.get('/resor-sok', function(req, res){
         pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
             
        
        client.query('SELECT * FROM resa', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            res.render('resor-sok', {resa: result.rows});
            done();
        });
    });
            
});



// Search Page Function
app.post('/soka', function(req,res) {
          pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
              
        var queryOne=(req.body.searchSelect)
        var queryTwo=(req.body.searchWord)
            
        var queryLine = ("SELECT * FROM resa WHERE " + (queryOne) + "='" + (queryTwo) + "'")
        
        if(queryTwo == "") {
            queryLine = ('SELECT * FROM resa')
        }
              
        console.log(queryOne)
        console.log(queryTwo)
        console.log(queryLine)
        
       
        client.query((queryLine) ,function(err, result){
        
            if(err) {
                return console.error('error running query', err);
            }
            res.render('resor-sok', {resa: result.rows});
            done();
        });
    });   
});

// Search Page Function
app.post('/kopa', function(req,res) {
          pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
              
        var avgangsid=parseInt(req.body.avgangsid,10)
        var koptaplatser=parseInt(req.body.koptaplatser,10)
       
        

            
       
        var queryLine1 = ("UPDATE resa SET platser = platser -" + (koptaplatser) + "WHERE avgangsid =" + (avgangsid))
        //var queryLine2 = ('SELECT avgangsid FROM resa ORDER BY avgangsid ASC')
        
 
  
       
        client.query(((queryLine1)) ,function(err, result){
        
            if(err) {
                return console.error('error running query', err);
            }
            res.render('resor-sok', {resa: result.rows});
            done();
            
        });
              
              
              
              
              
              
    });   
});





// Create Driver 
app.post('/regchauffor', function(req,res) {
    
      pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
          
        
       client.query('INSERT INTO chauffor (chaufforid, fornamn, efternamn, adress, stad, hemtelefon) values($1, $2, $3, $4, $5, $6)',[
           
           req.body.chaufforid, 
           req.body.fornamn, 
           req.body.efternamn,
           req.body.adress,
           req.body.stad,
           req.body.hemtelefon
          
           
       ]); 
          done();
          res.redirect('/chaufforer'); 
    });	
    
});


// Driver Page
app.get('/chaufforer', function(req, res){
        pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
        client.query('SELECT * FROM chauffor', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            res.render('chaufforer', {chauffor: result.rows});
            done();
        });
    });   
});
 
// Create Customer
app.post('/regkund', function(req,res) {
    
      pg.connect(connect, function(err, client, done){
        
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
          res.redirect('/kunder'); 
    });	
    
});

// Customer Page
app.get('/kunder', function(req, res){
    pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
        client.query('SELECT * FROM kund', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            res.render('kunder', {kund: result.rows});
            done();
        });
    });
});

// Create City
app.post('/regstad', function(req,res) {
    
      pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
          
        
       client.query('INSERT INTO stad (land, stad, adress) values($1, $2, $3)',[
           
           req.body.land, 
           req.body.stad, 
           req.body.adress
          
           
       ]); 
          done();
          res.redirect('/stader'); 
    });	
    
});

// Cities Page
app.get('/stader', function(req, res){
    pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
        client.query('SELECT * FROM stad', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            res.render('stader', {stad: result.rows});
            done();
        });
    });
});

// Create Travel Itinerary
app.post('/regresa', function(req,res) {
    
      pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
          
        
       client.query('INSERT INTO resa (avgangsland, avgangsstad, ankomstland, ankomststad, datum, avgang, ankomst, pris, platser, chaufforid) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',[
           
            req.body.avgangsland, 
            req.body.avgangsstad,
            req.body.ankomstland, 
            req.body.ankomststad, 
            req.body.datum, 
            req.body.avgang, 
            req.body.ankomst, 
            req.body.pris, 
            req.body.platser, 
            req.body.chaufforid
           
       ]); 
          done();
          res.redirect('/resor-registrera'); 
    });	
    
});

// Travel Page
app.get('/resor-registrera', function(req, res){
    pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
        client.query('SELECT * FROM resa', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            res.render('resor-registrera', {resa: result.rows});
            done();
        });
    });
});

//Köpta Resor
app.get('/kop', function(req, res){
    pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
        client.query('SELECT * FROM kund', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            res.render('kop', {kund: result.rows});
            done();
        });
    });
});






// Server
app.listen(3000, function(){
    console.log('Server startad på http://localhost:3000/');
});