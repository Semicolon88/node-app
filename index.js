const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const User = require('./models/userRegisteratio')
const passport = require('passport')
require('./strategy/local')
const session = require('express-session')
dotenv.config()

const DBCon = require('./util/db')

const app = express()
DBCon()
app.set('view engine','ejs')
app.use(morgan('dev'))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
  app.use(passport.initialize());
  app.use(passport.session());
app.get('/',(req,res) => {
    res.render('login')
})
app.get('/register',(req,res) => {
    res.render('register')
})
app.post('/login',passport.authenticate('local',{ successRedirect: '/login-success',
failureRedirect: '/login' }),
(req,res)=>{
    res.render('login')
})
app.post('/register',async (req,res)=>{
    const add = new User(req.body)
    await add.save()
    return res.json(add)
})
app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})
