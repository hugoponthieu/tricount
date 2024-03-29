import { bodyParser, pool, express } from '../queries_utils';
import { hash, compare } from 'bcrypt';
const jwt=require('jsonwebtoken');
require('dotenv').config()


const accessRouter = express.Router();
accessRouter.use(bodyParser.json());

accessRouter.post('/login/:email', async (request, response) => {
    const { pwd } = request.body;
    const token = jwt.sign({id:request.params.email},process.env.PRIVATE_KEY);

    await pool.query('select pwd from users where "email"=$1', [request.params.email], async (error, results) => {

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
                    response.status(200).cookie("access_token",token,{HttpOnly: true, Path:"/",domain: "localhost",expire : 24 * 60 * 60 * 1000,SameSite: null}).json({ message: "Connecté" })
                }

            })
        }
        else {
            response.status(401).json({ message: "Paire login/pwd incorrect" })
        }


    })
})

accessRouter.post('/signup', (request, response) => {
    const { email, nom, prenom, pseudonyme, pwd } = request.body;
    if(!email|| !nom || !prenom ||!pseudonyme ||!pwd){
        response.status(400).json({message: "Bad request: can't signup"})
        return
    }
    pool.query('select email from users where email = $1', [email], (error, results) => {
        if (error) {
            response.status(401).json({message: error})
        }
        else{
            if(results.rowCount==0){
                hash(pwd, 10).then((hash) => {
                pool.query('insert into users ( email, nom, prenom,pseudonyme, pwd) values ($1,$2,$3,$4,$5)', [email, nom, prenom, pseudonyme, hash], (error, results) => {
                    if (error) {
                        response.status(401).json({message: error})
                    }
                    response.status(200).json(results.rows)
                })
            })}else{
                response.status(400).json({message: "Bad request: can't signup"})
            }
           }
    })

})

export { accessRouter }