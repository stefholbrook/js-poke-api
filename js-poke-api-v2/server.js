const express = require('express')
const bodyParser = require('body-parser')
const usersDbRepo = require('./repo/user_db_repo.js')

const app = express()
const port = 1000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (_req, res) => {
  res.json({info: 'sup'})
})

app.get('/users', usersDbRepo.getUsers)
app.get('/users/:id', usersDbRepo.getUserById)
app.post('/users', usersDbRepo.createUser)
app.put('/users/:id', usersDbRepo.updateUser)
app.delete('/users/:id', usersDbRepo.deleteUser)

app.listen(port, () => {
  console.log(`There's a party going on right here localhost:${port}`)
})
