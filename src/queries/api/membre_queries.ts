import { bodyParser, pool, express } from '../queries_utils';

const membreRouter = express.Router();

membreRouter.use(bodyParser.json());

membreRouter.get('/:id', (request, response) => {
    pool.query('select distinct utilisateur from membres where idgroupe = $1', [request.params.id], (error, results) => {
        if (error) {
            response.status(400).json({message: error})
        }
        response.status(200).json(results.rows)

    })
})

membreRouter.post('/', (request, response) => {
    const { idgroupe, utilisateur } = request.body
    console.log(idgroupe,utilisateur)
    if(!idgroupe||!utilisateur){
        response.status(400).json({message: "Bad request: can't add membre"})
        return
    }
    pool.query('insert into membres values ($1,$2)', [idgroupe, utilisateur], (error, results) => {
        if (error) {
            response.status(400).json({message: error})
        }
        response.status(201).json(results.rows)

    })
})

membreRouter.delete('/:id', (request, response) => {
    const { utilisateur } = request.body
    if(!utilisateur){
        response.status(400).json({message: "Bad request: can't delete membre"})
        return
    }
    pool.query('delete from membres where idgroupe=$1 and utilisateur=$2', [request.params.id, utilisateur], (error, results) => {
        if (error) {
            response.status(400).json({message: error})
        }
        response.status(200).json(results.rows)

    })
})


export { membreRouter };