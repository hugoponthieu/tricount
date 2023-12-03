import { bodyParser, pool, express } from '../queries_utils';

const remboursementRouter = express.Router();

remboursementRouter.user(bodyParser.json());

remboursementRouter.get('/:id', (request, response) => {
    pool.query('select utilisateur part idgroupe from remboursements id = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

remboursementRouter.get('/ofgroup/:id', (request, response) => {
    pool.query('select utilisateur,part,idgroupe from remboursements where idgroupe = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

remboursementRouter.get('/ofgroup/ofuser/:id', (request, response) => {
    const { email } = request.body;
    pool.query('select part,iddepense from remboursements where idgroupe = $1 and utilisateur=$2', [request.params.id, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})



remboursementRouter.post('/', (request, response) => {
    const { iddepense, idgroupe, utilisateur, part } = request.body
    pool.query('insert into remboursements (iddepense, idgroupe, utilisateur, part) values ($1,$2,$3,$4)', [iddepense, idgroupe, utilisateur, part], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

remboursementRouter.delete('/:id', (request, response) => {
    const { depense } = request.body
    pool.query('delete from remboursements where iddepense=$1 and idgroupe=$2', [depense, request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})


remboursementRouter.put('/:id', (request, response) => {
    const { depense } = request.body
    pool.query('update remboursements set part = $1 where iddepense=$1 and idgroupue=$2', [depense, request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

export { remboursementRouter };