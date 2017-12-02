DROP TABLE IF EXISTS customer_account;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS spells_known;
DROP TABLE IF EXISTS spells;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS weapons;
DROP TABLE IF EXISTS armor;
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS encounters;
DROP TABLE IF EXISTS monsters;

CREATE TABLE customer_account
                    (id            int NOT NULL AUTO_INCREMENT,
                    username       VARCHAR(100) NOT NULL,
                    name           VARCHAR(45) NOT NULL,
                    email          VARCHAR(45) NOT NULL,
                    password       VARCHAR(45) NOT NULL,
                    payment_rate   NUMERIC(2) NOT NULL,
                    PRIMARY KEY (id)
                    );

CREATE TABLE parties
                    (id                int NOT NULL AUTO_INCREMENT,
                    name               VARCHAR(100) NOT NULL,
                    PRIMARY KEY (id)
                    );

CREATE TABLE transactions
                    (id              int NOT NULL AUTO_INCREMENT,
                    customer_id      INT NOT NULL REFERENCES customer_account(id),
                    amount           NUMERIC(2) NOT NULL,
                    _date            DATE NOT NULL,
                    status           VARCHAR(45) NOT NULL,
                    PRIMARY KEY (id)
                    );

CREATE TABLE characters
                    (id               int NOT NULL AUTO_INCREMENT,
                    name              VARCHAR(100) NOT NULL,
                    party_id          INT NOT NULL REFERENCES parties(id),
                    customer_id       INT NOT NULL REFERENCES customer_account(id),
                    race              VARCHAR(45) NOT NULL,
                    _class            VARCHAR(45) NOT NULL,
                    _level            INT NOT NULL,
                    _size             VARCHAR(45) NOT NULL,
                    PRIMARY KEY (id)
                    );

CREATE TABLE spells
                    (id                  int NOT NULL AUTO_INCREMENT,
                    name                 VARCHAR(100) UNIQUE NOT NULL,
                    spell_level          INT NOT NULL,
                    description          VARCHAR(300) NOT NULL,
                    PRIMARY KEY (id)
                    );

CREATE TABLE spells_known
                    (character_id     INT NOT NULL REFERENCES characters(id),
                    spell_id          INT NOT NULL REFERENCES spells(id),
                    PRIMARY KEY (character_id, spell_id)
                    );

CREATE TABLE items
                    (id                 int NOT NULL AUTO_INCREMENT,
                    name                VARCHAR(100) NOT NULL,
                    description         VARCHAR(300) NOT NULL,
                    PRIMARY KEY(id)
                    );

CREATE TABLE weapons
                    (id                 INT NOT NULL,
                    name                VARCHAR(100) NOT NULL,
                    description         VARCHAR(300) NOT NULL,
                    properties          VARCHAR(100) NOT NULL,
                    damage_die          INT NOT NULL,
                    damage_type         VARCHAR(45) NOT NULL,
                         PRIMARY KEY (id),
                         FOREIGN KEY(id) REFERENCES items(id)
                    );

CREATE TABLE armor
                    (id                INT NOT NULL,
                    name               VARCHAR(100) NOT NULL,
                    description        VARCHAR(300) NOT NULL,
                    _type              VARCHAR(45) NOT NULL,
                    bonus              VARCHAR(45),
                    resistance         VARCHAR(45),
                    PRIMARY KEY(id),
                    FOREIGN KEY(id) REFERENCES items(id)
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
                    (id                int NOT NULL AUTO_INCREMENT,
                    name               VARCHAR(100) NOT NULL,
                    hit_points         INT,
                    exp_points         INT,
                    CHECK(hit_points > 0),
                    CHECK(exp_points > 0),
                    PRIMARY KEY(id)
                    );

CREATE TABLE encounters
                    (party_id          INT NOT NULL REFERENCES parties(id),
                    monster_id         INT NOT NULL REFERENCES monsters(id),
                    monster_deaths     INT NOT NULL
<<<<<<< HEAD
                    );
=======
                    );
>>>>>>> 469aa1b44c06d93d4cfe9159d208d9969eaaad92
