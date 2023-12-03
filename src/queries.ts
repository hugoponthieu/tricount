const express = require('express');
const routeur = express.Router();

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'test',
    host: 'postgre.local',
    database: 'test',
    password: 'test',
    port: 5432,
})

const bodyParser = require('body-parser')

routeur.use(bodyParser.json())

routeur.get('/', (request, response) => {
    pool.query('SELECT * FROM depense;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

routeur.post('/', (request, response) => {
    //fields must have the same names
    const { id, cost, name } = request.body;
    pool.query('insert into depense values ($1,$2,$3)', [id, cost, name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

routeur.delete('/:id', (request, response) => {
    pool.query('delete from depense where "id"=$1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

routeur.put('/:id', (request, reponse) => {
    pool.query('')

})

