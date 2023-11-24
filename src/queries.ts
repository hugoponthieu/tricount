const Pool = require('pg').Pool
const pool = new Pool({
    user: 'test',
    host: 'postgre.local',
    database: 'test',
    password: 'test',
    port: 5432,
})

const getDepense = (request, response) => {
    pool.query('SELECT * FROM depense;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

/*const createDepense = (request, response) => {
    pool.query("insert into depense values (345,22.34,'Jean')", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}*/

module.exports = {
    getDepense,
    /*    createDepense*/
}