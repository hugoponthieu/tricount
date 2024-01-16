import { bodyParser, pool, express } from '../queries_utils';

const depenseRouter = express.Router();

depenseRouter.use(bodyParser.json());

depenseRouter.get('/:id', (request, response) => {
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
    const { description, montant, utilisateur, idgroupe } = request.body
    const dateToday: Date= new Date(2012, 1, 31);
    pool.query('insert into depenses (description,montant,utilisateur,idgroupe,date) values ($1,$2,$3,$4,$5) returning id;', [description, montant, utilisateur, idgroupe,dateToday], (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows[0])

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
    //const { utilisateur } = request.body
    pool.query('delete from depenses where id=$1;', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
})

export { depenseRouter };
