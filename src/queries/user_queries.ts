import { bodyParser, pool, express } from './queries_utils';

const userRouteur = express.Router();

userRouteur.user(bodyParser.json());

userRouteur.get('/', (request, response) => {
    pool.query('SELECT * FROM depense;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

