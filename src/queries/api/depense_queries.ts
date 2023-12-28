import { authorization } from '../auth';
import { bodyParser, pool, express } from '../queries_utils';

const depenseRouter = express.Router();

depenseRouter.use(bodyParser.json());

depenseRouter.get('/:id',authorization, (request, response) => {
    pool.query('select description,montant,utilisateur,date,idgroupe from depenses where idgroupe = $1;', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })

    depenseRouter.get('/', (request, response) => {
        pool.query('select * from depenses;', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)

        })
    })
})


depenseRouter.post('/', (request, response) => {
    const { description, montant, utilisateur, date, idgroupe } = request.body
    pool.query('insert into depenses (description,montant,utilisateur,date,idgroupe) values ($1,$2,$3,$4,$5);', [description, montant, utilisateur, date, idgroupe], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

depenseRouter.put('/:id', (request, response) => {
    const { montant, description, utilisateur } = request.body
    pool.query('update depenses set montant =$1, description=$2,utilisateur=$3 where id=$4;', [montant, description, utilisateur, request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})


depenseRouter.delete('/:id', (request, response) => {
    const { utilisateur } = request.body
    pool.query('delete from depenses where idgroupe=$1 and utilisateur=$2;', [request.params.id, utilisateur], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})



export { depenseRouter };
