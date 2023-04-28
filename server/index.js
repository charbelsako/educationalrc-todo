require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const app = express()
const MongoStore = require('connect-mongo')
const passport = require('passport')
//models
const Item = require('./models/Item')
const User = require('./models/User')
const passportLocal = require('./middleware/passport-local')

// connect to database
const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xpjg6.mongodb.net/todo?retryWrites=true&w=majority`
const connection = mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected To mongodb'))
  .catch((err) => console.error(err))

const store = new MongoStore({
  mongoUrl: mongoURI,
})

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false, httpOnly: false },
  })
)
// app.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:3000',
//   })
// )
// app.use(
//   cors({
//     credentials: true,
//     methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS'],
//     origin: 'https://educationalrc-todo-1be3.vercel.app/',
//   })
// )
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

// routes
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')
app.use('/todo', todoRouter)
app.use('/user', userRouter)

// For heroku
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  console.log('production mode')
  app.use(express.static('client/build'))
  // console.log(path.resolve(__dirname, "client/", "build/", "index.html"))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/', 'build/', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
