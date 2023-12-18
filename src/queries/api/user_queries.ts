import { bodyParser, pool, express } from '../queries_utils';
import { hash, compare } from 'bcrypt';
const jwt=require('jsonwebtoken')

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.get('/', (request, response) => {
    console.log("#######################################")    
    console.log(request.headers);
    pool.query('SELECT email,nom,prenom,pseudonyme FROM users;', (error, results) => {

        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

userRouter.post('/signup/', (request, response) => {
    const { email, nom, prenom, pseudonyme, pwd } = request.body;
    console.log(pwd);
    hash(pwd, 10).then((hash) => {
        pool.query('insert into users ( email, nom, prenom,pseudonyme, pwd) values ($1,$2,$3,$4,$5)', [email, nom, prenom, pseudonyme, hash], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    })
})

userRouter.post('/login/:email', (request, response) => {
    const { pwd } = request.body;
    const token = jwt.sign({id:request.params.email},"UNBROCABLE_KEY");


    pool.query('select pwd from users where "email"=$1', [request.params.email], (error, results) => {

        if (error) {
            console.log(error)
            response.status(500).json({ message: "Paire login/pwd incorrect1" });
        }
        else if (results.rowCount == 1) {
            compare(pwd, results.rows[0].pwd, (error, results) => {
                if (!results) {
                    response.status(401).json({ message: "Paire login/pwd incorrect" })
                }
                else {
                    response.status(200).cookie("access_token",token,{httpOnly:true}).json({ message: "Connecté" })
                }

            })
        }
        else {
            response.status(401).json({ message: "Paire login/pwd incorrect" })
        }


    })
})


userRouter.delete('/:email', (request, response) => {
    pool.query('delete from users where email =$1;', [request.params.email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.row)
    })
})

userRouter.get('/:email', (request, response) => {
    console.log(request.params.email);
    pool.query(`select nom,prenom,pseudonyme from users where email=$1;`, [request.params.email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

export { userRouter };