const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json()) //express.json(): Middleware used in Express.js to automatically parse JSON bodies of incoming HTTP requests and populate req.body.

const users = [] //The users array is used to store user data in memory. This means that user data will be lost when the server restarts, as it is not being persisted in a traditional database.

app.get('/users', (req, res) => {
  res.json(users) //res.json(): Sends a JSON response to the client. Automatically sets the Content-Type to application/json.

})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword }
    console.log(hashedPassword)
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

app.listen(3000)