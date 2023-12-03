import { bodyParser, pool, express } from '../queries_utils';

const depenseRouter = express.Router();

depenseRouter.use(bodyParser.json());

depenseRouter.get('/:id', (request, response) => {
    pool.query('select montant,utilisateur,date from depenses where id = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

depenseRouter.post('/', (request, response) => {
    const { description, montant, utilisateur, date, idgroupe } = request.body
    pool.query('insert into depenses (description,montant,utilisateur,date,idgroupe )', [description, montant, utilisateur, date, idgroupe], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

depenseRouter.put('/:id', (request, response) => {
    const { montant } = request.body
    pool.query('update from depense set montant =$1 ', [montant], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})


depenseRouter.delete('/:id', (request, response) => {
    const { utilisateur } = request.body
    pool.query('delete from depense where idgroupe=$1 and utilisateur=$2)', [request.params.id, utilisateur], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})



export { depenseRouter };