
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
    "CREATE TABLE users (email varchar(50) PRIMARY KEY NOT NULL UNIQUE,nom varchar(30),prenom varchar(30),pwd varchar(200));"
const createDepenses =
    "CREATE TABLE depenses (id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL UNIQUE,montant float NOT NULL,utilisateur varchar(50) NOT NULL,date DATE,FOREIGN KEY (utilisateur) REFERENCES users(email));"
const createRemboursements =
    "CREATE TABLE remboursements (iddepense int ,utilisateur varchar(50),part float,FOREIGN KEY (utilisateur) REFERENCES users(email),FOREIGN KEY (iddepense) REFERENCES depenses(id),PRIMARY KEY (iddepense,utilisateur));"