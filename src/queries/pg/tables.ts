const { pool } = require("../queries_utils");
import { hash } from 'bcrypt';
var pwd;

// select sum(d.montant*r.part) as total , d.utilisateur, r.utilisateur as emprunteur from depenses d join remboursements r on r.iddepense = d.id where d.idgroupe = 1  and not d.utilisateur = r.utilisateur group by d.utilisateur ,r.utilisateur 
function query(pwd:string){
    return `
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
    
    INSERT INTO users (email, nom, prenom,pseudonyme, pwd) VALUES ('manon.dupouy@gmail.com','Dupouy','Manon','Manonette','${pwd}');
    INSERT INTO users (email, nom, prenom,pseudonyme, pwd) VALUES ('hugo.ponthieu@gmail.com','Ponthieu','Hugo','Huguette','${pwd}');
    INSERT INTO groupes (nom) VALUES ('voyage');
    INSERT INTO groupes (nom) VALUES ('coloc');
    INSERT INTO membres (idgroupe,utilisateur) values (1,'manon.dupouy@gmail.com');
    INSERT INTO membres (idgroupe,utilisateur) values (1,'hugo.ponthieu@gmail.com');
    INSERT INTO depenses (description,montant,utilisateur,date,idgroupe) VALUES ('baguette',34.50,'manon.dupouy@gmail.com','2023/12/12',1);
    INSERT INTO depenses (description,montant,utilisateur,date,idgroupe) VALUES ('carotte',34.50,'manon.dupouy@gmail.com','2023/12/12',1);
    INSERT INTO depenses (description,montant,utilisateur,date,idgroupe) VALUES ('banane',34.50,'manon.dupouy@gmail.com','2023/12/12',1);
    INSERT INTO remboursements (iddepense, idgroupe, utilisateur, part) VALUES (1,1,'hugo.ponthieu@gmail.com',0.5);
    INSERT INTO remboursements (iddepense, idgroupe, utilisateur, part) VALUES (2,1,'hugo.ponthieu@gmail.com',0.5);
    INSERT INTO remboursements (iddepense, idgroupe, utilisateur, part) VALUES (3,1,'hugo.ponthieu@gmail.com',0.5);
    INSERT INTO remboursements (iddepense, idgroupe, utilisateur, part) VALUES (1,1,'manon.dupouy@gmail.com',0.5);
    INSERT INTO remboursements (iddepense, idgroupe, utilisateur, part) VALUES (2,1,'manon.dupouy@gmail.com',0.5);
    INSERT INTO remboursements (iddepense, idgroupe, utilisateur, part) VALUES (3,1,'manon.dupouy@gmail.com',0.5);
    `
}
async function createTables() {
    const q=query(await hash("azer123",10).then((hash)=>pwd=hash));
    await pool.query(q, (error, results) => {
        if (error) {
            throw error;
        }
    })
}

export { createTables };