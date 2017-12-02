//Dependencies
var fs = require('fs');
var http = require('http');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

//Database setup
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'swordsandsorcery'
});

con.connect(function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log('Connected to MYSQL server.');
	}
	con.query('CREATE DATABASE IF NOT EXISTS swordsandsorcery', function(err, result) {
		if(err) {
			console.log(err)
		} else {
			console.log("Created database.");
		}
	});
});

//Server setup
var port = 8080;
var stylesheet = fs.readFileSync('public/app.css');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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

app.get('/accounts.html', function(req, res) {
	res.render('accounts');
});

app.get('/armor.html', function(req, res) {
	res.render('armor');
});

app.get('/editAccount.html', function(req, res) {
	res.render('editAccount');
});

app.get('/editArmor.html', function(req, res) {
	res.render('editArmor');
});

app.get('/editChar.html', function(req, res) {
	res.render('editChar');
});

app.get('/editMonster.html', function(req, res) {
	res.render('editMonster');
});

app.get('/editSpell.html', function(req, res) {
	res.render('editSpell');
});

app.get('/editWeapon.html', function(req, res) {
	res.render('editWeapon');
});

app.get('/index.html', function(req, res) {
	res.render('index');
});

app.get('/inventory.html', function(req, res) {
	res.render('inventory');
});

app.get('/monsters.html', function(req, res) {
	res.render('monsters');
});

app.get('/parties.html', function(req, res) {
	res.render('parties');
});

app.get('/partyDetail.html', function(req, res) {
	res.render('partyDetail');
});

app.get('/spells.html', function(req, res) {
	res.render('spells');
});

app.get('/transactions.html', function(req, res) {
	res.render('transactions');
});

app.get('/weapons.html', function(req, res) {
	//con.connect(function(err) {
	//	if(err) {
	//		console.log(err);
	//	}
		con.query('SELECT * FROM weapons', function(err, result) {
			if(err) {
				console.log(err);
			} else {
				var context = {};
				context.weapons = result;
				res.render('weapons', context);
			}
		});
	//});
});

//Server start
app.listen(port, function() {
	console.log('App listening on port ' + port);
});