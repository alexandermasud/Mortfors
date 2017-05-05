var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app= express();

// DB connect String
var connect = "postgres://alex:@localhost/database_mortfors";

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

app.get('/resor', function(req, res){
         pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
        client.query('SELECT * FROM rutt', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            res.render('resor', {rutt: result.rows});
            done();
        });
    });
            
});

app.get('/chauffor', function(req, res){
        pg.connect(connect, function(err, client, done){
        
        if(err) {
            return console.error('error while fetching client from pool', err);
        }
        client.query('SELECT * FROM chauffor', function(err, result) {
            
            if(err) {
                return console.error('error running query', err);
            }
            res.render('chauffor', {chauffor: result.rows});
            done();
        });
    });   
});
 

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
    

// Server
app.listen(3000, function(){
    console.log('Server Started On Port 3000');
    
});