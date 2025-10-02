const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// Require Routers
const AuthRouter = require('./routes/AuthRouter')

const PORT = process.env.PORT || 3000

const db = require('./db')

const app = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', (req, res) => {
  res.send(`Welcome to the pro kit store!`)
})

app.use('/auth', AuthRouter)

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
