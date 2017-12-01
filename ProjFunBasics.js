/*This is based of Ethans code,
Foreach table in the schema there is insert,update,remove,list
*/
"use strict";

module.exports = {
	//Put functions in here
}

/*Customers*/
function listCustomers(req, res, db){
	db.all("SELECT * FROM customer_account", [], function(err, customer_account){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}
//? delete inserst id problem // don't need to give id
function addCustomer(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var customer = JSON.parse(body);
		db.run("INSERT INTO customer_account(username, name, email, password, payment_rate) VALUES (?, ?, ?, ?)",
			[customer.username, customer.email, customer.password, customer.payment_rate],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert character into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function updateCustomer(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var c = JSON.parse(body);
		db.run("UPDATE customer_account SET id=?, username=?, name=?, email=?, password=?, payment_rate=?",
			[c.id, c.username, c.name, c.email, c.password, c.payment_rate],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update customer in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removeCustomer(req, res, db) {
	var c_id;
	db.run("DELETE FROM customer_account WHERE id = ?", [c_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}





/*Transactions*/
function listTransactions(req, res, db){
	var c_id;
	db.all("SELECT * FROM transactions WHERE customer_id = ?", [c_id], function(err, transactions){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
			return;
		}
		if(!Customer_account) {
			res.statusCode = 404;
			res.end("Customer Not Found");
			return;
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}

function addTransaction(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var t = JSON.parse(body);
		db.run("INSERT INTO transactions(customer_id, amount, _date, status) VALUES (?, ?, ?, ?)",
			[t.customer_id, t.amount, t._date, t.status],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert tranaction into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function updateTransaction(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var t = JSON.parse(body);
		db.run("UPDATE transaction SET id=?, customer_id=?, amount=?, _date=?, status=?",
			[t.id,t.customer_id,t.amount,t.date,t.status],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update transaction in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removeTransaction(req, res, db) {
	var t_id;
	db.run("DELETE FROM transaction WHERE id = ?", [t_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}






/*Charaters*/
function listCharacters(req, res, db){
	var c_id;
	db.all("SELECT * FROM characters WHERE customer_id = ?", [c_id], function(err, characters){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
			return;
		}
		if(!Characters) {
			res.statusCode = 404;
			res.end("Character Not Found");
			return;
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}

function addCharacter(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var c = JSON.parse(body);
		db.run("INSERT INTO characters(name, party_id, customer_id, race, _class, _level, _size) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[c.name, c.party_id, c_customer_id, c.race, c._class, c.level, c.size],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert character into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function updateCharacter(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var c = JSON.parse(body);
		db.run("UPDATE characters SET id=?, username=?, name=?, email=?, password=?, payment_rate=?",
			[c.id, c.name, c.party_id, c.customer_id, c.race, c.class, c.level, s.size],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update character in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removeCharacter(req, res, db) {
	var c_id;
	db.run("DELETE FROM characters WHERE id = ?", [c_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}




/*Spells*/ /*Spells Known*/
function listSpellsKnown(req, res, db){
	var c_id;
	db.all("SELECT * FROM spells_known WHERE character_id = ?", [c_id], function(err, spells_known){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
			return;
		}
		if(!Spells_Known) {
			res.statusCode = 404;
			res.end("Charater does not know this spell.");
			return;
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}

function addSpellKnown(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var s = JSON.parse(body);
		db.run("INSERT INTO spells_known(character_id, spell_id) VALUES (?, ?)",
			[s.character_id, s.spell_id],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert character into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function updateSpellKnown(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var s = JSON.parse(body);
		db.run("UPDATE spells_known SET character_id=?, spell_id=?",
			[s.character_id, s.spell_id],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update customer in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removeSpellKnown(req, res, db) {
	var c_id;
	var s_id;
	db.run("DELETE FROM spells_known WHERE character_id = ? and spell_id = ?", [c_id, s_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}





/*Just Spells*/
function listSpells(req, res, db){
	db.all("SELECT * FROM spells", [], function(err, spells){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}

function addSpell(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var s = JSON.parse(body);
		db.run("INSERT INTO spells(name, spell_level, description) VALUES (?, ?, ?)",
			[s.name, s.spell_level, s.description],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert spell into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function updateSpells(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var s = JSON.parse(body);
		db.run("UPDATE spells SET id=?, name=?, spell_level=?, description=?",
			[s.id, s.name, s.spell_level, s.description],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update Spell in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removeSpell(req, res, db) {
	var s_id;
	db.run("DELETE FROM spells WHERE id = ?", [s_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}





/*Inventory*/
function listInventory(req, res, db){
	var c_id
	db.all("SELECT * FROM inventory WHERE character_id = ?", [c_id], function(err, inventory){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
			return;
		}
		if(!Inventory) {
			res.statusCode = 404;
			res.end("Charater Not Found");
			return;
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}

function addInventory(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var i = JSON.parse(body);
		db.run("INSERT INTO inventory(character_id, item_id, quantity) VALUES (?, ?, ?)",
			[i.character_id, i_item_id, i_quantity],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to give item to charater");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function updateInventory(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var i = JSON.parse(body);
		db.run("UPDATE inventory SET character_id=?, item_id=? quantity=?",
			[i.character_id, i.item_id, i.quantity],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update customer in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removeInventory(req, res, db) {
	var c_id;
	var i_id;
	db.run("DELETE FROM inventory WHERE character_id = ? and item_id = ?", [c_id, i_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}

/*Items*/
function listItems(req, res, db){
	db.all("SELECT * FROM items", [], function(err, items){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}
function addItem(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var i = JSON.parse(body);
		db.run("INSERT INTO items(name,description) VALUES (?, ?, ?)",
			[i.name, i.description],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert character into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function updateItem(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var i = JSON.parse(body);
		db.run("UPDATE items SET id=?, name=?, description=?",
			[i.id, i.name, i.description],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update customer in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removeItem(req, res, db) {
	var i_id;
	db.run("DELETE FROM items WHERE id = ?", [i_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}




/*Weapons*/
function listWeapons(req, res, db){
	db.all("SELECT * FROM weapons", [], function(err, weapons){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}

function addWeapon(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var w = JSON.parse(body);
		db.run("INSERT INTO weapons(id, properties, damage_die, damage_type) VALUES (?, ?, ?, ?)",
			[w.id, w.properties, w.damage, w.type],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert character into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function updateWeapons(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var w = JSON.parse(body);
		db.run("UPDATE weapons SET id=?, properties=?, damage_die=?, damage_type=?",
			[w.id, w.properties, w.die, w.type],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update Weapons in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removeWeapon(req, res, db) {
	var i_id;
	db.run("DELETE FROM weapons WHERE id = ?", [i_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}




/*Armor*/
function listArmor(req, res, db){
	db.all("SELECT * FROM armor", [], function(err, armor){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}
//INSERT

function updateArmor(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var a = JSON.parse(body);
		db.run("UPDATE armor SET id=?, _type=?, bonus=?, resistance=?",
			[a.id, a.type, a.bonus, a.resistance],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update Weapons in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removeArmor(req, res, db) {
	var i_id;
	db.run("DELETE FROM armor WHERE id = ?", [i_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}

/*Parties*/
function listParties(req, res, db){
	db.all("SELECT * FROM parties", [], function(err, parties){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}

function addParty(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var p = JSON.parse(body);
		db.run("INSERT INTO parties(name) VALUES (?)",
			[p.name],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert character into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}


function updateParties(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var p = JSON.parse(body);
		db.run("UPDATE parties SET id=?, name=?"
			[w.id, w.properties, w.die, w.type],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update Party in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}


function removeParty(req, res, db) {
	var p_id;
	db.run("DELETE FROM parties WHERE id = ?", [p_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}





/*Encounters*/
function listEncounters(req, res, db){
	var p_id;
	db.all("SELECT * FROM encounters WHERE party_id = ?", [p_id], function(err, encounters){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
			return;
		}
		if(!Characters) {
			res.statusCode = 404;
			res.end("Party Not Found");
			return;
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}

function addEncounter(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var e = JSON.parse(body);
		db.run("INSERT INTO encounters(party_id, monster_id, monster_deaths) VALUES (?, ?, ?)",
			[e.party_id, e.monster_id, e.monster_deaths],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert character into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}


function updateEncounters(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var e = JSON.parse(body);
		db.run("UPDATE encounters SET party_id=?, monster_id=?, monster_deaths",
			[e.party_id, e.monster_id, e.monster_deaths],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update Weapons in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}

function removerEncounter(req, res, db) {
	var p_id;
	var m_id;
	db.run("DELETE FROM encounters WHERE id = ? and monster_id = ?", [p_id, m_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}



/*Monsters*/
function listMonsters(req, res, db){
	db.all("SELECT * FROM monsters", [], function(err, monsters){
			if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(characters));
	});
}

function addMonster(req, res, db) {
	var body = "";
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	
	req.on("data", function(data) {
		body += data;
	});
	
	req.on("end", function() {
		
		var m = JSON.parse(body);
		db.run("INSERT INTO monsters(name, hit_points, exp_points) VALUES (?, ?, ?)",
			[m.name, m.hit_points, m.exp_points],
			
			function(err) {
				if(err) {
					console.error(err); 
					res.statusCode = 500;
					res.end("Failed to insert Monster into databse");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}


function updateMonsters(req, res, db) {
	var id = req.params.id;
	var body = "";
	
	req.on("error", function(err) {
		console.error(err);
		res.statusCode = 500;
		res.end("Server Error");
	});
	req.on("data", function(data) {
		body += data;
	});
	req.on("end", function() {
		var m = JSON.parse(body);
		db.run("UPDATE monsters SET id=?, name=?, hit_point=?, exp_points=?"
			[m.id, m.name, m.hitpoint, m.exp_points],
			function(err) {
				if(err) {
					console.error(err);
		    		res.statusCode = 500;
					res.end("Could not update Weapons in database");
					return;
				}
				res.statusCode = 200;
				res.end();
			}
		);
	});
}


function removeMonster(req, res, db) {
	var m_id;
	db.run("DELETE FROM monsters WHERE id = ?", [m_id], function(err) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Server Error");
		}
     	res.statusCode = 200;
		res.end();
	});
}