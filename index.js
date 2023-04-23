require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()

//models
const Item = require('./models/Item')
const User = require('./models/User')

// connect to database
const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xpjg6.mongodb.net/todo?retryWrites=true&w=majority`
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected To mongodb'))
  .catch((err) => console.error(err))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')
app.use('/todo', todoRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
