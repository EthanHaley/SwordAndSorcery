function loadPage() {
	$('body').load('/index.html');
}

function loadAccounts() {
	$('body').load('/accounts.html');
}

function loadArmor() {
	$('body').load('/armor.html');
}

function loadCharacters() {
	$('body').load('/index.html');
}

function loadMonsters() {
	$('body').load('/monsters.html');
}

function loadParties() {
	$('body').load('/parties.html');
}

function loadSpells() {
	$('body').load('/spells.html');
}

function loadWeapons() {
	$('body').load('/weapons.html');
}

function editAccount(accountID) {
	var context = {};
	context.accountID = accountID;
	context.isEdit = true;
	$('body').load('/editAccount.html', context);
}

function editArmor(armorID) {
	var context = {};
	context.armorID = armorID;
	context.isEdit = true;
	$('body').load('/editArmor.html', context);
}

function editCharacter(characterID) {
	var context = {};
	context.characterID = characterID;
	context.isEdit = true;
	$('body').load('/editChar.html', context);
}

function editMonster(monsterID) {
	var context = {};
	context.monsterID = monsterID;
	context.isEdit = true;
	$('body').load('/editMonster.html', context);
}

function editSpell(spellID) {
	var context = {};
	context.spellID = spellID;
	context.isEdit = true;
	$('body').load('/editSpell.html', context);
}

function editWeapon(weaponID) {
	var context = {};
	context.weaponID = weaponID;
	context.isEdit = true;
	console.log(context);
	$('body').load('/editWeapon.html', context);
}

function saveAccount() {
	var account = {};
	account.name = $('#name').val();
	account.email = $('#email').val();
	account.password = $('#password').val();
	$.post('/editAccount.html', account);
}

function saveArmor() {
	armor = {};
	armor.name = $('#name').val();
	armor.type = $('#type').val();
	armor.bonus = $('#bonus').val();
	armor.resistance = $('#resistance').val();
	armor.description = $('#description').val();
	$.post('/editArmor.html', armor);
}

function saveCharacter() {
	var character = {};
	character.level = $('#level').val();
	character.name = $('#name').val();
	character.class = $('#class').val();
	character.race = $('#race').val();
	character.size = $('#size').val();
	$.post('/editCharacter.html', character);
}

function saveMonster() {
	var monster = {};
	monster.name = $('#name').val();
	monster.hitpoints = $('#hitpoints').val();
	monster.experience = $('#experience').val();
	$.post('/editMonster.html', monster);
}

function saveSpell() {
	var spell = {};
	spell.name = $('#name').val();
	spell.level = $('#level').val();
	spell.description = $('#description').val();
	$.post('/editSpell.html', spell);
}

function saveWeapon(weaponID) {
	var weapon = {};
	weapon.id = weaponID;
	weapon.name = $('#name').val();
	weapon.damage = $('#damage').val();
	weapon.type = $('#dmgType').val();
	weapon.property = $('#property').val();
	weapon.description = $('#description').val();
	$.post('/editWeapon.html', weapon);
}

loadPage();