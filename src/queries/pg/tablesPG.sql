DROP TABLE IF EXISTS remboursements; 
DROP TABLE IF EXISTS depenses;
DROP TABLE IF EXISTS membres; 
DROP TABLE IF EXISTS users;

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
    utilisateur varchar(50),part float,
    idgroupe
    FOREIGN KEY (utilisateur) REFERENCES users(email),
    FOREIGN KEY (iddepense) REFERENCES depenses(id),
    FOREIGN KEY (idgroupe) REFERENCES groupes(id)
    PRIMARY KEY (iddepense,utilisateur));


CREATE TABLE membres (
    idgroupe int,
    utilisateur varchar(50),
    FOREIGN KEY (idgroupe) REFERENCES groupes(id),
    FOREIGN KEY (utilisateur) REFERENCES users(email)
    PRIMARY KEY (idgroupe,utilisateur),
    );
