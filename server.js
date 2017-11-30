//Dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

//Server setup
var port = 8080;
var stylesheet = fs.readFileSync('public/app.css');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: false}));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

//Routes
app.get('/', function(req, res) {
	fs.readFile('public/index.html', function(err, body) {
		res.end(body);
	});
});

app.get('/app.js', function(req, res) {
	fs.readFile('public/app.js', function(err, body) {
		res.end(body);
	});
});

app.get('/app.css', function(req, res) {
	res.setHeader('Content-Type', 'text/css');
	res.end(stylesheet);
});


//Server start
app.listen(port, function() {
	console.log('App listening on port ' + port);
});