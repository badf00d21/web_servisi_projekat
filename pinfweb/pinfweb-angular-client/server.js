// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');

// configuration ===========================================
var port = process.env.PORT || 8080; 

app.use(bodyParser.json()); 

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes
               
app.listen(port);     
console.log('Server running on port: ' + port);
        
exports = module.exports = app;                   