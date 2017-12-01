DROP FUNCTION IF EXISTS GetPartyExp(p_id int); 
DROP FUNCTION IF EXISTS GetAverageExp(p_id int);

--Average level of party -- finish 
CREATE OR REPLACE FUNCTION GetAverageExp(p_id int)
RETURNS numeric AS $$
BEGIN
SELECT Avg(exp_points) FROM monsters
JOIN encounters ON monster.id = encounters.monster_id
WHERE encounters.party_id = p_id;
END; $$
LANGUAGE PLPGSQL;

--This calculate a parties total exp based on monster deaths -- This might be a duplicate function
CREATE OR REPLACE FUNCTION GetPartyExp(p_id int)
RETURNS numeric AS $$
BEGIN 
SELECT sum(*) FROM monsters
JOIN encounters ON monsters.id = encounters.monster_id 
WHERE encounters.party_id = p_id;  
END; $$
LANGUAGE PLPGSQL;

--Get Rankings of each party using function
SELECT * FROM parties
ORDER BY GetPartyExp(parties.id);

-- Gets all charaters of a certian level who know a certian spell.
SELECT * FROM characters
JOIN Spells_Known ON spells_known.character_id = characters.id
WHERE characters._level = '?' AND spells_known.spell_id = 1;  

-- Gets parties where there is at least one characters of certian class.
SELECT * FROM parties
JOIN characters ON parties.id = characters.party_id
WHERE Characters._class = '?'; 

-- Get all parties and orders them by monster deaths
SELECT * FROM encounters
ORDER BY party_id, monster_id, monster_deaths;

-- Gets all weapons of a certian damage type
SELECT * FROM weapons
WHERE damage_type LIKE '%' || '?' || '%'; 

-- Gets total characters of certian race.
SELECT count(*) FROM characters
GROUP BY characters.race;

-- Get total characters of certain class.
SELECT count(*) FROM characters
GROUP BY characters._class;

-- Gets all Weapons in characters inventory that are above average in damage. This can be used as template for similar queries
SELECT items.name, weapons.damage_die FROM characters
JOIN inventory ON characters.id = inventory.character_id
JOIN items ON inventory.item_id = items.id
JOIN weapons ON items.id = weapons.id
WHERE (weapons.damage_die::numeric) > (
     SELECT AVG(damage_die::numeric) FROM weapons
);   
