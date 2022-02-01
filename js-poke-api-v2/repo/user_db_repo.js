const Pool = require('pg').Pool

const pool = new Pool({
  user: 'stef',
  host: 'localhost',
  database: 'poke_api',
  password: '',
  port: 5432,
})

const getUsers = (_request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) throw error

    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw error

    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email, password } = request.body

  pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (error, results) => {
    if (error) throw error

    response.status(200).json(results.rows)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, password } = request.body

  pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [name, email, password, id], (error, _results) => {
    if (error) throw error

    response.status(200).json(`User ${id} updated.`)
  })
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, _results) => {
    if (error) throw error

    response.status(200).json(`User ${id}, deleted.`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
