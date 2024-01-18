import { bodyParser, pool, express } from '../queries_utils';

const groupeRouter = express.Router();

groupeRouter.use(bodyParser.json());

groupeRouter.get('/', (request, response) => {
    pool.query('select nom , id from groupes g join membres m on m.idgroupe=g.id where m.utilisateur = $1', [request.userId], (error, results) => {
        if (error) {
            response.status(400).json({message: error})
        }
        response.status(200).json(results.rows)

    })
})


groupeRouter.post('/', (request, response) => {
    const { nom } = request.body
    if(!nom){
        response.status(400).json({message: "Bad request: can't add groupe"})
        return
    }
    pool.query('insert into groupes (nom) values ($1) returning id', [nom], (error, results) => {
        if (error) {
            response.status(400).json({message: error})
        }
        response.status(201).json(results.rows)

    })
})

groupeRouter.delete('/:id', (request, response) => {
    pool.query('delete from groupes where id=$1 ', [request.params.id], (error, results) => {
        if (error) {
            response.status(400).json({message: error})
        }
        response.status(200).json(results.rows)

    })
})
export { groupeRouter };
