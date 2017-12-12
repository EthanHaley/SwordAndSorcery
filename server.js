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

app.get('/editWeapon.html', function(req, res) {
	res.render('editWeapon');
});

app.post('/editAccount.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		var sql = "SELECT * FROM customer_account WHERE id = ?"
		con.query(sql, [request.accountID], function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				res.render('editAccount', result[0]);
			}
		});
	}
	else {
		if(request.id) {
			var sql = "UPDATE customer_account SET username=?, name=?, email=?, password=?, payment_rate=? WHERE id=?";
			con.query(sql, [request.username, request.name, request.email, request.password, 0, request.id], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
		}
		else {
			var sql = "INSERT customer_account SET username=?, name=?, email=?, password=?, payment_rate=?";
			con.query(sql, [request.username, request.name, request.email, request.password, 0], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
		}
	}
});

app.post('/editArmor.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		var sql = "SELECT * FROM armor WHERE id = ?"
		con.query(sql, [request.armorID], function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				res.render('editArmor', result[0]);
			}
		});
	}
	else {
		if(request.id) {
			var sql = "UPDATE armor SET name=?, description=?, _type=?, bonus=?, resistance=? WHERE id=?";
			con.query(sql, [request.name, request.description, request.type, request.bonus, request.resistance, request.id], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
		}
		else {
			var sql = "INSERT items SET name=?, description=?";
			con.query(sql, [request.name, request.description], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
					var sql = "INSERT armor SET id=?, name=?, description=?, _type=?, bonus=?, resistance=?";
					con.query(sql, [result.insertId, request.name, request.description, request.type, request.bonus, request.resistance], function(err, result) {
						if(err) {
							console.log(err);
						}
						else {
							console.log(result);
						}
					})
				}
			});
		}
	}
});

app.post('/editChar.html', function(req, res) {
	var request = req.body;
	console.log(request);
	if(request.isEdit) {
		var sql = "SELECT * FROM characters WHERE id = ?"
		con.query(sql, [request.characterID], function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				console.log(result[0]);
				res.render('editChar', result[0]); //Not getting anything back after submit
			}
		});
	}
	else {
		if(request.id) {
			console.log(request.id);
			var sql = "UPDATE characters SET name=?, party_id=?, customer_id=?, race=?, _class=?, level=?, size=? WHERE id=?";
			con.query(sql, [request.name, 1, 1641, request.race, request._class, request.level, request.size, request.id], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
		}
		else{
			var sql = "INSERT INTO characters(name,party_id,customer_id,race,_class,level,size) VALUES (?,?,?,?,?,?)";
			con.query(sql, [result.name, 1, 1641, result.race, result._class, result.level, result.size], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
			}
}
});

app.post('/editMonster.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		var sql = "SELECT * FROM monsters WHERE id = ?"
		con.query(sql, [request.monsterID], function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				res.render('editMonster', result[0]);
			}
		});
	}
	else {
		if(request.id) {
			var sql = "UPDATE monsters SET name=?, hit_points=?, exp_points=? WHERE id=?";
			con.query(sql, [request.name, request.hitpoints, request.experience, request.id], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
		}
		else {
			var sql = "INSERT monsters SET name=?, hit_points=?, exp_points=?";
			con.query(sql, [request.name, request.hitpoints, request.experience], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
		}
	}
});

app.post('/editSpell.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		var sql = "SELECT * FROM spells WHERE id = ?"
		con.query(sql, [request.spellID], function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				res.render('editSpell', result[0]);
			}
		});
	}
	else {
		if(request.id) {
			var sql = "UPDATE spells SET name=?, spell_level=?, description=? WHERE id=?";
			con.query(sql, [request.name, request.level, request.description, request.id], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
		}
		else {
			var sql = "INSERT spells SET name=?, spell_level=?, description=?";
			con.query(sql, [request.name, request.level, request.description], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
		}
	}
});

