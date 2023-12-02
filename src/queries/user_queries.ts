import { bodyParser, pool, express } from './queries_utils';
import { hash } from 'bcrypt';

const userRouter = express.Router();

userRouter.user(bodyParser.json());

userRouter.get('/', (request, response) => {
    pool.query('SELECT email,nom,prenom,pseudonyme FROM users;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

userRouter.post('/', (request, response) => {
    const { email, nom, prenom, pwd } = request.body;
    hash(pwd, 10).then(pool.query('insert into users values ($1,$2,$3,$4)', [email, nom, prenom, pwd], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }))
})

userRouter.delete('/:email', (request, response) => {
    pool.query('delete from depense where "email" =$1', [request.params.email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.row)
    })
})

userRouter.get('/:email', (request, response) => {
    pool.query('select nom,prenom,pseudonyme from user where "email"=$1', [request.params.email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.row)
    })
})

