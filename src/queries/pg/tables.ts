const { pool } = require("../queries_utils");

const query = `
DROP TABLE IF EXISTS remboursements; 
DROP TABLE IF EXISTS depenses;
DROP TABLE IF EXISTS membres; 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groupes;

CREATE TABLE users (
    email varchar(50) PRIMARY KEY NOT NULL UNIQUE,
    nom varchar(30),
    prenom varchar(30),
    pseudonyme varchar(30),
    pwd varchar(200) NOT NULL);

CREATE TABLE groupes (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL UNIQUE,
    nom varchar(30));


CREATE TABLE depenses (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL UNIQUE,
    idgroupe int,
    montant float NOT NULL,
    utilisateur varchar(50) NOT NULL,
    description varchar(80),
    date DATE,
    FOREIGN KEY (utilisateur) REFERENCES users(email),
    FOREIGN KEY (idgroupe) REFERENCES groupes(id));

CREATE TABLE remboursements (
    iddepense int,
    idgroupe int,
    utilisateur varchar(50),
    part float,
    FOREIGN KEY (utilisateur) REFERENCES users(email),
    FOREIGN KEY (iddepense) REFERENCES depenses(id),
    FOREIGN KEY (idgroupe) REFERENCES groupes(id),
    PRIMARY KEY (iddepense,idgroupe,utilisateur));


CREATE TABLE membres (
    idgroupe int,
    utilisateur varchar(50),
    FOREIGN KEY (idgroupe) REFERENCES groupes(id),
    FOREIGN KEY (utilisateur) REFERENCES users(email),
    PRIMARY KEY (idgroupe,utilisateur)
    );

INSERT INTO users (email, nom, prenom,pseudonyme, pwd) VALUES ('manon.dupouy@gmail.com','Dupouy','Manon','Manonette','azer123');
INSERT INTO users (email, nom, prenom,pseudonyme, pwd) VALUES ('hugo.ponthieu@gmail.com','Ponthieu','Hugo','Huguette','aezer123');
INSERT INTO groupes (nom) VALUES ('Croissons');
INSERT INTO groupes (nom) VALUES ('Pain au chocolat');
INSERT INTO membres (idgroupe,utilisateur) values (1,'manon.dupouy@gmail.com');
INSERT INTO membres (idgroupe,utilisateur) values (1,'hugo.ponthieu@gmail.com');
INSERT INTO depenses (description,montant,utilisateur,date,idgroupe) VALUES ('baguette',34.50,'manon.dupouy@gmail.com','2023/12/12',1);
INSERT INTO depenses (description,montant,utilisateur,date,idgroupe) VALUES ('carotte',34.50,'manon.dupouy@gmail.com','2023/12/12',1);
INSERT INTO depenses (description,montant,utilisateur,date,idgroupe) VALUES ('banane',34.50,'manon.dupouy@gmail.com','2023/12/12',1);
INSERT INTO remboursements (iddepense, idgroupe, utilisateur, part) VALUES (1,1,'hugo.ponthieu@gmail.com',0.5);
INSERT INTO remboursements (iddepense, idgroupe, utilisateur, part) VALUES (2,1,'hugo.ponthieu@gmail.com',0.5);
INSERT INTO remboursements (iddepense, idgroupe, utilisateur, part) VALUES (3,1,'hugo.ponthieu@gmail.com',0.5);

`

// s

async function createTables() {
    await pool.query(query, (error, results) => {
        if (error) {
            throw error;
        }


    })
}

export { createTables };