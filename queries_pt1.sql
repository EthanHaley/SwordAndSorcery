
/*Lists all premium members usernames*/
SELECT username FROM customer_account WHERE payment_rate = '15';

/*Returns name and kills of the party with most kills*/
SELECT a.name, a.kills
FROM (SELECT p.name AS name, sum(e.monster_deaths) AS kills FROM parties p
		JOIN encounters e ON e.party_id = p.id GROUP BY p.id) a
WHERE a.kills = (SELECT max(b.kills)
		 FROM (SELECT sum(e.monster_deaths) AS kills FROM parties p
		 JOIN encounters e ON e.party_id = p.id GROUP BY p.id) b);

/*Leaderboard of top 100 parties by monster kills*/
SELECT p.name AS name, sum(e.monster_deaths) AS kills 
FROM parties p
JOIN encounters e ON e.party_id = p.id 
GROUP BY p.id 
ORDER BY kills DESC LIMIT 100;

/*Leaderboard of top 100 parties by xp*/
SELECT name, total_xp(id) AS total_xp
FROM parties 
ORDER BY total_xp DESC LIMIT 100;

/*Total of completed transactions of a givin account*/
SELECT sum(t.amount) 
FROM transactions t 
	JOIN customer_account c ON c.id = t.customer_id
WHERE c.username = '' AND t.status = 'Complete';

/*lists characters of a givin class of a givin account*/
SELECT ch._class, ch.name, ch.race, ch._size, ch._level
FROM customer_account ca
	JOIN characters ch ON ch.customer_id = ca.id
WHERE ch._class = '' AND ca.username = '';

/*lists the spells known by a givin character and account*/
SELECT sp.name 
FROM spells_known sk
	JOIN spells sp ON sp.id = sk.spell_id
	JOIN characters ch ON ch.id = sk.character_id
WHERE ch.id = '' AND ch.customer_id = '';

/*lists armor that has a given resistance*/
SELECT * FROM armor WHERE resistance = x;

/*Function to calculate the total xp of a givin party*/
CREATE OR REPLACE FUNCTION total_xp(p_id int)
RETURNS int AS 
$BODY$	
	DECLARE
		temprow record;
		sum int := 0;
	BEGIN
		FOR temprow IN 
			SELECT m.exp_points AS xp, e.monster_deaths AS deaths 
			FROM encounters e
				JOIN monsters m ON e.monster_id = m.id
				JOIN parties p ON p.id = e.party_id
			WHERE p.id = p_id
		LOOP
			sum := temprow.xp * temprow.deaths + sum;
		END LOOP;
		RETURN sum;
	END;
$BODY$
LANGUAGE plpgsql;
