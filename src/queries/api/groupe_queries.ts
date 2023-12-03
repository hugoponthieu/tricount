import { bodyParser, pool, express } from '../queries_utils';

const groupeRouter = express.Router();

groupeRouter.use(bodyParser.json());

groupeRouter.get('/:id', (request, response) => {
    pool.query('select nom from groupes where id = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

groupeRouter.get('/', (request, response) => {
    pool.query('select * from groupes', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

groupeRouter.post('/', (request, response) => {
    const { nom } = request.body
    pool.query('insert into groupes (nom) values ($1)', [nom], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

groupeRouter.delete('/:id', (request, response) => {
    pool.query('delete from groupes where id=$1 ', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})
export { groupeRouter };
