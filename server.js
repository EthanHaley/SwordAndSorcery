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
	con.query('SELECT * FROM customer_account', function(err, result) {
		if(err) {
			console.log(err);
		} else {
			var context = {};
			context.accounts = result;
			res.render('accounts', context);
		}
	});
});

app.get('/armor.html', function(req, res) {
	con.query('SELECT * FROM armor', function(err, result) {
		if(err) {
			console.log(err);
		} else {
			var context = {};
			context.armor = result;
			res.render('armor', context);
		}
	});
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

app.post('/editAccount.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		accountID = request.accountID;
		//sql stuff
	}
	else {
		//sql stuff
	}
	res.redirect('/accounts');
});

app.post('/editArmor.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		armorID = request.armorID;
		//sql stuff
	}
	else {
		//sql stuff
	}
	res.redirect('/armor.html');
});

app.post('/editChar.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		characterID = request.characterID;
		//sql stuff
	}
	else {
		//sql stuff
	}
	res.redirect('/index.html');
});

app.post('/editMonster.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		monsterID = request.monsterID;
		//sql stuff
	}
	else {
		//sql stuff
	}
	res.redirect('/monsters.html');
});

app.post('/editSpell.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		spellID = request.spellID;
		//sql stuff
	}
	else {
		//sql stuff
	}
	res.redirect('/spells.html');
});

app.post('/editWeapon.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		weaponID = request.weaponID;
		//sql stuff
		var sql = 'SELECT * FROM weapons WHERE id = ?';
		con.query(sql, weaponID, function(err, result, field){
			if(err){
				console.log(err);
			} else{
				//do something with result
			}
		});
	}
	else {
		//sql stuff
	}
	res.redirect('/weapons.html');
});

app.get('/index.html', function(req, res) {
	con.query('SELECT * FROM characters', function(err, result) {
		if(err) {
			console.log(err);
		} else {
			var context = {};
			context.characters = result;
			res.render('index', context);
		}
	});
});

app.get('/inventory.html', function(req, res) {
	//lots to figure out here
	res.render('inventory');
});

app.get('/monsters.html', function(req, res) {
	con.query('SELECT * FROM monsters', function(err, result) {
		if(err) {
			console.log(err);
		} else {
			var context = {};
			context.monsters = result;
			res.render('monsters', context);
		}
	});
});

app.get('/parties.html', function(req, res) {
	con.query('SELECT * FROM parties', function(err, result) {
		if(err) {
			console.log(err);
		} else {
			//code to calcultate xp and kills for each party needs to go here
			var context = {};
			context.parties = result;
			res.render('parties', context);
		}
	});
});

app.get('/partyDetail.html', function(req, res) {
	//query for finding all characters that belong to a certain party
	//query for certain party
	res.render('partyDetail');
});

app.get('/spells.html', function(req, res) {
	con.query('SELECT * FROM spells', function(err, result) {
		if(err) {
			console.log(err);
		} else {
			var context = {};
			context.spells = result;
			res.render('spells', context);
		}
	});
});

app.get('/transactions.html', function(req, res) {
	con.query('SELECT * FROM transactions', function(err, result) {
		if(err) {
			console.log(err);
		} else {
			//query to find email from the customer id of each transaction
			var context = {};
			context.transactions = result;
			res.render('transactions', context);
		}
	});
});

app.get('/weapons.html', function(req, res) {
	con.query('SELECT * FROM weapons', function(err, result) {
		if(err) {
			console.log(err);
		} else {
			var context = {};
			context.weapons = result;
			res.render('weapons', context);
		}
	});
});

//Server start
app.listen(port, function() {
	console.log('App listening on port ' + port);
});