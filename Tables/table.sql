DROP TABLE IF EXISTS customer_account CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS spells_known CASCADE;
DROP TABLE IF EXISTS spells CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS weapons CASCADE;
DROP TABLE IF EXISTS armor CASCADE;
DROP TABLE IF EXISTS parties CASCADE;
DROP TABLE IF EXISTS encounters CASCADE;
DROP TABLE IF EXISTS monsters CASCADE;

CREATE TABLE customer_account
                    (id            SERIAL PRIMARY KEY,
                    username       VARCHAR(100) NOT NULL,
                    name           VARCHAR(45) NOT NULL,
                    email          VARCHAR(45) NOT NULL,
                    password       VARCHAR(45) NOT NULL,
                    payment_rate   VARCHAR(10) NOT NULL
                    );
CREATE TABLE parties
                    (id                SERIAL PRIMARY KEY,
                    name               VARCHAR(100) NOT NULL
                    );
CREATE TABLE transactions
                    (id              SERIAL PRIMARY KEY,
                    customer_id      INT NOT NULL REFERENCES customer_account(id),
                    amount           VARCHAR(45) NOT NULL,
                    _date            DATE NOT NULL,
                    status           VARCHAR(45) NOT NULL
                    );
CREATE TABLE characters
                    (id               SERIAL PRIMARY KEY,
                    name              VARCHAR(100) NOT NULL,
                    party_id          INT NOT NULL REFERENCES parties(id),
                    customer_id       INT NOT NULL REFERENCES customer_account(id),
                    race              VARCHAR(45) NOT NULL,
                    _class            VARCHAR(45) NOT NULL,
                    _level            INT NOT NULL,
                    _size             VARCHAR(45) NOT NULL
                    );
CREATE TABLE spells
                    (id                  SERIAL PRIMARY KEY,
                    name                 VARCHAR(100) UNIQUE NOT NULL,
                    spell_level          INT NOT NULL,
                    description          VARCHAR(300) NOT NULL
                    );
CREATE TABLE spells_known
                    (character_id     INT NOT NULL REFERENCES characters(id),
                    spell_id          INT NOT NULL REFERENCES spells(id),
                    PRIMARY KEY (character_id, spell_id)
                    );
CREATE TABLE items
                    (id                 SERIAL UNIQUE NOT NULL,
                    name                VARCHAR(100) NOT NULL,
                    description         VARCHAR(300) NOT NULL,
					PRIMARY KEY(id, name, description)
                    );
CREATE TABLE weapons
                    (id                 INT NOT NULL,
                    name                VARCHAR(100) NOT NULL,
                    description         VARCHAR(300) NOT NULL,
                    properties          VARCHAR(100) NOT NULL,
                    damage_die          VARCHAR(10) NOT NULL,
                    damage_type         VARCHAR(45) NOT NULL,
					PRIMARY KEY (id,name,description),
					FOREIGN KEY(id,name,description) REFERENCES items(id,name,description)
                    );
CREATE TABLE armor
                    (id                 INT NOT NULL,
                    name                VARCHAR(100) NOT NULL,
                    description         VARCHAR(300) NOT NULL,
                    _type              VARCHAR(45) NOT NULL,
                    bonus              VARCHAR(45),
                    resistance         VARCHAR(45),
                    PRIMARY KEY(id, name, description),
					FOREIGN KEY(id, name, description) REFERENCES items(id, name, description)
                    );
CREATE TABLE inventory
                    (character_id     INT NOT NULL REFERENCES characters(id),
                    item_id           INT NOT NULL  REFERENCES items(id),
                    quantity          INT NOT NULL,
                    CHECK(quantity > 0),
                    PRIMARY KEY (character_id,item_id),
					FOREIGN KEY(character_id) REFERENCES characters(id),
					FOREIGN KEY(item_id) REFERENCES items(id)
                    );
CREATE TABLE monsters
                    (id                SERIAL PRIMARY KEY,
                    name               VARCHAR(100) NOT NULL,
                    hit_points         INT,
                    exp_points         INT,
                    CHECK(hit_points > 0),
                    CHECK(exp_points > 0)
                    );
CREATE TABLE encounters
                    (party_id          INT NOT NULL REFERENCES parties(id),
                    monster_id         INT NOT NULL REFERENCES monsters(id),
                    monster_deaths     INT NOT NULL,
                    CHECK(monster_deaths > 0)
                    );
