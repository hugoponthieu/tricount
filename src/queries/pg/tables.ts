const { Pool } = require("../queries_utils");

const poolTables = new Pool({
    user: 'test',
    host: 'postgre.local',
    database: 'test',
    password: 'test',
    port: 5432,
})

const drop =
    "DROP TABLE IF EXISTS remboursements; DROP TABLE IF EXISTS depenses; DROP TABLE IF EXISTS users;";
const createUsers =
    "CREATE TABLE users (email varchar(50) PRIMARY KEY NOT NULL UNIQUE,nom varchar(30),prenom varchar(30),pseudonyme varchar(30),pwd varchar(200));"
const createDepenses =
    "CREATE TABLE depenses (id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL UNIQUE,montant float NOT NULL,utilisateur varchar(50) NOT NULL,date DATE,FOREIGN KEY (utilisateur) REFERENCES users(email));"
const createRemboursements =
    "CREATE TABLE remboursements (iddepense int ,utilisateur varchar(50),part float,FOREIGN KEY (utilisateur) REFERENCES users(email),FOREIGN KEY (iddepense) REFERENCES depenses(id),PRIMARY KEY (iddepense,utilisateur));"
const createGroupes =
    "CREATE TABLE groupes (id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL UNIQUE,nom varchar(30));"
const createMembres =
    "CREATE TABLE membres (idgroupe int,utilisateur varchar(50),PRIMARY KEY (id,utilisateur),FOREIGN KEY (idgroupe) REFERENCES groupes(id),FOREIGN KEY (utilisateur) REFERENCES users(email));"

const query = `
DROP TABLE IF EXISTS remboursements; 
DROP TABLE IF EXISTS depenses;
DROP TABLE IF EXISTS membres; 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groupes;

CREATE TABLE users (
    email varchar(50) PRIMARY KEY NOT NULL UNIQUE,
    nom varchar(30),prenom varchar(30),
    pseudonyme varchar(30),pwd varchar(200));

CREATE TABLE groupes (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL UNIQUE,
    nom varchar(30));


CREATE TABLE depenses (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL UNIQUE,
    montant float NOT NULL,
    utilisateur varchar(50) NOT NULL,
    date DATE,
    FOREIGN KEY (utilisateur) REFERENCES users(email));

CREATE TABLE remboursements (
    iddepense int,
    utilisateur varchar(50),
    part float,
    idgroupe int,
    FOREIGN KEY (utilisateur) REFERENCES users(email),
    FOREIGN KEY (iddepense) REFERENCES depenses(id),
    FOREIGN KEY (idgroupe) REFERENCES groupes(id),
    PRIMARY KEY (iddepense,utilisateur));


CREATE TABLE membres (
    idgroupe int,
    utilisateur varchar(50),
    FOREIGN KEY (idgroupe) REFERENCES groupes(id),
    FOREIGN KEY (utilisateur) REFERENCES users(email),
    PRIMARY KEY (idgroupe,utilisateur)
    );
`



async function createTables() {
    await poolTables.query(query, (error, results) => {
        if (error) {
            throw error;
        }


    })
}

export { createTables };