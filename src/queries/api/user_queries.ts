import { bodyParser, pool, express } from '../queries_utils';
import { hash, compare } from 'bcrypt';
const jwt=require('jsonwebtoken');


const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.get('/', (request, response) => {
    pool.query('SELECT email,nom,prenom,pseudonyme FROM users;', (error, results) => {

        if (error) {
            response.status(400).json({message: error})
        }
        response.status(200).json(results.rows)
    })
})

userRouter.get('/auth',(request,response)=>{response.status(200).json({ message: "Connecté" })}
)

userRouter.get('/current',(request,response)=>{response.status(200).json({user:request.userId})})


userRouter.delete('/:email', (request, response) => {
    pool.query('delete from users where email =$1;', [request.params.email], (error, results) => {
        if (error) {
            response.status(400).json({message: error})
        }
        response.status(200).json(results.row)
    })
})

userRouter.get('/:email', (request, response) => {
    pool.query(`select nom,prenom,pseudonyme from users where email=$1;`, [request.params.email], (error, results) => {
        if (error) {
            response.status(400).json({message: error})
        }
        response.status(200).json(results.rows)
    })
})

export { userRouter };