app.post('/editWeapon.html', function(req, res) {
	var request = req.body;
	if(request.isEdit) {
		var sql = "SELECT * FROM weapons WHERE id = ?"
		con.query(sql, [request.weaponID], function(err, result) {
			if(err) {
				console.log(err);
			}
			else {
				res.render('editWeapon', result[0]);
			}
		});
	}
	else {
		if(request.id) {
			var sql = "UPDATE weapons SET name=?, description=?, properties=?, damage_die=?, damage_type=? WHERE id=?";
			con.query(sql, [request.name, request.description, request.property, request.damage, request.type, request.id], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
				}
			});
		}
		else {
			var sql = "INSERT items SET name=?, description=?";
			con.query(sql, [request.name, request.description], function(err, result) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(result);
					var sql = "INSERT weapons SET id=?, name=?, description=?, properties=?, damage_die=?, damage_type=?";
					con.query(sql, [result.insertId, request.name, request.description, request.property, request.damage, request.type], function(err, result) {
						if(err) {
							console.log(err);
						}
						else {
							console.log(result);
						}
					})
				}
			});
		}
	}
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
		} 
		else {
			
			//For exp leader board
			/*con.query("SELECT name, GetPartyExp(id) AS GetPartyExp FROM parties  ORDER BY GetPartyExp DESC LIMIT 100",[request.id] function(err, result) {
				if(err) {
					console.log(err);
				} 
				else {
					console.log(result);
					
					var context = {};
					context.parties = result;
					res.render('parties', context);
				}
			var context = {};
			context.parties = result;
			res.render('parties', context);
			});*/
			
			/*var sql = "SELECT a.name, a.kills FROM (SELECT p.name AS name, sum(e.monster_deaths) AS kills FROM parties p"     
			+" JOIN encounters e ON e.party_id = p.id GROUP BY p.id) a WHERE a.kills = (SELECT max(b.kills)"                  
			+" FROM (SELECT sum(e.monster_deaths) AS kills FROM" 
            +" parties p JOIN encounters e ON e.party_id = p.id GROUP BY p.id) b)"
			con.query(sql,function(err,result){
				if(err) {
					console.log(err);
				} 
				else {
					console.log(result);
					
					var context = {};
					context.parties = result;
					res.render('parties', context);
				}
				*/
			var context = {};
			context.parties = result;
			res.render('parties', context);
	}
});
	});

app.get('/partyDetail.html', function(req, res) {
	con.query('SELECT * FROM characters GROUP BY party_id', function(err, result) {
		if(err) {
			console.log(err);
		} 
		else {
			var context = {};
			context.parties = result;
	        res.render('partyDetail', context);
		}
});
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

app.post('/deleteAccount', function(req, res) {
	var request = req.body;
	var sql = "DELETE FROM customer_account WHERE id=?";
	con.query(sql, [request.id], function(err, result) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(result);
		}
	});
});

app.post('/deleteArmor', function(req, res) {
	var request = req.body;
	var sql = "DELETE FROM armor WHERE id=?";
	con.query(sql, [request.id], function(err, result) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(result);
			var itSql = "DELETE FROM items WHERE id=?";
			con.query(itSql, [request.id], function(err, result) {
				if(err) {
					console.log(err);
				} 
				else {
					console.log(result);
				}
			});
		}
	});
});

app.post('/deleteCharacter', function(req, res) {
	var request = req.body;
	var sql = "DELETE FROM characters WHERE id=?";
	con.query(sql, [request.id], function(err, result) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(result);
		}
	});
});

app.post('/deleteMonster', function(req, res) {
	var request = req.body;
	var sql = "DELETE FROM monsters WHERE id=?";
	con.query(sql, [request.id], function(err, result) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(result);
		}
	});
});

app.post('/deleteSpell', function(req, res) {
	var request = req.body;
	var sql = "DELETE FROM spells WHERE id=?";
	con.query(sql, [request.id], function(err, result) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(result);
		}
	});
});

app.post('/deleteWeapon', function(req, res) {
	var request = req.body;
	var sql = "DELETE FROM weapons WHERE id=?";
	con.query(sql, [request.id], function(err, result) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(result);
			var itSql = "DELETE FROM items WHERE id=?";
			con.query(itSql, [request.id], function(err, result) {
				if(err) {
					console.log(err);
				} 
				else {
					console.log(result);
				}
			});
		}
	});
});

//Server start
app.listen(port, function() {
	console.log('App listening on port ' + port);
});
