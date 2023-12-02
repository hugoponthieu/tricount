import { bodyParser, pool, express } from '../queries_utils';

const membreRouter = express.Router();

membreRouter.user(bodyParser.json());

membreRouter.get('/:id', (request, response) => {
    pool.query('select email from membres where idgroupe = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

membreRouter.post('/', (request, response) => {
    const { idgroupe, utilisateur } = request.body
    pool.query('insert into membres values ($1,$2)', [idgroupe, utilisateur], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

membreRouter.delete('/:id', (request, response) => {
    const { utilisateur } = request.body
    pool.query('delete from depense where idgroupe=$1 and utilisateur=$2)', [request.params.id, utilisateur], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

