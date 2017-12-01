DROP FUNCTION IF EXISTS GetPartyExp(p_id int); 
DROP FUNCTION IF EXISTS GetAverageKills(parts bigint, kills bigint);

--Calculater Average monster kills for party
CREATE OR REPLACE FUNCTION GetAverageKills(parts bigint, kills bigint)
RETURNS int AS $$
BEGIN
return kills/parts;
END; $$
LANGUAGE PLPGSQL;

--Get average monster kills of each party for ranking.
SELECT * FROM encounters
WHERE encounters.monster_deaths > GetAverageKills(
(SELECT count(parties.id) FROM parties)
,(SELECT sum(monster_deaths) FROM encounters));

-- Gets all charaters of a certian level who know a certian spell.
SELECT * FROM characters
JOIN Spells_Known ON spells_known.character_id = characters.id
WHERE characters._level = '1' AND spells_known.spell_id = 1;  

-- Gets parties where there is at least one characters of certian class.
SELECT * FROM parties
JOIN characters ON parties.id = characters.party_id
WHERE characters._class = 'Ranger'; 

-- Get all parties and orders them by monster deaths
SELECT * FROM encounters
ORDER BY party_id, monster_id, monster_deaths;

-- Gets all weapons of a certian damage type
SELECT * FROM weapons
WHERE damage_type LIKE '%' || 'Fire' || '%'; 

-- Gets total characters of certian race.
SELECT characters.race, count(*) FROM characters
GROUP BY characters.race;

-- Get total characters of certain class.
SELECT characters._class, count(*) FROM characters
GROUP BY characters._class;

-- Find specific Armor bonus
SELECT * FROM armor
WHERE bonus = 'Heavy'; 
